# SastaSaathi — Medicine Price Companion

A mobile-first, offline-first medicine price comparison prototype designed for older adults and people who prefer voice or Hindi. Search the bundled Jan Aushadhi dataset, inspect the listed strength/pack/price, and calculate potential savings against a branded price supplied by the user.

> **Important:** The supplied CSV is marked `extracted_needs_human_review`; its price publication date is not verified. Prices are indicative data from the supplied file, not a guarantee of current availability or price. This app does not give medical advice and never recommends changing a medicine. Confirm any substitution with a doctor or pharmacist.

## Run locally

No build step or package installation is required. Serve this directory with any static HTTP server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. Service-worker offline caching requires localhost or HTTPS. Open the app once online/local, then test with airplane mode.

## Data and matching

- `data/jan_aushadhi_extracted.csv` is the supplied source file, preserved with its review status. In the supplied 2,308 records, 460 lack strength, 216 lack pack size, and 332 have blank or non-positive prices; the app blocks savings for records missing strength/pack or a usable price.
- `data/medicines.json` is generated from that CSV for quick offline lookup.
- Search uses deterministic text normalization and fuzzy ranking over generic/ingredient names. The supplied dataset does not contain a verified brand-name crosswalk, so brand-name lookup is not yet comprehensive. Search suggestions are not clinical equivalence decisions.
- Branded price comparison is user-entered in this MVP. We do **not** invent branded prices or claim another brand is equivalent without verified product data.
- Missing strength or pack details are visibly flagged; uncertain records should not be used to make substitution decisions.

## Voice and offline behavior

Typed search and bundled-data lookup work offline after the first load. Voice search uses the browser's Web Speech API where available; speech recognition may require a supported browser and/or network and is not guaranteed offline. The microphone control is hidden/disabled if unsupported, and typing always remains available.

## Sources and credits

- Medicine records: user-provided `jan_aushadhi_extracted.csv` (extracted from a supplied Jan Aushadhi PDF; source pages are included in the data).
- UI, offline PWA shell, matching logic, and savings calculator: this project.
- No live APIs or language models are used to generate medicine information.

## License

MIT — see [LICENSE](LICENSE).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Keep changes small, tested, and focused. Never add unverified medical claims or fabricate medicine prices.
