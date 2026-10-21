#!/usr/bin/env python3
"""Build a 500-row branded-medicine comparison catalogue from the public Indian Medicine Dataset.

Only exact ingredient + strength + dosage-form + release-type matches are eligible.
The source's price is labelled as a listed dataset price, NOT assumed to be a verified MRP.
"""
from __future__ import annotations
import csv
import datetime as dt
import re
import sys
import urllib.request
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
JAN_PATH = ROOT / "data" / "jan_aushadhi_extracted.csv"
OUT_PATH = ROOT / "data" / "branded_medicines_500.csv"
SOURCE_URL = "https://raw.githubusercontent.com/junioralive/Indian-Medicine-Dataset/main/DATA/indian_medicine_data.csv"
SOURCE_REPO = "https://github.com/junioralive/Indian-Medicine-Dataset"
TARGET_COUNT = 500

ALIASES = {
    "amoxycillin": "amoxicillin",
    "acetaminophen": "paracetamol",
    "vitamin b1": "thiamine",
    "vitamin b6": "pyridoxine",
    "vitamin b12": "cyanocobalamin",
    "folic acid": "folate",
    "levocetirizine dihydrochloride": "levocetirizine",
    "cetirizine dihydrochloride": "cetirizine",
    "pantoprazole sodium": "pantoprazole",
    "omeprazole magnesium": "omeprazole",
    "atorvastatin calcium": "atorvastatin",
    "rosuvastatin calcium": "rosuvastatin",
    "metformin hydrochloride": "metformin",
    "glimepiride": "glimepiride",
    "telmisartan": "telmisartan",
    "amlodipine besilate": "amlodipine",
    "amlodipine besylate": "amlodipine",
    "losartan potassium": "losartan",
    "ibuprofen": "ibuprofen",
    "diclofenac sodium": "diclofenac",
    "diclofenac potassium": "diclofenac",
}
FORM_WORDS = {
    "tablet", "tablets", "tab", "tabs", "capsule", "capsules", "cap", "caps",
    "syrup", "suspension", "susp", "solution", "injection", "injectable",
    "cream", "ointment", "gel", "lotion", "drops", "drop", "eye", "ear",
    "nasal", "spray", "inhaler", "respules", "powder", "granules", "sachet",
    "dispersible", "chewable", "mouth", "dissolving", "lozenge", "suppository",
    "pessary", "patch", "soap", "shampoo", "wipes", "oral", "topical",
    "ip", "bp", "usp", "nf", "and", "with",
}
UNIT_RE = re.compile(r"(\d+(?:\.\d+)?)\s*(mcg|µg|ug|mg|g|iu|units?)\b", re.I)

def norm_space(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "").strip().lower())

def norm_ingredient(s: str) -> str:
    s = norm_space(s)
    s = re.sub(r"\([^)]*\)", " ", s)
    s = re.sub(r"[^a-z0-9]+", " ", s)
    words = [w for w in s.split() if w not in FORM_WORDS]
    value = " ".join(words)
    value = ALIASES.get(value, value)
    return value.strip()

def strength_value(value: str) -> tuple[str, str] | None:
    m = UNIT_RE.search(norm_space(value))
    if not m:
        return None
    n = float(m.group(1))
    unit = m.group(2).lower()
    if unit in {"mcg", "µg", "ug"}:
        return (f"{n:g}", "mcg")
    if unit == "g":
        return (f"{n * 1000:g}", "mg")
    if unit in {"iu", "unit", "units"}:
        return (f"{n:g}", "iu")
    return (f"{n:g}", unit)

def component_from_source(s: str) -> tuple[str, tuple[str, str]] | None:
    s = norm_space(s)
    m = re.search(r"(.+?)\s*\(\s*(\d+(?:\.\d+)?\s*(?:mcg|µg|ug|mg|g|iu|units?)\s*)\)", s, re.I)
    if not m:
        return None
    ing = norm_ingredient(m.group(1))
    strength = strength_value(m.group(2))
    if not ing or not strength:
        return None
    return ing, strength

def split_generic_components(name: str) -> list[str]:
    # Split only common composition separators; keep salt names intact.
    return re.split(r"\s+(?:and|with)\s+|[,;+]", norm_space(name))

def components_from_jan(row: dict) -> tuple | None:
    name = row.get("generic_name", "")
    pieces = split_generic_components(name)
    comps = []
    for piece in pieces:
        matches = list(UNIT_RE.finditer(piece))
        if not matches:
            continue
        # A piece with multiple strengths is ambiguous; fail closed.
        if len(matches) != 1:
            continue
        m = matches[0]
        ing = norm_ingredient(piece[:m.start()])
        strength = strength_value(m.group(0))
        if ing and strength:
            comps.append((ing, strength))
    if not comps:
        return None
    # If row strength lists multiple values but parsing found fewer components, avoid unsafe partial matching.
    expected = len(re.findall(r"\d+(?:\.\d+)?\s*(?:mcg|µg|ug|mg|g|iu|units?)\b", name, re.I))
    if expected and len(comps) != expected:
        return None
    return tuple(sorted(comps))

