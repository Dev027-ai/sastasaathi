(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const els = {
    search: $('#medicineSearch'), clear: $('#clearSearch'), voice: $('#voiceButton'), voiceStatus: $('#voiceStatus'),
    resultsSection: $('#resultsSection'), results: $('#resultsList'), resultCount: $('#resultCount'),
    compareSection: $('#compareSection'), selected: $('#selectedMedicine'), janPrice: $('#janPriceValue'), janPack: $('#janPackValue'),
    brandPrice: $('#brandPrice'), savingsPanel: $('#savingsPanel'), savingsHeadline: $('#savingsHeadline'), savingsAmount: $('#savingsAmount'), savingsPercent: $('#savingsPercent'),
    language: $('#languageToggle'), reset: $('#resetButton'), toast: $('#toast'),
    imageInput: $('#prescriptionImage'), imagePreviewWrap: $('#ocrPreviewWrap'), imagePreview: $('#ocrPreview'), readPhoto: $('#readPhoto'), clearOcrImage: $('#clearOcrImage'), ocrText: $('#ocrText'), ocrProgress: $('#ocrProgress'), searchOcrText: $('#searchOcrText')
  };
  const translations = {
    en: {
      tagline:'Medicine price companion',offlineReady:'Offline ready',eyebrow:'A little help at the pharmacy',heroTitle:'Pay less for the <em>same medicine.</em>',heroSub:'Search a medicine. See the listed Jan Aushadhi price and calculate how much you could save.',priceCheck:'PRICE<br>CHECK',stepOne:'STEP 1',searchTitle:'Which medicine?',searchLabel:'Type the name or tap the microphone',searchHelp:'Search by generic or ingredient name. Brand names are not mapped in this dataset yet; if a brand is not found, try the ingredient. Common spelling mistakes are okay.',speak:'Speak',try:'Try:',stepTwo:'STEP 2',resultsTitle:'Choose a matching record',stepThree:'STEP 3',compareTitle:'See your possible savings',janPrice:'Jan Aushadhi listed price',brandPriceLabel:'Your branded medicine price (₹)',brandPriceHelp:'Enter the price for the same strength and pack size.',enterBrandPrice:'Enter the branded price to calculate savings',otherOptions:'Other lower-price options',otherOptionsText:'We only list alternatives when verified, comparable price data is available. No other brand prices are included in this dataset yet.',dataGap:'Verified brand-price data not loaded',searchAnother:'Search another medicine',safeTitle:'Your health comes first',safeText:'This tool compares indicative prices only. Do not change or replace any medicine yourself. Ask your doctor or pharmacist to confirm the exact medicine, strength and pack.',dataWarningTitle:'About these prices:',dataWarning:'The bundled source data is marked for human review and its publication date is unverified. Actual prices and stock may differ at the pharmacy.',offlineFooter:'Designed for low-data and offline use',matchNote:'Search matches are suggestions, not a medical equivalence check.',samePack:'Compare the same strength and pack size only.',noResults:'No close match found',noResultsHelp:'Try a shorter name, the active ingredient, or use voice search.',resultsFound:'matching records',priceMissing:'Price unavailable',missingStrength:'Strength not listed',missingPack:'Pack size not listed',humanReview:'Source data needs review',priceDisclaimer:'Indicative listed price',noSpeech:'Voice search is not supported in this browser. Please type the name.',listening:'Listening… say the medicine name',voiceError:'Could not hear that clearly. Please try again or type the name.',voiceNotAllowed:'Microphone permission was not granted. You can type instead.',voiceSearchFailed:'Voice search is unavailable right now. Please type the name.',searchingFor:'Searching for',save:'Potential saving',moreCost:'The Jan Aushadhi listed price is higher than the price you entered.',equalPrice:'Both entered prices are the same.',savedPercent:'less than the branded price you entered',moreThan:'more than the branded price you entered',zeroBrand:'Enter a price greater than ₹0.',invalidBrand:'Please enter a valid price.',selectedPriceMissing:'This record has no usable price. Choose another record.',packUnknown:'Pack size not verified',strengthUnknown:'Strength not verified',resetToast:'Search cleared.',compareIncomplete:'Strength or pack details are missing. We cannot safely compare these prices.',noPrice:'A valid listed price is not available for this record.',ocrTitle:'Or take a photo of the medicine name',ocrHelp:'Choose a clear photo of a printed prescription, medicine strip or box. Check the text before searching.',uploadImage:'Choose photo',readPhoto:'Read text from photo',removePhoto:'Remove photo',ocrTextLabel:'Text detected (please check it)',ocrPlaceholder:'Detected medicine text will appear here…',searchOcr:'Search detected text',ocrCaveat:'OCR can misread names and strengths. Photos stay on this device; this first version needs internet to load its OCR engine. Handwriting may not read correctly. Always verify with a pharmacist.',ocrLoading:'Loading on-device text reader…',ocrWorking:'Reading image…',ocrDone:'Text found. Please check the medicine name and strength before searching.',ocrNone:'No clear text found. Try a brighter, sharper photo or type the name.',ocrFailed:'Could not read this image. Try another photo or type the name.',ocrNeedsPhoto:'Choose a photo first.',ocrEngineFailed:'Text reader could not load. Connect to the internet once and retry.'
    },
    hi: {
      tagline:'दवा की कीमत की जानकारी',offlineReady:'ऑफ़लाइन तैयार',eyebrow:'दवा की दुकान पर थोड़ी मदद',heroTitle:'उसी दवा के लिए <em>कम पैसे दें।</em>',heroSub:'दवा खोजें। जन औषधि की दर्ज कीमत देखें और संभावित बचत जानें।',priceCheck:'कीमत<br>जाँचें',stepOne:'पहला चरण',searchTitle:'कौन-सी दवा?',searchLabel:'नाम लिखें या माइक दबाकर बोलें',searchHelp:'दवा के जेनेरिक नाम या घटक का नाम लिखें। ब्रांड नामों की सूची अभी उपलब्ध नहीं है; ब्रांड न मिले तो घटक का नाम लिखें। छोटी वर्तनी की गलतियाँ भी चल सकती हैं।',speak:'बोलें',try:'जैसे:',stepTwo:'दूसरा चरण',resultsTitle:'सही रिकॉर्ड चुनें',stepThree:'तीसरा चरण',compareTitle:'अपनी संभावित बचत देखें',janPrice:'जन औषधि में दर्ज कीमत',brandPriceLabel:'आपकी ब्रांडेड दवा की कीमत (₹)',brandPriceHelp:'उसी ताकत और पैक की कीमत भरें।',enterBrandPrice:'बचत जानने के लिए ब्रांडेड कीमत भरें',otherOptions:'दूसरे कम कीमत वाले विकल्प',otherOptionsText:'हम विकल्प तभी दिखाएँगे जब समान दवा की सत्यापित कीमत उपलब्ध हो। इस डेटा में दूसरे ब्रांड की कीमतें अभी शामिल नहीं हैं।',dataGap:'सत्यापित ब्रांड कीमत उपलब्ध नहीं',searchAnother:'दूसरी दवा खोजें',safeTitle:'आपकी सेहत सबसे पहले',safeText:'यह साधन केवल अनुमानित कीमतों की तुलना करता है। खुद से दवा न बदलें। सही दवा, ताकत और पैक की पुष्टि डॉक्टर या फार्मासिस्ट से करें।',dataWarningTitle:'इन कीमतों के बारे में:',dataWarning:'दिए गए स्रोत डेटा की मानवीय जाँच बाकी है और कीमतों की प्रकाशन तारीख सत्यापित नहीं है। दुकान पर कीमत और उपलब्धता अलग हो सकती है।',offlineFooter:'कम इंटरनेट और ऑफ़लाइन इस्तेमाल के लिए',matchNote:'खोज के नतीजे केवल सुझाव हैं, दवाओं के समान होने की चिकित्सकीय पुष्टि नहीं।',samePack:'केवल समान ताकत और पैक की तुलना करें।',noResults:'मिलता-जुलता नाम नहीं मिला',noResultsHelp:'छोटा नाम या दवा का घटक लिखें, या बोलकर खोजें।',resultsFound:'मिलते-जुलते रिकॉर्ड',priceMissing:'कीमत उपलब्ध नहीं',missingStrength:'ताकत दर्ज नहीं',missingPack:'पैक का आकार दर्ज नहीं',humanReview:'स्रोत डेटा की जाँच बाकी',priceDisclaimer:'दर्ज अनुमानित कीमत',noSpeech:'इस ब्राउज़र में आवाज़ से खोज उपलब्ध नहीं। कृपया नाम लिखें।',listening:'सुन रहे हैं… दवा का नाम बोलें',voiceError:'नाम साफ़ सुनाई नहीं दिया। फिर कोशिश करें या लिखें।',voiceNotAllowed:'माइक की अनुमति नहीं मिली। आप नाम लिख सकते हैं।',voiceSearchFailed:'अभी आवाज़ से खोज नहीं हो पा रही। कृपया नाम लिखें।',searchingFor:'खोज रहे हैं',save:'संभावित बचत',moreCost:'जन औषधि की दर्ज कीमत आपके भरे हुए दाम से अधिक है।',equalPrice:'दोनों कीमतें बराबर हैं।',savedPercent:'आपकी भरी ब्रांड कीमत से कम',moreThan:'आपकी भरी ब्रांड कीमत से अधिक',zeroBrand:'₹0 से अधिक कीमत भरें।',invalidBrand:'कृपया सही कीमत भरें।',selectedPriceMissing:'इस रिकॉर्ड की सही कीमत उपलब्ध नहीं। दूसरा रिकॉर्ड चुनें।',packUnknown:'पैक का आकार सत्यापित नहीं',strengthUnknown:'ताकत सत्यापित नहीं',resetToast:'खोज साफ़ कर दी गई।',compareIncomplete:'दवा की ताकत या पैक का विवरण नहीं है। सुरक्षित तुलना नहीं की जा सकती।',noPrice:'इस रिकॉर्ड की सही दर्ज कीमत उपलब्ध नहीं है।'
    }
  };
  let language = 'en';
  let medicines = [];
  let selectedMedicine = null;
  let recognition = null;
  let voiceTimeout = null;

  const t = (key) => translations[language][key] || translations.en[key] || key;
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const money = (value) => new Intl.NumberFormat(language === 'hi' ? 'hi-IN' : 'en-IN', {style:'currency',currency:'INR',maximumFractionDigits:2}).format(value);
  const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\b(tablets?|capsules?|tablet|capsule|ip|usp|and)\b/g,' ').replace(/[^a-z0-9\u0900-\u097f]+/g,' ').trim().replace(/\s+/g,' ');
  function distance(a,b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    if (Math.abs(a.length-b.length)>3) return 99;
    let prev = Array.from({length:b.length+1},(_,i)=>i);
    for (let i=1;i<=a.length;i++) {
      const cur=[i]; let rowMin=i;
      for(let j=1;j<=b.length;j++) { const v=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1)); cur[j]=v; rowMin=Math.min(rowMin,v); }
      if(rowMin>3) return 99; prev=cur;
    }
    return prev[b.length];
  }
  function scoreMedicine(m, query) {
    const q=normalize(query), name=normalize(m.name), strength=normalize(m.strength), full=`${name} ${strength}`.trim();
    if(!q) return 0;
    if(name===q || full===q) return 120;
    if(name.startsWith(q)) return 105 - Math.max(0,name.length-q.length)*.04;
    if(name.includes(q)) return 95 - name.indexOf(q)*.05;
    const qTokens=q.split(' ').filter(Boolean), nTokens=name.split(' ');
    let hits=0, near=0;
    for(const token of qTokens) {
      if(nTokens.some(n=>n===token)) hits++;
      else if(token.length>=4 && nTokens.some(n=>Math.min(n.length,token.length)>=4 && distance(n,token)<=Math.max(1,Math.floor(token.length*.25)))) near++;
    }
    if(hits+near===qTokens.length) return 70 + hits*5 + near*2 - Math.abs(nTokens.length-qTokens.length);
    if(q.length>=4) { const d=distance(q,name); if(d<=Math.max(1,Math.floor(q.length*.22))) return 48-d; }
    return 0;
  }
  function search(query) {
    const q=String(query||'').trim();
    if(!q) return [];
    return medicines.map(m=>({m,score:scoreMedicine(m,q)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score || (a.m.price||Infinity)-(b.m.price||Infinity)).slice(0,12).map(x=>x.m);
  }
  function applyLanguage() {
    document.documentElement.lang=language==='hi'?'hi':'en';
    document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(translations[language][key]) el.innerHTML=translations[language][key];});
    els.language.textContent=language==='en'?'हिंदी':'English';
    els.search.placeholder=language==='hi'?'जैसे पैरासिटामोल':'e.g. paracetamol';
    els.ocrText.placeholder=t('ocrPlaceholder');
    els.search.setAttribute('aria-label',language==='hi'?'दवा का नाम खोजें':'Search medicine name');
    els.voice.setAttribute('aria-label',language==='hi'?'आवाज़ से दवा खोजें':'Search by voice');
    els.clear.setAttribute('aria-label',language==='hi'?'खोज मिटाएँ':'Clear search');
    els.brandPrice.setAttribute('aria-label',t('brandPriceLabel'));
    if(els.resultsSection.hidden===false && els.compareSection.hidden && els.search.value.trim()) renderResults(search(els.search.value));
    if(selectedMedicine) { const previousBrandPrice=els.brandPrice.value; renderSelected(selectedMedicine); els.brandPrice.value=previousBrandPrice; }
    updateSavings();
  }
  function renderResults(results) {
    els.resultsSection.hidden=false;
    els.compareSection.hidden=true;
    selectedMedicine=null;
    els.resultCount.textContent=`${results.length} ${t('resultsFound')}`;
    if(!results.length) {
      els.results.innerHTML=`<div class="empty-state"><strong>${esc(t('noResults'))}</strong><p>${esc(t('noResultsHelp'))}</p></div>`;
      return;
    }

    // Elder-friendly, one-result-at-a-time view: large type and no long result list to scroll.
    let activeIndex=0;
    const paint = () => {
      const m=results[activeIndex];
      const meta=[m.strength||t('missingStrength'),m.pack||t('missingPack')].join(' · ');
      els.results.innerHTML=`
        <article class="medicine-result featured-medicine-result" aria-live="polite">
          <div class="featured-result-top"><span class="result-icon" aria-hidden="true">＋</span><span class="featured-result-position">${activeIndex+1} / ${results.length}</span></div>
          <div class="result-name">${esc(m.name)}</div>
          <div class="result-meta">${esc(meta)}</div>
          <div class="featured-result-price">${m.price>0?esc(money(m.price)):esc(t('priceMissing'))}</div>
          <div class="featured-result-code">Medicine code: ${esc(m.code)}</div>
          <button type="button" class="button primary featured-select" data-select>${language==='hi'?'यह दवा चुनें':'Select this medicine'} <span aria-hidden="true">→</span></button>
        </article>
        <nav class="result-pager" aria-label="Medicine search results">
          <button type="button" class="button secondary" data-prev ${activeIndex===0?'disabled':''}>← ${language==='hi'?'पिछली':'Previous'}</button>
          <span class="pager-label">${language==='hi'?'मिलान':'Match'} ${activeIndex+1} ${language==='hi'?'में से':'of'} ${results.length}</span>
          <button type="button" class="button secondary" data-next ${activeIndex===results.length-1?'disabled':''}>${language==='hi'?'अगली':'Next'} →</button>
        </nav>`;
      els.results.querySelector('[data-select]').addEventListener('click',()=>chooseMedicine(m));
      els.results.querySelector('[data-prev]').addEventListener('click',()=>{if(activeIndex>0){activeIndex--;paint();}});
      els.results.querySelector('[data-next]').addEventListener('click',()=>{if(activeIndex<results.length-1){activeIndex++;paint();}});
    };
    paint();
  }
  function renderSelected(m) {
    const incomplete=[];
    if(!m.strength) incomplete.push(t('strengthUnknown'));
    if(!m.pack) incomplete.push(t('packUnknown'));
    els.selected.innerHTML=`<div class="selected-name">${esc(m.name)}</div><div class="selected-meta">${esc(m.strength||t('missingStrength'))} · ${esc(m.pack||t('missingPack'))} · Code ${esc(m.code)}</div><span class="review-flag">${esc(t('humanReview'))}</span>${incomplete.length?`<span class="review-flag">${esc(incomplete.join(' · '))}</span>`:''}`;
    els.janPrice.textContent=m.price>0?money(m.price):t('priceMissing');
    els.janPack.textContent=m.pack?`${esc(m.pack)} · ${t('priceDisclaimer')}`:t('packUnknown');
    els.brandPrice.value='';
    els.savingsPanel.classList.remove('negative');
    els.savingsHeadline.textContent=t('enterBrandPrice');
    els.savingsAmount.textContent='—';
    els.savingsPercent.textContent='';
    els.compareSection.hidden=false;
  }
  function chooseMedicine(m) {
    if(!m || !(m.price>0)) { showToast(t('selectedPriceMissing')); return; }
    selectedMedicine=m;
    renderSelected(m);
    els.compareSection.scrollIntoView({behavior:'smooth',block:'start'});
    els.brandPrice.focus({preventScroll:true});
  }
  function updateSavings() {
    if(!selectedMedicine) return;
    const result = window.SastaPricing.calculateSavings(els.brandPrice.value, selectedMedicine.price, selectedMedicine);
    els.savingsPanel.classList.remove('negative');
    if(result.status==='empty') { els.savingsHeadline.textContent=t('enterBrandPrice'); els.savingsAmount.textContent='—'; els.savingsPercent.textContent=''; return; }
    if(result.status==='invalid') { els.savingsHeadline.textContent=t('zeroBrand'); els.savingsAmount.textContent='—'; els.savingsPercent.textContent=''; return; }
    if(result.status==='incomplete') { els.savingsHeadline.textContent=t('compareIncomplete'); els.savingsAmount.textContent='—'; els.savingsPercent.textContent=''; return; }
    if(result.status==='no-price') { els.savingsHeadline.textContent=t('noPrice'); els.savingsAmount.textContent='—'; els.savingsPercent.textContent=''; return; }
    if(result.status==='equal') { els.savingsHeadline.textContent=t('equalPrice'); els.savingsAmount.textContent=money(0); els.savingsPercent.textContent=''; return; }
    if(result.status==='saving') {
      els.savingsHeadline.textContent=t('save'); els.savingsAmount.textContent=money(result.difference); els.savingsPercent.textContent=`${result.percent.toFixed(1)}% ${t('savedPercent')}`;
    } else {
      els.savingsPanel.classList.add('negative'); els.savingsHeadline.textContent=t('moreCost'); els.savingsAmount.textContent=money(result.difference); els.savingsPercent.textContent=`${result.percent.toFixed(1)}% ${t('moreThan')}`;
    }
  }
  function showToast(message) { els.toast.textContent=message;els.toast.hidden=false;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>{els.toast.hidden=true;},2800); }
  function setVoiceStatus(message,visible=true) { els.voiceStatus.textContent=message;els.voiceStatus.hidden=!visible; }
  function stopListening() { clearTimeout(voiceTimeout);if(recognition){try{recognition.stop();}catch(_){}}els.voice.classList.remove('listening'); }
  function startVoice() {
    const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SpeechRecognition){setVoiceStatus(t('noSpeech'));return;}
    if(recognition){stopListening();recognition=null;return;}
    try {
      recognition=new SpeechRecognition(); recognition.lang=language==='hi'?'hi-IN':'en-IN'; recognition.interimResults=false;recognition.maxAlternatives=3;
      recognition.onstart=()=>{els.voice.classList.add('listening');setVoiceStatus(t('listening'));voiceTimeout=setTimeout(()=>stopListening(),12000);};
      recognition.onresult=(event)=>{const transcript=event.results?.[0]?.[0]?.transcript?.trim();if(transcript){els.search.value=transcript;els.clear.hidden=false;renderResults(search(transcript));setVoiceStatus(`${t('searchingFor')}: “${transcript}”`);els.resultsSection.scrollIntoView({behavior:'smooth',block:'start'});}else setVoiceStatus(t('voiceError'));};
      recognition.onerror=(event)=>{const message=event.error==='not-allowed'||event.error==='service-not-allowed'?t('voiceNotAllowed'):t('voiceSearchFailed');setVoiceStatus(message);};
      recognition.onend=()=>{clearTimeout(voiceTimeout);els.voice.classList.remove('listening');recognition=null;};
      recognition.start();
    } catch(_) { recognition=null;setVoiceStatus(t('voiceSearchFailed')); }
  }
  let selectedImageUrl = null;
  let ocrWorkerPromise = null;
  function setOcrStatus(message, visible=true) { els.ocrProgress.textContent=message; els.ocrProgress.hidden=!visible; }
  function loadOcrEngine() {
    if(window.Tesseract) return Promise.resolve(window.Tesseract);
    if(ocrWorkerPromise) return ocrWorkerPromise;
    ocrWorkerPromise = new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
      script.async=true;
      script.onload=()=>window.Tesseract?resolve(window.Tesseract):reject(new Error('OCR library unavailable'));
      script.onerror=()=>reject(new Error('OCR library failed to load'));
      document.head.appendChild(script);
    });
    return ocrWorkerPromise;
  }
  async function readSelectedPhoto() {
    const file=els.imageInput.files?.[0];
    if(!file) { setOcrStatus(t('ocrNeedsPhoto')); return; }
    if(!file.type.startsWith('image/')) { setOcrStatus(t('ocrFailed')); return; }
    if(file.size>12*1024*1024) { setOcrStatus(language==='hi'?'फोटो 12 MB से छोटी चुनें।':'Choose an image smaller than 12 MB.'); return; }
    els.readPhoto.disabled=true; setOcrStatus(t('ocrLoading'));
    try {
      const Tesseract=await loadOcrEngine();
      setOcrStatus(t('ocrWorking'));
      const worker=await Tesseract.createWorker('eng', 1, { logger: m=>{ if(m.status==='recognizing text' && Number.isFinite(m.progress)) setOcrStatus(`${t('ocrWorking')} ${Math.round(m.progress*100)}%`); } });
      try {
        const result=await worker.recognize(file);
        const text=(result.data.text||'').replace(/[|_~]+/g,' ').replace(/[ 	]+/g,' ').trim();
        els.ocrText.value=text;
        setOcrStatus(text?t('ocrDone'):t('ocrNone'));
        if(text) els.ocrText.focus();
      } finally { await worker.terminate(); }
    } catch(error) {
      setOcrStatus(navigator.onLine?t('ocrFailed'):t('ocrEngineFailed'));
    } finally { els.readPhoto.disabled=false; }
  }
  function clearSelectedPhoto() {
    if(selectedImageUrl) URL.revokeObjectURL(selectedImageUrl);
    selectedImageUrl=null; els.imageInput.value=''; els.imagePreview.removeAttribute('src'); els.imagePreviewWrap.hidden=true; setOcrStatus('',false);
  }
  els.imageInput.addEventListener('change',()=>{
    const file=els.imageInput.files?.[0]; if(!file) { clearSelectedPhoto(); return; }
    if(!file.type.startsWith('image/')) { clearSelectedPhoto(); setOcrStatus(t('ocrFailed')); return; }
    if(selectedImageUrl) URL.revokeObjectURL(selectedImageUrl);
    selectedImageUrl=URL.createObjectURL(file); els.imagePreview.src=selectedImageUrl; els.imagePreviewWrap.hidden=false; setOcrStatus('',false);
  });
  els.readPhoto.addEventListener('click',readSelectedPhoto);
  els.clearOcrImage.addEventListener('click',clearSelectedPhoto);
  els.searchOcrText.addEventListener('click',()=>{
    const query=els.ocrText.value.trim();
    if(!query) { setOcrStatus(t('ocrNone')); return; }
    // OCR may capture directions or multiple lines; the user can edit the text before searching.
    const firstUsefulLine=query.split(/\n+/).map(line=>line.trim()).find(line=>/[a-zA-Z]{3,}/.test(line))||query;
    els.search.value=firstUsefulLine; els.clear.hidden=false; renderResults(search(firstUsefulLine));
    els.resultsSection.scrollIntoView({behavior:'smooth',block:'start'});
  });

  async function init() {
    try {
      const response=await fetch('./data/medicines.json',{cache:'force-cache'});
      if(!response.ok) throw new Error('data unavailable');
      medicines=await response.json();
    } catch(error) {
      els.resultsSection.hidden=false;
      els.results.innerHTML='<div class="empty-state"><strong>Medicine data could not be loaded</strong><p>Open the app through localhost or HTTPS, reload once, then try offline.</p></div>';
    }
    if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1')) {
      navigator.serviceWorker.register('./sw.js').catch(()=>{});
    }
  }
  els.search.addEventListener('input',()=>{const query=els.search.value;els.clear.hidden=!query;if(query.trim())renderResults(search(query));else {els.resultsSection.hidden=true;els.compareSection.hidden=true;selectedMedicine=null;}});
  els.clear.addEventListener('click',()=>{els.search.value='';els.clear.hidden=true;els.resultsSection.hidden=true;els.compareSection.hidden=true;selectedMedicine=null;els.search.focus();});
  els.voice.addEventListener('click',startVoice);
  els.language.addEventListener('click',()=>{language=language==='en'?'hi':'en';applyLanguage();});
  els.brandPrice.addEventListener('input',updateSavings);
  els.reset.addEventListener('click',()=>{els.search.value='';els.clear.hidden=true;els.resultsSection.hidden=true;els.compareSection.hidden=true;selectedMedicine=null;els.brandPrice.value='';window.scrollTo({top:0,behavior:'smooth'});els.search.focus({preventScroll:true});showToast(t('resetToast'));});
  document.querySelectorAll('.quick-chip').forEach(button=>button.addEventListener('click',()=>{els.search.value=button.dataset.query;els.clear.hidden=false;renderResults(search(button.dataset.query));els.resultsSection.scrollIntoView({behavior:'smooth',block:'start'});}));
  init();
})();
