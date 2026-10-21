(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const els = {
    search: $('#medicineSearch'), clear: $('#clearSearch'), voice: $('#voiceButton'), voiceStatus: $('#voiceStatus'),
    resultsSection: $('#resultsSection'), results: $('#resultsList'), resultCount: $('#resultCount'),
    compareSection: $('#compareSection'), selected: $('#selectedMedicine'), janPrice: $('#janPriceValue'), janPack: $('#janPackValue'),
    brandPrice: $('#brandPrice'), savingsPanel: $('#savingsPanel'), savingsHeadline: $('#savingsHeadline'), savingsAmount: $('#savingsAmount'), savingsPercent: $('#savingsPercent'),
    language: $('#languageToggle'), reset: $('#resetButton'), toast: $('#toast')
  };
  const translations = {
    en: {
      tagline:'Medicine price companion',offlineReady:'Offline ready',eyebrow:'A little help at the pharmacy',heroTitle:'Pay less for the <em>same medicine.</em>',heroSub:'Search a medicine. See the listed Jan Aushadhi price and calculate how much you could save.',priceCheck:'PRICE<br>CHECK',stepOne:'STEP 1',searchTitle:'Which medicine?',searchLabel:'Type the name or tap the microphone',searchHelp:'You can type a brand name or the medicine ingredient. Common spelling mistakes are okay.',speak:'Speak',try:'Try:',stepTwo:'STEP 2',resultsTitle:'Choose a matching record',stepThree:'STEP 3',compareTitle:'See your possible savings',janPrice:'Jan Aushadhi listed price',brandPriceLabel:'Your branded medicine price (₹)',brandPriceHelp:'Enter the price for the same strength and pack size.',enterBrandPrice:'Enter the branded price to calculate savings',otherOptions:'Other lower-price options',otherOptionsText:'We only list alternatives when verified, comparable price data is available. No other brand prices are included in this dataset yet.',dataGap:'Verified brand-price data not loaded',searchAnother:'Search another medicine',safeTitle:'Your health comes first',safeText:'This tool compares indicative prices only. Do not change or replace any medicine yourself. Ask your doctor or pharmacist to confirm the exact medicine, strength and pack.',dataWarningTitle:'About these prices:',dataWarning:'The bundled source data is marked for human review and its publication date is unverified. Actual prices and stock may differ at the pharmacy.',offlineFooter:'Designed for low-data and offline use',matchNote:'Search matches are suggestions, not a medical equivalence check.',samePack:'Compare the same strength and pack size only.',noResults:'No close match found',noResultsHelp:'Try a shorter name, the active ingredient, or use voice search.',resultsFound:'matching records',priceMissing:'Price unavailable',missingStrength:'Strength not listed',missingPack:'Pack size not listed',humanReview:'Source data needs review',priceDisclaimer:'Indicative listed price',noSpeech:'Voice search is not supported in this browser. Please type the name.',listening:'Listening… say the medicine name',voiceError:'Could not hear that clearly. Please try again or type the name.',voiceNotAllowed:'Microphone permission was not granted. You can type instead.',voiceSearchFailed:'Voice search is unavailable right now. Please type the name.',searchingFor:'Searching for',save:'Potential saving',moreCost:'The Jan Aushadhi listed price is higher than the price you entered.',equalPrice:'Both entered prices are the same.',savedPercent:'less than the branded price you entered',moreThan:'more than the branded price you entered',zeroBrand:'Enter a price greater than ₹0.',invalidBrand:'Please enter a valid price.',selectedPriceMissing:'This record has no usable price. Choose another record.',packUnknown:'Pack size not verified',strengthUnknown:'Strength not verified',resetToast:'Search cleared.'
    },
    hi: {
      tagline:'दवा की कीमत की जानकारी',offlineReady:'ऑफ़लाइन तैयार',eyebrow:'दवा की दुकान पर थोड़ी मदद',heroTitle:'उसी दवा के लिए <em>कम पैसे दें।</em>',heroSub:'दवा खोजें। जन औषधि की दर्ज कीमत देखें और संभावित बचत जानें।',priceCheck:'कीमत<br>जाँचें',stepOne:'पहला चरण',searchTitle:'कौन-सी दवा?',searchLabel:'नाम लिखें या माइक दबाकर बोलें',searchHelp:'ब्रांड या दवा के घटक का नाम लिखें। छोटी वर्तनी की गलतियाँ भी चल सकती हैं।',speak:'बोलें',try:'जैसे:',stepTwo:'दूसरा चरण',resultsTitle:'सही रिकॉर्ड चुनें',stepThree:'तीसरा चरण',compareTitle:'अपनी संभावित बचत देखें',janPrice:'जन औषधि में दर्ज कीमत',brandPriceLabel:'आपकी ब्रांडेड दवा की कीमत (₹)',brandPriceHelp:'उसी ताकत और पैक की कीमत भरें।',enterBrandPrice:'बचत जानने के लिए ब्रांडेड कीमत भरें',otherOptions:'दूसरे कम कीमत वाले विकल्प',otherOptionsText:'हम विकल्प तभी दिखाएँगे जब समान दवा की सत्यापित कीमत उपलब्ध हो। इस डेटा में दूसरे ब्रांड की कीमतें अभी शामिल नहीं हैं।',dataGap:'सत्यापित ब्रांड कीमत उपलब्ध नहीं',searchAnother:'दूसरी दवा खोजें',safeTitle:'आपकी सेहत सबसे पहले',safeText:'यह साधन केवल अनुमानित कीमतों की तुलना करता है। खुद से दवा न बदलें। सही दवा, ताकत और पैक की पुष्टि डॉक्टर या फार्मासिस्ट से करें।',dataWarningTitle:'इन कीमतों के बारे में:',dataWarning:'दिए गए स्रोत डेटा की मानवीय जाँच बाकी है और कीमतों की प्रकाशन तारीख सत्यापित नहीं है। दुकान पर कीमत और उपलब्धता अलग हो सकती है।',offlineFooter:'कम इंटरनेट और ऑफ़लाइन इस्तेमाल के लिए',matchNote:'खोज के नतीजे केवल सुझाव हैं, दवाओं के समान होने की चिकित्सकीय पुष्टि नहीं।',samePack:'केवल समान ताकत और पैक की तुलना करें।',noResults:'मिलता-जुलता नाम नहीं मिला',noResultsHelp:'छोटा नाम या दवा का घटक लिखें, या बोलकर खोजें।',resultsFound:'मिलते-जुलते रिकॉर्ड',priceMissing:'कीमत उपलब्ध नहीं',missingStrength:'ताकत दर्ज नहीं',missingPack:'पैक का आकार दर्ज नहीं',humanReview:'स्रोत डेटा की जाँच बाकी',priceDisclaimer:'दर्ज अनुमानित कीमत',noSpeech:'इस ब्राउज़र में आवाज़ से खोज उपलब्ध नहीं। कृपया नाम लिखें।',listening:'सुन रहे हैं… दवा का नाम बोलें',voiceError:'नाम साफ़ सुनाई नहीं दिया। फिर कोशिश करें या लिखें।',voiceNotAllowed:'माइक की अनुमति नहीं मिली। आप नाम लिख सकते हैं।',voiceSearchFailed:'अभी आवाज़ से खोज नहीं हो पा रही। कृपया नाम लिखें।',searchingFor:'खोज रहे हैं',save:'संभावित बचत',moreCost:'जन औषधि की दर्ज कीमत आपके भरे हुए दाम से अधिक है।',equalPrice:'दोनों कीमतें बराबर हैं।',savedPercent:'आपकी भरी ब्रांड कीमत से कम',moreThan:'आपकी भरी ब्रांड कीमत से अधिक',zeroBrand:'₹0 से अधिक कीमत भरें।',invalidBrand:'कृपया सही कीमत भरें।',selectedPriceMissing:'इस रिकॉर्ड की सही कीमत उपलब्ध नहीं। दूसरा रिकॉर्ड चुनें।',packUnknown:'पैक का आकार सत्यापित नहीं',strengthUnknown:'ताकत सत्यापित नहीं',resetToast:'खोज साफ़ कर दी गई।'
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
    els.search.setAttribute('aria-label',language==='hi'?'दवा का नाम खोजें':'Search medicine name');
    els.voice.setAttribute('aria-label',language==='hi'?'आवाज़ से दवा खोजें':'Search by voice');
    els.clear.setAttribute('aria-label',language==='hi'?'खोज मिटाएँ':'Clear search');
    els.brandPrice.setAttribute('aria-label',t('brandPriceLabel'));
    if(els.resultsSection.hidden===false && els.search.value.trim()) renderResults(search(els.search.value));
    if(selectedMedicine) renderSelected(selectedMedicine);
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
    els.results.innerHTML=results.map((m,i)=>{
      const meta=[m.strength||t('missingStrength'),m.pack||t('missingPack')].join(' · ');
      return `<button type="button" class="medicine-result" data-index="${i}" aria-label="${esc(m.name)}, ${esc(meta)}, ${m.price>0?esc(money(m.price)):esc(t('priceMissing'))}"><span class="result-icon" aria-hidden="true">＋</span><span class="result-main"><span class="result-name">${esc(m.name)}</span><span class="result-meta">${esc(meta)} · Code ${esc(m.code)}</span></span><span class="result-price">${m.price>0?esc(money(m.price)):esc(t('priceMissing'))}</span><span class="result-arrow" aria-hidden="true">›</span></button>`;
    }).join('');
    [...els.results.querySelectorAll('.medicine-result')].forEach((button,index)=>button.addEventListener('click',()=>chooseMedicine(results[index])));
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
    const brand=Number(els.brandPrice.value), jan=Number(selectedMedicine.price);
    els.savingsPanel.classList.remove('negative');
    if(els.brandPrice.value.trim()==='' || !Number.isFinite(brand)) {
      els.savingsHeadline.textContent=t('enterBrandPrice'); els.savingsAmount.textContent='—'; els.savingsPercent.textContent=''; return;
    }
    if(brand<=0) { els.savingsHeadline.textContent=t('zeroBrand'); els.savingsAmount.textContent='—'; els.savingsPercent.textContent=''; return; }
    const diff=brand-jan;
    if(Math.abs(diff)<0.005) { els.savingsHeadline.textContent=t('equalPrice');els.savingsAmount.textContent=money(0);els.savingsPercent.textContent='';return; }
    if(diff>0) {
      const pct=diff/brand*100;
      els.savingsHeadline.textContent=t('save'); els.savingsAmount.textContent=money(diff); els.savingsPercent.textContent=`${pct.toFixed(1)}% ${t('savedPercent')}`;
    } else {
      els.savingsPanel.classList.add('negative');els.savingsHeadline.textContent=t('moreCost');els.savingsAmount.textContent=money(Math.abs(diff));els.savingsPercent.textContent=`${(Math.abs(diff)/brand*100).toFixed(1)}% ${t('moreThan')}`;
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