def form_key(text: str) -> str | None:
    t = norm_space(text)
    # More specific forms first.
    rules = [
        ("eye_drop", r"\b(eye drops?|ophthalmic drops?)\b"),
        ("ear_drop", r"\b(ear drops?|otic drops?)\b"),
        ("nasal_spray", r"\b(nasal spray|nasal drops?)\b"),
        ("inhaler", r"\b(inhaler|dry powder inhaler|mdi)\b"),
        ("injection", r"\b(injection|injectable|vial|ampoule|ampule)\b"),
        ("cream", r"\bcream\b"),
        ("ointment", r"\bointment\b"),
        ("gel", r"\bgel\b"),
        ("syrup", r"\bsyrup\b"),
        ("suspension", r"\bsuspension\b"),
        ("solution", r"\bsolution\b"),
        ("capsule", r"\b(capsule|capsules|cap\b|caps\b)\b"),
        ("tablet", r"\b(tablet|tablets|tab\b|tabs\b|dispersible|chewable|lozenge)\b"),
        ("powder", r"\b(powder|granules|sachet)\b"),
        ("lotion", r"\blotion\b"),
        ("suppository", r"\bsuppository\b"),
        ("pessary", r"\bpessary\b"),
        ("patch", r"\bpatch\b"),
    ]
    for key, pattern in rules:
        if re.search(pattern, t):
            return key
    return None

def release_key(text: str) -> str:
    t = norm_space(text)
    groups = [
        ("prolonged_release", r"\b(prolonged release|pr)\b"),
        ("sustained_release", r"\b(sustained release|sr)\b"),
        ("extended_release", r"\b(extended release|xr|er)\b"),
        ("controlled_release", r"\b(controlled release|cr)\b"),
        ("modified_release", r"\b(modified release|mr)\b"),
        ("delayed_release", r"\b(delayed release|dr)\b"),
        ("enteric_coated", r"\b(enteric coated|ec)\b"),
    ]
    found = [key for key, pattern in groups if re.search(pattern, t)]
    return "|".join(found) if found else "immediate_or_unspecified"

def pack_units(label: str) -> float | None:
    s = norm_space(label)
    # Common source labels: "strip of 10 tablets", "10's", "bottle of 100 ml".
    m = re.search(r"(?:strip|pack|box|bottle|vial|sachet|tube)\s*(?:of\s*)?(\d+(?:\.\d+)?)\s*(tablets?|capsules?|tabs?|caps?|ml|g|gm|grams?|doses?|units?)?", s)
    if not m:
        m = re.search(r"(\d+(?:\.\d+)?)\s*['’]?\s*s\b", s)
    if not m:
        m = re.search(r"\b(\d+(?:\.\d+)?)\s*(ml|g|gm|grams?|tablets?|capsules?|doses?)\b", s)
    if not m:
        return None
    try:
        return float(m.group(1))
    except (ValueError, IndexError):
        return None

def load_rows(path: Path) -> list[dict]:
    with path.open("r", encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))

def download_source() -> list[dict]:
    request = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "SastaSaathi-data-builder/1.0"})
    with urllib.request.urlopen(request, timeout=120) as response:
        text = response.read().decode("utf-8-sig", errors="replace")
    from io import StringIO
    return list(csv.DictReader(StringIO(text)))

def main() -> None:
    if not JAN_PATH.exists():
        raise SystemExit(f"Missing Jan Aushadhi CSV: {JAN_PATH}")
    jan_rows = load_rows(JAN_PATH)
    source_rows = download_source()

    # Index Jan Aushadhi items by exact normalized active ingredients + strengths + form + release.
    jan_by_key = defaultdict(list)
    jan_key_by_code = {}
    for row in jan_rows:
        if not row.get("price_inr") or not row.get("generic_name"):
            continue
        try:
            jan_price = float(row["price_inr"])
        except (ValueError, TypeError):
            continue
        if jan_price <= 0:
            continue
        comps = components_from_jan(row)
        form = form_key(row.get("generic_name", ""))
        release = release_key(row.get("generic_name", ""))
        if not comps or not form:
            continue
        key = (comps, form, release)
        enriched = dict(row)
        enriched["_components"] = comps
        enriched["_form"] = form
        enriched["_release"] = release
        enriched["_price"] = jan_price
        enriched["_units"] = pack_units(row.get("unit_size_raw", ""))
        jan_by_key[key].append(enriched)
        jan_key_by_code[str(row.get("drug_code", ""))] = key

    matched = []
    composition_brand_counts = Counter()
    seen_brand_skus = set()
    for row in source_rows:
        if norm_space(row.get("type", "")) not in {"allopathy", "allopathic", ""}:
            continue
        if norm_space(row.get("is_discontinued", row.get("Is_discontinued", "false"))) == "true":
            continue
        try:
            brand_price = float(str(row.get("price(₹)", row.get("price", ""))).replace(",", "").strip())
        except (ValueError, TypeError):
            continue
        if brand_price <= 0:
            continue
        brand_name = (row.get("name") or "").strip()
        if not brand_name:
            continue
        comp_parts = []
        for field in ("short_composition1", "short_composition2"):
            val = (row.get(field) or "").strip()
            if val:
                parsed = component_from_source(val)
                if parsed:
                    comp_parts.append(parsed)
        if not comp_parts:
            continue
        comps = tuple(sorted(comp_parts))
        form = form_key(brand_name + " " + (row.get("pack_size_label") or ""))
        if not form:
            continue
        release = release_key(brand_name)
        key = (comps, form, release)
        jan_candidates = jan_by_key.get(key, [])
        if not jan_candidates:
            continue
        brand_sku = (norm_space(brand_name), norm_space(row.get("pack_size_label", "")), comps)
        if brand_sku in seen_brand_skus:
            continue
        seen_brand_skus.add(brand_sku)
        composition_brand_counts[key] += 1
        # Prefer the Jan item with parseable unit count, then lowest per-unit price.
        jan = sorted(
            jan_candidates,
            key=lambda j: (j["_units"] is None, (j["_price"] / j["_units"]) if j["_units"] else j["_price"])
        )[0]
        brand_units = pack_units(row.get("pack_size_label", ""))
        jan_units = jan["_units"]
        brand_unit_price = brand_price / brand_units if brand_units else None
        jan_unit_price = jan["_price"] / jan_units if jan_units else None
        difference = None
        savings_pct = None
        if brand_unit_price is not None and jan_unit_price is not None:
            difference = round(brand_unit_price - jan_unit_price, 4)
            if brand_unit_price > 0:
                savings_pct = round((brand_unit_price - jan_unit_price) / brand_unit_price * 100, 2)
        matched.append({
            "branded_medicine_name": brand_name,
            "salt_composition": " + ".join(f"{ingredient} {strength[0]} {strength[1]}" for ingredient, strength in comps),
            "branded_strength_and_form": form,
            "brand_pack_size": row.get("pack_size_label", ""),
            "branded_listed_price_inr": round(brand_price, 2),
            "branded_price_type": "source dataset listed price; not independently confirmed as printed MRP",
            "manufacturer": row.get("manufacturer_name", ""),
            "discontinued_flag": row.get("Is_discontinued", row.get("is_discontinued", "")),
            "jan_aushadhi_drug_code": jan.get("drug_code", ""),
            "jan_aushadhi_generic_name": jan.get("generic_name", ""),
            "jan_aushadhi_strength": jan.get("strength", ""),
            "jan_aushadhi_pack_size": jan.get("unit_size_raw", ""),
            "jan_aushadhi_mrp_inr": round(jan["_price"], 2),
            "branded_unit_price_inr": round(brand_unit_price, 4) if brand_unit_price is not None else "",
            "jan_aushadhi_unit_price_inr": round(jan_unit_price, 4) if jan_unit_price is not None else "",
            "difference_per_unit_inr": difference if difference is not None else "",
            "estimated_savings_percent": savings_pct if savings_pct is not None else "",
            "match_status": "exact normalized composition + strength + dosage form + release type",
            "branded_price_source": SOURCE_REPO,
            "jan_aushadhi_price_source": "data/jan_aushadhi_extracted.csv (user-supplied extracted PDF; date not verified)",
            "catalogue_generated_on": dt.date.today().isoformat(),
        })

    # Prioritize compositions with the broadest brand coverage, then diversify by brand name.
    matched.sort(key=lambda r: (
        -composition_brand_counts.get((
            tuple(sorted(component_from_source(x) for x in [])), "", ""
        ), 0),
        r["branded_medicine_name"].casefold()
    ))
    # Stable, useful selection: common brand products first by source product ID, then name.
    # Dataset IDs are retained only for traceability in the output, not as clinical ranking.
    matched.sort(key=lambda r: (r["branded_medicine_name"].casefold(), r["brand_pack_size"].casefold()))
    # Deduplicate same brand name/pack while retaining distinct compositions.
    unique = []
    seen = set()
    for r in matched:
        k = (r["branded_medicine_name"].casefold(), r["brand_pack_size"].casefold(), r["salt_composition"].casefold())
        if k not in seen:
            unique.append(r)
            seen.add(k)
        if len(unique) >= TARGET_COUNT:
            break

    if len(unique) < TARGET_COUNT:
        raise SystemExit(
            f"Only {len(unique)} exact matches were found; refusing to publish a fake 500-row file. "
            "Review matching rules or source fields before proceeding."
        )
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    fields = list(unique[0].keys())
    with OUT_PATH.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(unique)
    print(f"Wrote {len(unique)} matched branded medicines to {OUT_PATH}")
    print("Reminder: source listed prices are not independently confirmed MRP; review before displaying savings.")

if __name__ == "__main__":
    main()
