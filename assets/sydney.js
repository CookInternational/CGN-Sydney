/* ============================================================
   CGN Sydney v10.6.0 Alpha | 2026-06-10T20:37:30Z
   Frontend runtime for sydney.cgnnews.net
   ============================================================ */
(function(){
  "use strict";
  const FALLBACK_API = "https://script.google.com/macros/s/AKfycbx41mQg-Ine3XZ-VrMI_SaQn4_K6cDQHA0cBFyGPgupu_edNFoNRjSLv2hoSe_bOytt/exec";
  const SITE = "https://sydney.cgnnews.net";
  const MAIN_SITE = "https://www.cgnnews.net";
  const MAIN_PRIVACY = `${MAIN_SITE}/privacy-policy.html`;
  const MAIN_TERMS = `${MAIN_SITE}/terms-of-service.html`;
  const MAIN_COPYRIGHT = `${MAIN_SITE}/copyright/`;
  const MAIN_CONTACT = `${MAIN_SITE}/contact.html`;
  const MAIN_EDITORIAL = `${MAIN_SITE}/editorial-standards/`;
  const TIME_ZONE = "Australia/Sydney";
  const SYDNEY_PAYMENT_CONFIG = {
    defaultCurrency: "AUD",
    storageKey: "CGN_SYDNEY_SELECTED_CURRENCY",
    acceptedCurrencies: ["AUD", "USD", "EUR"],
    currencies: {
      AUD: { code:"AUD", label:"A$ / AUD", symbol:"A$", storageKey:"CGN_SYDNEY_PAYPAL_BUTTON_ID_AUD", legacyStorageKey:"CGN_SYDNEY_PAYPAL_BUTTON_ID", fallbackButtonId:"XZCXVPHH4HJ6U", hostedButtonId:"XZCXVPHH4HJ6U", funding:"disable-funding=venmo" },
      USD: { code:"USD", label:"$ / USD", symbol:"$", storageKey:"CGN_SYDNEY_PAYPAL_BUTTON_ID_USD", fallbackButtonId:"UN2JC9AKLU324", hostedButtonId:"UN2JC9AKLU324", funding:"enable-funding=venmo" },
      EUR: { code:"EUR", label:"€ / EUR", symbol:"€", storageKey:"CGN_SYDNEY_PAYPAL_BUTTON_ID_EUR", fallbackButtonId:"CDQRTENPA7CHW", hostedButtonId:"CDQRTENPA7CHW", funding:"disable-funding=venmo" }
    }
  };
  const SYDNEY_PAYPAL_BUTTON_ID = SYDNEY_PAYMENT_CONFIG.currencies[SYDNEY_PAYMENT_CONFIG.defaultCurrency].hostedButtonId;
  const SYDNEY_CURRENCY = SYDNEY_PAYMENT_CONFIG.defaultCurrency;
  const SYDNEY_PRICE_LABEL = SYDNEY_PAYMENT_CONFIG.currencies[SYDNEY_PAYMENT_CONFIG.defaultCurrency].label;
  const CGN_ANON_FREE_LIMIT = 3;
  const CGN_FREE_ACCOUNT_LIMIT = 6;
  const SYDNEY_WEATHER_POINT = { latitude:-33.8688, longitude:151.2093, name:"Sydney" };
  const BUREAU = "sydney";
  const DEFAULT_LANG = "en";
  const LANGS = ["en"];
  const LANG_HREFLANGS = {"en":"en-AU"};
  const DATE_LOCALES = {"en":"en-AU"};
  const I18N = {"en":{langName:"Australian English", htmlLang:"en-AU", dir:'ltr', brand:"CGN Sydney", sub:"Independent coverage for Sydney, New South Wales, Australia and the world.", live:"Sydney Bureau", breaking:'Latest', home:'Home', news:'News', world:'World', politics:'Politics', business:'Business', markets:'Markets', technology:'Technology', entertainment:'Entertainment', environment:'Environment', energy:'Energy', opinion:'Opinion', local:"Sydney", weather:'Weather', sports:'Sports', bureaus:'Bureaus', about:'About', contact:'Contact', subscribe:'Subscribe', account:'Account', login:'Login', logout:'Sign out', createAccount:'Create Account', paywallTitle:'Subscribe to Continue Reading', subscribeNow:'Subscribe / Pay With PayPal', heroKicker:'Cook Global News Network', heroTitle:"CGN Sydney", heroText:"Independent coverage for Sydney, New South Wales, Australia and the world.", readLatest:'Read Latest News', changeLang:'Change Language', latestNews:"Latest Sydney Bureau Coverage", latestSub:"News, analysis and bureau coverage for Sydney readers.", search:'Search stories', allCategories:'All categories', readMore:'Read more', noStories:"No published Sydney stories are available yet.", updated:'Updated', by:'By', whatMeans:'What this means', additional:'Additional Reporting', articleMissing:'Article not found', articleMissingText:'This article is not published yet or this link may be incorrect.', legalNote:"CGN Sydney is a publication of Cook Global News Network. Local wording is adapted for bureau readers while preserving CGN editorial standards.", copyright:'Copyright © 2026 Cook Global News Network. All Rights Reserved.'}};
  const CATS = ["World","Politics","Business","Markets","Technology","Entertainment","Environment","Energy","Opinion","Local","Weather","Sports","Investigations","Special Reports"];
  const CAT_LABELS = {"en":{"World": "World", "Politics": "Politics", "Business": "Business", "Markets": "Markets", "Technology": "Technology", "Entertainment": "Entertainment", "Environment": "Environment", "Energy": "Energy", "Opinion": "Opinion", "Local": "Sydney", "Weather": "Weather", "Sports": "Sports", "Investigations": "Investigations", "Special Reports": "Special Reports"}};;
    function socialIconsHtml(){
      return `
        <a class="cgn-social-icon-link" href="https://instagram.com/cookglobalnews" target="_blank" rel="noopener" aria-label="CGN News on Instagram">
          <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 2.8A5.2 5.2 0 006.8 12 5.2 5.2 0 0012 17.2 5.2 5.2 0 0017.2 12 5.2 5.2 0 0012 6.8zm0 2A3.2 3.2 0 0115.2 12 3.2 3.2 0 0112 15.2 3.2 3.2 0 018.8 12 3.2 3.2 0 0112 8.8zm4.5-2.3a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/>
          </svg>
          <span class="sr-only">Instagram</span>
        </a>
  
        <a class="cgn-social-icon-link" href="https://x.com/CookGlobalNews" target="_blank" rel="noopener" aria-label="CGN News on X">
          <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M18.244 2H21l-6.56 7.5L22 22h-6.828l-5.35-7.01L3.5 22H1l7.03-8.03L2 2h6.914l4.83 6.37L18.244 2zM17.15 20h1.52L7.03 4H5.4l11.75 16z"/>
          </svg>
          <span class="sr-only">X</span>
        </a>
  
        <a class="cgn-social-icon-link" href="https://youtube.com/@CookGlobalNews" target="_blank" rel="noopener" aria-label="CGN News on YouTube">
          <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.016 3.016 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.016 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z"/>
          </svg>
          <span class="sr-only">YouTube</span>
        </a>
      `;
    }

  function getApiBase(){
    const meta = document.querySelector('meta[name="cgn-api-base"]');
    const val = (window.CGN_API_BASE || (meta && meta.content) || localStorage.getItem("CGN_API_BASE") || FALLBACK_API || "").trim();
    return val.replace(/\?+$/,'').replace(/\/+$/,'');
  }
  function getLang(){ return "en"; }
  function t(key){return (I18N[getLang()]||I18N.en)[key] || I18N.en[key] || key;}
  function languagePath(lang){ return (window.CGNDynamicTranslate ? window.CGNDynamicTranslate.cleanPath(location.pathname) : location.pathname.replace(/^\/[a-z]{2}(?:-[a-z]+)?(?=\/|$)/i, "")) || "/"; }
  function canonicalLanguagePath(lang, article){ if(article) return article.canonical_url || `${SITE}${articleUrl(article)}`; const clean=(window.CGNDynamicTranslate?window.CGNDynamicTranslate.cleanPath(location.pathname):location.pathname.replace(/^\/[a-z]{2}(?:-[a-z]+)?(?=\/|$)/i,""))||"/"; return `${SITE}${clean}`; }
  function dateParts(v){
    const d = v ? new Date(v) : new Date();
    if(isNaN(d)) return ['2026','01','01'];
    return [String(d.getUTCFullYear()), String(d.getUTCMonth()+1).padStart(2,'0'), String(d.getUTCDate()).padStart(2,'0')];
  }
  function slugify(v){return String(v||'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-+|-+$/g,'') || 'article';}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
  function stripHtml(v){const d=document.createElement('div'); d.innerHTML=String(v||''); return (d.textContent||d.innerText||'').trim();}
  function prettyDate(v){
    try{return new Intl.DateTimeFormat(DATE_LOCALES[getLang()]||'en-US', {day:'numeric',month:'long',year:'numeric',timeZone:TIME_ZONE}).format(new Date(v||Date.now()));}
    catch(e){return String(v||'').slice(0,10);}
  }
  function articleUrl(a){ if(a&&a.url){try{const u=new URL(a.url,SITE);return u.origin===SITE?u.pathname:u.href;}catch(e){}} if(a&&a.canonical_url){try{const u=new URL(a.canonical_url,SITE);return u.origin===SITE?u.pathname:u.href;}catch(e){}} const p=a&&a.year?[a.year,a.month,a.day]:dateParts(a&&a.published_at); const c=String(a&&a.category||"").toLowerCase(); const family=c==="weather"?"weather":c==="sports"?"sports":"news"; return `/${family}/${p[0]}/${p[1]}/${p[2]}/${a&&(a.slug||slugify(a.title))||"article"}/`; }
  function defaultImageForCategory(category, title){ const cat=String(category||'World').toLowerCase().trim(); const ttl=String(title||''); const map={"world": "https://sydney.cgnnews.net/assets/category/CGNWorld01.png", "politics": "https://sydney.cgnnews.net/assets/category/CGNPolitics01.png", "business": "https://sydney.cgnnews.net/assets/category/CGNBusiness01.jpeg", "markets": "https://sydney.cgnnews.net/assets/category/CGNMarkets01.png", "technology": "https://sydney.cgnnews.net/assets/category/CGNTechnology01.png", "entertainment": "https://sydney.cgnnews.net/assets/category/CGNEntertainment01.png", "environment": "https://sydney.cgnnews.net/assets/category/CGNEnvironment01.png", "energy": "https://sydney.cgnnews.net/assets/category/CGNEnergy01.png", "opinion": "https://sydney.cgnnews.net/assets/category/CGNOpinion01.png", "local": "https://sydney.cgnnews.net/assets/category/CGNLocal01.png", "investigations": "https://sydney.cgnnews.net/assets/category/CGNInvestigates01.png", "special_reports": "https://sydney.cgnnews.net/assets/CGNWireBrief01.png", "special_report": "https://sydney.cgnnews.net/assets/CGNWireBrief01.png", "cgn_wire": "https://sydney.cgnnews.net/assets/CGNWireBrief01.png", "world_brief": "https://sydney.cgnnews.net/assets/CGNWorldBrief01.png", "politics_brief": "https://sydney.cgnnews.net/assets/CGNPoliticsBrief01.png", "investigates": "https://sydney.cgnnews.net/assets/CGNInvestigates01.png"}; let k=cat.replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,''); if(/^CGN Special Report:/i.test(ttl))k='special_report'; else if(/^CGN Wire:/i.test(ttl))k='cgn_wire'; else if(/^CGN World Brief:/i.test(ttl))k='world_brief'; else if(/^CGN Politics Brief:/i.test(ttl))k='politics_brief'; else if(/^CGN Investigates:/i.test(ttl))k='investigates'; return map[k]||map.world; }
  function imageUrl(a){ const raw=String(a&&(a.hero_image_url||a.image)||'').trim(); return /^https?:\/\//i.test(raw)?raw:'https://sydney.cgnnews.net/assets/CGNWireBrief01.png'; }
  function imageFallbackAttr(){ return "this.onerror=null;this.src='/assets/CGNWireBrief01.png';setTimeout(()=>{if(this.complete&&this.naturalWidth===0)this.src='/assets/CGNNewsLogo01.png';},250);"; }
  function configureHead(article){
    const lang = getLang(), i=I18N[lang]||I18N.en;
    document.documentElement.lang = article ? (article.html_lang || i.htmlLang) : i.htmlLang;
    document.documentElement.dir = i.dir || 'ltr';
    document.body.setAttribute('data-lang', lang);
    const title = article ? `${article.seo_title || article.title} | ${i.brand}` : `${i.brand} | ${i.sub}`;
    const desc = article ? (article.seo_description || article.summary || article.subtitle || i.sub) : i.sub;
    document.title = title;
    setMeta('description', desc);
    setMeta('og:title', title, 'property'); setMeta('og:description', desc, 'property'); setMeta('og:type', article?'article':'website','property'); setMeta('og:url', article?canonicalLanguagePath(lang, article):`${SITE}/${lang}/`,'property'); setMeta('og:image', article?imageUrl(article):`${SITE}/assets/CGNNewsLogo01.png`,'property');
    setMeta('twitter:card', 'summary_large_image'); setMeta('twitter:title', title); setMeta('twitter:description', desc); setMeta('twitter:image', article?imageUrl(article):`${SITE}/assets/CGNNewsLogo01.png`);
    setCanonical(article?canonicalLanguagePath(lang, article):`${SITE}/${lang}/`);
    setAlternateLangs(article);
    injectJsonLd(article);
  }
  function setMeta(name,content,attr='name'){let m=document.querySelector(`meta[${attr}="${name}"]`); if(!m){m=document.createElement('meta'); m.setAttribute(attr,name); document.head.appendChild(m);} m.setAttribute('content', String(content||''));}
  function setCanonical(href){let l=document.querySelector('link[rel="canonical"]'); if(!l){l=document.createElement('link'); l.rel='canonical'; document.head.appendChild(l);} l.href=href;}
  function setAlternateLangs(article){ document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(n=>n.remove()); }
  function injectJsonLd(article){
    document.querySelectorAll('script[data-cgn-jsonld]').forEach(n=>n.remove());
    const base = article ? {
      '@context':'https://schema.org','@type':'NewsArticle',headline:article.title,description:article.seo_description||article.summary||article.subtitle||'',image:[imageUrl(article)],datePublished:article.published_at||article.updated_at,dateModified:article.updated_at||article.published_at,author:{'@type':'Person',name:article.author||'CGN Sydney'},publisher:{'@type':'NewsMediaOrganization',name:'CGN Sydney',url:SITE,logo:{'@type':'ImageObject',url:`${SITE}/assets/CGNNewsLogo01.png`}},mainEntityOfPage:canonicalLanguagePath(getLang(), article),inLanguage:article.in_language || (LANG_HREFLANGS[getLang()]||getLang())
    } : {'@context':'https://schema.org','@type':'NewsMediaOrganization',name:'CGN Sydney',url:SITE,logo:`${SITE}/assets/CGNNewsLogo01.png`,sameAs:[MAIN_SITE]};
    const s=document.createElement('script'); s.type='application/ld+json'; s.dataset.cgnJsonld='1'; s.textContent=JSON.stringify(base); document.head.appendChild(s);
  }
  function sydneyClockText(){
    const locale = DATE_LOCALES[getLang()] || 'en-US';
    const now = new Date();
    const date = new Intl.DateTimeFormat(locale,{day:'2-digit',month:'long',year:'numeric',timeZone:TIME_ZONE}).format(now);
    const time = new Intl.DateTimeFormat(locale,{hour:'numeric',minute:'2-digit',second:'2-digit',hour12:true,timeZone:TIME_ZONE,timeZoneName:'short'}).format(now);
    return `Sydney | ${date} | ${time}`;
  }
  function startSydneyClock(){
    const el=document.getElementById('cgn-bureau-clock');
    if(!el) return;
    const tick=()=>{ el.textContent=sydneyClockText(); };
    tick();
    if(window.__cgnSydneyClockTimer) clearInterval(window.__cgnSydneyClockTimer);
    window.__cgnSydneyClockTimer=setInterval(tick,1000);
  }
  function weatherCodeText_(code){
    const map={0:['☀️','Clear'],1:['🌤️','Mainly clear'],2:['⛅','Partly cloudy'],3:['☁️','Cloudy'],45:['🌫️','Fog'],48:['🌫️','Fog'],51:['🌦️','Drizzle'],53:['🌦️','Drizzle'],55:['🌧️','Drizzle'],61:['🌧️','Light rain'],63:['🌧️','Rain'],65:['🌧️','Heavy rain'],80:['🌦️','Showers'],81:['🌧️','Showers'],82:['⛈️','Heavy showers'],95:['⛈️','Thunderstorm'],96:['⛈️','Thunderstorm'],99:['⛈️','Thunderstorm']};
    return map[Number(code)] || ['🌡️','Weather'];
  }
  async function updateSydneyBureauWeather(){
    const el=document.getElementById('cgn-bureau-weather');
    if(!el) return;
    try{
      const url=`https://api.open-meteo.com/v1/forecast?latitude=${SYDNEY_WEATHER_POINT.latitude}&longitude=${SYDNEY_WEATHER_POINT.longitude}&current=temperature_2m,apparent_temperature,weather_code,relative_humidity_2m,wind_speed_10m&timezone=Australia%2FSydney`;
      const res=await fetch(url,{cache:'no-store'});
      if(!res.ok) throw new Error('Weather API '+res.status);
      const data=await res.json();
      const c=data.current||{};
      const label=weatherCodeText_(c.weather_code);
      const temp=(typeof c.temperature_2m==='number') ? Math.round(c.temperature_2m)+'°C' : '--°C';
      const feels=(typeof c.apparent_temperature==='number') ? 'Feels '+Math.round(c.apparent_temperature)+'°C' : '';
      el.textContent=`${label[0]} Sydney Weather ${temp}${feels ? ' · '+feels : ''}`;
      el.title=`${label[1]} · humidity ${c.relative_humidity_2m||'--'}% · wind ${Math.round(c.wind_speed_10m||0)} km/h`;
    }catch(err){
      el.textContent='Sydney Weather Center';
      el.title='Open Sydney Weather Center';
    }
  }
  function startSydneyBureauWeather(){
    updateSydneyBureauWeather();
    if(window.__cgnSydneyWeatherTimer) clearInterval(window.__cgnSydneyWeatherTimer);
    window.__cgnSydneyWeatherTimer=setInterval(updateSydneyBureauWeather,10*60*1000);
  }

  function apiGet(params){
    const url = `${getApiBase()}?${new URLSearchParams(params).toString()}`;
    return fetch(url, {cache:'no-store'}).then(r=>{ if(!r.ok) throw new Error('CGN account API '+r.status); return r.json(); });
  }
  function getUser(){ return localStorage.getItem('user_id') || ''; }
  function setUser(id, email){ if(id) localStorage.setItem('user_id', id); if(email) localStorage.setItem('cgn_user_email', email); }
  function getAnonId(){
    let id = localStorage.getItem('cgn_sydney_anon_id');
    if(!id){ id = 'sydney_anon_' + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('cgn_sydney_anon_id', id); }
    return id;
  }
  function isActiveStatus(v){ const s=String(v==null?'':v).toLowerCase(); return v===true || s==='true' || s==='active' || s==='paid' || s==='subscriber'; }
  async function refreshAccountButton(){
    const btn=document.getElementById('cgn-account-btn'); if(!btn) return;
    const uid=getUser();
    if(!uid){ btn.textContent=t('login'); btn.classList.remove('subscribed'); return; }
    btn.textContent=t('account');
    try{ const data=await apiGet({action:'sydney_subscription_status', user_id:uid}); const active=isActiveStatus(data.subscriber)||isActiveStatus(data.subscription_status)||data.can_subscribe===false; localStorage.setItem('subscriber', active?'true':'false'); btn.classList.toggle('subscribed', active); }
    catch(e){ btn.classList.toggle('subscribed', localStorage.getItem('subscriber')==='true'); }
  }
  function accountModalShell(){
    let modal=document.getElementById('cgn-account-modal');
    if(!modal){
      modal=document.createElement('div'); modal.id='cgn-account-modal'; modal.className='account-modal'; modal.innerHTML=`<div class="account-modal-backdrop" data-cgn-close-account></div><section class="account-modal-card" role="dialog" aria-modal="true" aria-label="CGN Sydney account"><button class="account-modal-close" type="button" data-cgn-close-account>×</button><div id="cgn-account-modal-body"></div></section>`; document.body.appendChild(modal);
      modal.addEventListener('click', e=>{ if(e.target.hasAttribute('data-cgn-close-account')) closeAccountModal(); });
    }
    return modal;
  }
  function openAccountModal(mode){ const modal=accountModalShell(); modal.classList.add('open'); renderAccountModal(mode || (getUser()?'dashboard':'login')); }
  function closeAccountModal(){ const modal=document.getElementById('cgn-account-modal'); if(modal) modal.classList.remove('open'); }
  function renderAccountModal(mode){
    const body=document.getElementById('cgn-account-modal-body'); if(!body) return;
    const uid=getUser();
    if(mode==='signup'){
      body.innerHTML=`<h2>${esc(t('createAccount'))}</h2><p>Create a free CGN News account for ${CGN_FREE_ACCOUNT_LIMIT} free articles and subscription access across CGN News.</p><form class="account-form" onsubmit="return CGNSydney.signupSubmit(event)"><label>Email</label><input type="email" id="acct-email" autocomplete="email" required><label>Password</label><input type="password" id="acct-password" autocomplete="new-password" required minlength="6"><button class="btn gold" type="submit">${esc(t('createAccount'))}</button><button class="btn alt" type="button" onclick="CGNSydney.openAccountModal('login')">${esc(t('login'))}</button></form><div id="account-modal-message" class="account-message"></div>`; return;
    }
    if(!uid || mode==='login'){
      body.innerHTML=`<h2>${esc(t('login'))}</h2><p>Use your main CGN News account. Sydney uses the same Users, paywall and subscription system.</p><form class="account-form" onsubmit="return CGNSydney.loginSubmit(event)"><label>Email</label><input type="email" id="acct-email" autocomplete="email" required><label>Password</label><input type="password" id="acct-password" autocomplete="current-password" required><button class="btn gold" type="submit">${esc(t('login'))}</button><button class="btn alt" type="button" onclick="CGNSydney.openAccountModal('signup')">${esc(t('createAccount'))}</button></form><p class="small-note"><a href="${MAIN_SITE}/reset-password/">Forgot password?</a></p><div id="account-modal-message" class="account-message"></div>`; return;
    }
    body.innerHTML=`<h2>${esc(t('account'))}</h2><div class="account-loading">Loading account…</div>`;
    apiGet({action:'sydney_account_details', user_id:uid}).then(data=>renderAccountDashboard(data)).catch(e=>{ body.innerHTML=`<h2>${esc(t('account'))}</h2><p class="account-message error">${esc(e.message)}</p><button class="btn alt" onclick="CGNSydney.logout()">${esc(t('logout'))}</button>`; });
  }
  function renderAccountDashboard(data){
    const body=document.getElementById('cgn-account-modal-body'); if(!body) return;
    const acct=data.account||{}, sub=data.subscription||{}; const active=isActiveStatus(sub.subscriber)||isActiveStatus(sub.subscription_status)||acct.active_subscriber===true;
    localStorage.setItem('subscriber', active?'true':'false');
    body.innerHTML=`<h2>${esc(t('account'))}</h2><div class="account-mini-grid"><div><span>Email</span><strong>${esc(acct.email||localStorage.getItem('cgn_user_email')||'')}</strong></div><div><span>Status</span><strong>${active?'Subscriber':'Free Account'}</strong></div><div><span>Currency</span><strong>${SYDNEY_CURRENCY}</strong></div><div><span>Renewal</span><strong>${esc((sub.subscription_expires_at||sub.renewal_expected_at||'').slice(0,10)||'—')}</strong></div></div>${active?`<div class="account-success">Your CGN News subscription is active for CGN Sydney.</div>`:paypalCheckoutHtml('account')}<div class="account-actions"><a class="btn alt" href="/${getLang()}/account/">Account Page</a><button class="btn alt" type="button" onclick="CGNSydney.logout()">${esc(t('logout'))}</button></div><div id="account-modal-message" class="account-message"></div>`;
    refreshAccountButton();
  }
  function setAccountMessage(msg, type){ const el=document.getElementById('account-modal-message'); if(el){ el.className='account-message '+(type||''); el.textContent=msg||''; } }
  async function loginSubmit(ev){ ev.preventDefault(); const email=document.getElementById('acct-email').value.trim(); const pass=document.getElementById('acct-password').value; setAccountMessage('Signing in…'); try{ const data=await apiGet({action:'login', email, password:pass}); if(!data.success) throw new Error(data.error||'Login failed'); setUser(data.user_id, data.email||email); if(maybeResumePendingPaymentConfirm()) return false; setAccountMessage('Signed in.','success'); renderAccountModal('dashboard'); }catch(e){ setAccountMessage(e.message,'error'); } return false; }
  async function signupSubmit(ev){ ev.preventDefault(); const email=document.getElementById('acct-email').value.trim(); const pass=document.getElementById('acct-password').value; setAccountMessage('Creating account…'); try{ const data=await apiGet({action:'signup', email, password:pass}); if(!data.success) throw new Error(data.error||'Signup failed'); setUser(data.user_id, data.email||email); if(maybeResumePendingPaymentConfirm()) return false; setAccountMessage('Account created.','success'); renderAccountModal('dashboard'); }catch(e){ setAccountMessage(e.message,'error'); } return false; }
  function logout(){ localStorage.removeItem('user_id'); localStorage.removeItem('subscriber'); refreshAccountButton(); closeAccountModal(); if(location.pathname.includes('/account/')) renderStaticPage('account'); }
  function getSelectedCurrency(){
    const raw = String(localStorage.getItem(SYDNEY_PAYMENT_CONFIG.storageKey) || SYDNEY_PAYMENT_CONFIG.defaultCurrency).trim().toUpperCase();
    return SYDNEY_PAYMENT_CONFIG.acceptedCurrencies.includes(raw) ? raw : SYDNEY_PAYMENT_CONFIG.defaultCurrency;
  }
  function getCurrencyConfig(currency){
    const code = String(currency || getSelectedCurrency()).trim().toUpperCase();
    return SYDNEY_PAYMENT_CONFIG.currencies[code] || SYDNEY_PAYMENT_CONFIG.currencies[SYDNEY_PAYMENT_CONFIG.defaultCurrency];
  }
  function getPayPalButtonId(currency){
    const cfg = getCurrencyConfig(currency);
    return localStorage.getItem(cfg.storageKey) || (cfg.legacyStorageKey ? localStorage.getItem(cfg.legacyStorageKey) : "") || cfg.hostedButtonId || cfg.fallbackButtonId;
  }
  function acceptedCurrencyText(){
    return SYDNEY_PAYMENT_CONFIG.acceptedCurrencies.map(code => getCurrencyConfig(code).label).join(" / ");
  }
  function currencyOptionsHtml(selected){
    const active = String(selected || getSelectedCurrency()).toUpperCase();
    return SYDNEY_PAYMENT_CONFIG.acceptedCurrencies.map(code => {
      const cfg = getCurrencyConfig(code);
      return `<option value="${esc(code)}"${code === active ? " selected" : ""}>${esc(cfg.label)}</option>`;
    }).join("");
  }
  function setSelectedCurrency(currency){
    const cfg = getCurrencyConfig(currency);
    localStorage.setItem(SYDNEY_PAYMENT_CONFIG.storageKey, cfg.code);
    updateCheckoutCurrencyUI();
  }
  function payPalSdkUrl(currency){
    const cfg = getCurrencyConfig(currency);
    const clientId = "BAADY3HmA8ip1D8X4DGaJ9V3YBlg1INapOOrbKRCDd1nTP9KQN6WxKo9Tn5ZWectpb3LYEoeDYH6a3i1dA";
    const funding = cfg.funding || "disable-funding=venmo";
    return `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&components=hosted-buttons&${funding}&currency=${encodeURIComponent(cfg.code)}`;
  }
  function loadPayPalSdk(currency){
    const cfg = getCurrencyConfig(currency);
    const existing = document.querySelector('script[data-cgn-paypal-sdk="true"]');
    if(existing && existing.dataset.currency === cfg.code && window.paypal && window.paypal.HostedButtons) return Promise.resolve();
    if(existing) existing.remove();
    try{ delete window.paypal; }catch(e){ window.paypal = undefined; }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = payPalSdkUrl(cfg.code);
      script.async = true;
      script.dataset.cgnPaypalSdk = "true";
      script.dataset.currency = cfg.code;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('PayPal SDK failed to load'));
      document.head.appendChild(script);
    });
  }
  function rememberPayPalCheckoutIntent(context){
    const cfg = getCurrencyConfig();
    try{
      localStorage.setItem('CGN_SYDNEY_PAYPAL_CONTEXT', String(context || 'checkout'));
      localStorage.setItem('CGN_SYDNEY_PAYPAL_CURRENCY', cfg.code);
      localStorage.setItem('CGN_SYDNEY_PAYPAL_RETURN_PATH', location.pathname + location.search + location.hash);
      localStorage.setItem('last_article_url', location.href);
      if(getUser()) localStorage.setItem('CGN_SYDNEY_PAYPAL_USER_ID', getUser());
      const email = localStorage.getItem('cgn_user_email') || '';
      if(email) localStorage.setItem('CGN_SYDNEY_PAYPAL_EMAIL', email);
    }catch(e){}
  }
  function maybeResumePendingPaymentConfirm(){
    if(!getUser()) return false;
    const isPaymentPage = /\/payment-success\/?$/i.test(location.pathname || '');
    const pending = localStorage.getItem('CGN_SYDNEY_PENDING_PAYMENT_CONFIRM') === 'true';
    if(!isPaymentPage && !pending) return false;
    try{ localStorage.removeItem('CGN_SYDNEY_PENDING_PAYMENT_CONFIRM'); }catch(e){}
    closeAccountModal();
    if(typeof renderPaymentSuccess === 'function') setTimeout(renderPaymentSuccess, 0);
    return true;
  }
  async function renderPayPalHostedButton(context){
    const ctx = String(context || 'checkout');
    const box = document.querySelector(`.paypal-box[data-paypal-context="${ctx}"]`);
    if(!box) return;
    const cfg = getCurrencyConfig(box.dataset.currency || getSelectedCurrency());
    rememberPayPalCheckoutIntent(ctx);
    const buttonId = getPayPalButtonId(cfg.code);
    const container = box.querySelector('[data-paypal-hosted-container]');
    const status = box.querySelector('[data-paypal-status]');
    if(!container) return;
    container.innerHTML = '';
    if(status) status.textContent = 'Loading secure PayPal checkout…';
    try{
      await loadPayPalSdk(cfg.code);
      if(!window.paypal || !window.paypal.HostedButtons) throw new Error('PayPal Hosted Buttons unavailable');
      await window.paypal.HostedButtons({ hostedButtonId: buttonId }).render(container);
      if(status) status.textContent = `Secure PayPal checkout loaded for ${cfg.label}.`;
    }catch(err){
      if(status) status.textContent = `PayPal embedded checkout did not load. Use the PayPal checkout link below for ${cfg.label}.`;
      container.innerHTML = `<a class="btn gold" target="_blank" rel="noopener" href="https://www.paypal.com/ncp/payment/${encodeURIComponent(buttonId)}" onclick="CGNSydney.preparePayPalCheckout('${esc(ctx)}')">Open PayPal Checkout · ${esc(cfg.label)}</a>`;
    }
  }
  function mountPayPalButtons(){
    document.querySelectorAll('.paypal-box[data-paypal-context]').forEach(box => renderPayPalHostedButton(box.dataset.paypalContext));
  }
  function updateCheckoutCurrencyUI(){
    document.querySelectorAll('.paypal-box[data-paypal-context]').forEach(box => {
      const context = box.dataset.paypalContext || 'checkout';
      box.outerHTML = paypalCheckoutHtml(context);
    });
    document.querySelectorAll('[data-cgn-accepted-currencies]').forEach(el => { el.textContent = acceptedCurrencyText(); });
    setTimeout(mountPayPalButtons, 0);
  }
  function paypalCheckoutHtml(context){
    const ctx = String(context || 'checkout').replace(/[^a-z0-9_-]/gi, '-');
    const cfg = getCurrencyConfig();
    const buttonId = getPayPalButtonId(cfg.code);
    const containerId = `paypal-container-${buttonId}-${ctx}`;
    setTimeout(() => renderPayPalHostedButton(ctx), 0);
    return `<div class="paypal-box" data-paypal-context="${esc(ctx)}" data-currency="${esc(cfg.code)}"><h3>Subscribe with PayPal</h3><p>PayPal checkout is configured for Sydney with <strong data-cgn-accepted-currencies>${acceptedCurrencyText()}</strong>. Selected currency: <strong data-cgn-selected-currency>${esc(cfg.label)}</strong>. After PayPal returns, CGN Sydney attaches access to this same CGN account.</p><label class="paypal-currency-label" for="paypal-currency-${esc(ctx)}">Choose currency</label><select id="paypal-currency-${esc(ctx)}" class="paypal-currency-select" onchange="CGNSydney.setSelectedCurrency(this.value)">${currencyOptionsHtml(cfg.code)}</select><div id="${esc(containerId)}" class="paypal-hosted-container" data-paypal-hosted-container></div><p class="small-note" data-paypal-status>Loading secure PayPal checkout…</p><p class="small-note"><a target="_blank" rel="noopener" href="https://www.paypal.com/ncp/payment/${encodeURIComponent(buttonId)}" onclick="CGNSydney.preparePayPalCheckout('${esc(ctx)}')">Open PayPal checkout in a new tab · ${esc(cfg.label)}</a></p><button type="button" class="btn alt" onclick="CGNSydney.confirmSydneyPayment()">Already paid? Confirm subscription</button><p class="small-note">Use the same email and account after checkout. If PayPal opens in a new tab, return here and confirm.</p></div>`;
  }
  async function confirmSydneyPayment(){
    const uid=getUser();
    if(!uid){ openAccountModal('login'); return; }
    setAccountMessage('Confirming subscription…');
    try{
      const data=await apiGet({action:'sydney_confirm_payment', user_id:uid, currency:getSelectedCurrency(), bureau:BUREAU, context:localStorage.getItem('CGN_SYDNEY_PAYPAL_CONTEXT')||'checkout'});
      if(!data.success) throw new Error(data.error||'Unable to confirm payment');
      localStorage.setItem('subscriber','true');
      setAccountMessage('Subscription confirmed.','success');
      renderAccountModal('dashboard');
    }catch(e){ setAccountMessage(e.message,'error'); }
  }

  function cgnMeterSlug(article){ return ['sydney', getLang(), article && (article.slug||slugify(article.title))].filter(Boolean).join(':'); }
  function localAccessDecision(article){
    if(isActiveStatus(localStorage.getItem('subscriber')) || article.locked===false) return {locked:false, reason:'subscriber_or_backend'};
    if(article.locked===true || String(article.locked||'').toLowerCase()==='true') return {locked:true, limit:article.paywall_limit|| (getUser()?CGN_FREE_ACCOUNT_LIMIT:CGN_ANON_FREE_LIMIT), reason:'backend'};
    const key=getUser()?`cgn_sydney_meter_user_${getUser()}`:'cgn_sydney_meter_anon';
    const slug=cgnMeterSlug(article); let slugs=[]; try{ slugs=JSON.parse(localStorage.getItem(key)||'[]'); }catch(e){}
    slugs=[...new Set((slugs||[]).map(String))]; if(slugs.includes(slug)) return {locked:false, limit:getUser()?CGN_FREE_ACCOUNT_LIMIT:CGN_ANON_FREE_LIMIT, reason:'already_counted'};
    const limit=getUser()?CGN_FREE_ACCOUNT_LIMIT:CGN_ANON_FREE_LIMIT; if(slugs.length>=limit) return {locked:true, limit, reason:'local_meter'};
    slugs.push(slug); try{ localStorage.setItem(key, JSON.stringify(slugs)); }catch(e){} return {locked:false, limit, reason:'counted'};
  }
  function paywallHtml(article, decision){ const logged=!!getUser(); return `<section class="paywall"><h2>${esc(t('paywallTitle'))}</h2><p>${logged?'Your free CGN News account is active. Subscribe for unlimited CGN Sydney access.':'Create a free account to get 6 free articles. Subscribers get unlimited access.'}</p><p>${decision&&decision.limit?`Free article limit: ${decision.limit}.`:''}</p>${logged?paypalCheckoutHtml('article'):`<button class="btn gold" onclick="CGNSydney.openAccountModal('login')">${esc(t('login'))} / ${esc(t('createAccount'))}</button>`}</section>`; }
  function previewBody(html){ const parts=String(html||'').split('</p>'); return parts.length>3 ? parts.slice(0,3).join('</p>')+'</p>' : String(html||''); }

  function renderShell(){
    const lang = getLang(), i = I18N[lang] || I18N.en;
    const top = document.getElementById('cgn-sydney-header');

    if(top){
      top.innerHTML = `
        <a class="skip-link" href="#main">Skip to content</a>

        <div class="cgn-topline">
          <div class="cgn-topline-inner">
            <div class="cgn-topline-left">
              <strong>${esc(i.live)}</strong>
              <span aria-hidden="true">·</span>
              <span class="bureau-clock" id="cgn-bureau-clock" aria-live="polite">Sydney | Bureau Time</span>
              <a class="bureau-weather" id="cgn-bureau-weather" href="/${lang}/weather/">Sydney Weather Center</a>
              <a class="bureau-rss" href="/feed.xml" aria-label="RSS feed">RSS Feed</a>
            </div>

            <div class="cgn-lang" aria-label="${esc(i.changeLang)}">
              ${LANGS.map(l=>`<a class="${l===lang?'active':''}" href="${esc(languagePath(l))}">${esc(I18N[l].langName)}</a>`).join('')}
              <button id="cgn-account-btn" class="account-top-btn" type="button" onclick="CGNSydney.openAccountModal()">${esc(getUser()?i.account:i.login)}</button>
            </div>
          </div>
        </div>

        <header class="cgn-header">
          <div class="cgn-header-inner">
            <a class="cgn-brand" href="/${lang}/" aria-label="${esc(i.brand)} homepage">
              <img src="/assets/CGNNewsLogo01.png" alt="${esc(i.brand)} logo" width="95" height="95">
              <span>
                <span class="cgn-brand-title">${esc(i.brand)}</span>
                <span class="network-name">Cook Global News Network</span>
              </span>
            </a>

            <button class="cgn-menu-toggle" type="button" aria-expanded="false" aria-label="Open menu">Menu</button>

            <nav class="cgn-nav" aria-label="Main navigation">
              ${navLinks(lang).join('')}
            </nav>

            <div class="cgn-header-social" aria-label="CGN social media links">
              ${socialIconsHtml()}
            </div>
          </div>
        </header>

        <div class="cgn-breaking">
          <div class="cgn-breaking-inner">
            <span class="cgn-breaking-label">${esc(i.breaking)}</span>
            <span class="cgn-breaking-text" id="cgn-breaking-text">${esc(i.sub)}</span>
          </div>
        </div>`;

      const btn = top.querySelector('.cgn-menu-toggle'), nav = top.querySelector('.cgn-nav');
      if(btn && nav){
        btn.addEventListener('click',()=>{
          nav.classList.toggle('open');
          btn.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
        });
      }

      startSydneyClock();
      startSydneyBureauWeather();
      refreshAccountButton();
      setTimeout(enhanceBureauRuntime, 0);
    }

    const foot = document.getElementById('cgn-sydney-footer');

    if(foot){
      foot.innerHTML = `
        <footer class="footer">
          <div class="footer-container">

            <div class="footer-brand-block">
              <a href="/${lang}/" aria-label="${esc(i.brand)} homepage">
                <img src="/assets/CGNNewsLogo01.png" class="footer-logo" alt="${esc(i.brand)}">
              </a>
              <p>Real-Time News.<br>Global Perspective.</p>
              <p class="footer-bureau-name">${esc(i.brand)}</p>
            </div>

            <div>
              <h4><a href="/${lang}/news/">${esc(i.news)}</a></h4>
              <a href="/${lang}/category/world/">${esc(i.world)}</a><br>
              <a href="/${lang}/category/politics/">${esc(i.politics)}</a><br>
              <a href="/${lang}/category/business/">${esc(i.business)}</a><br>
              <a href="/${lang}/category/markets/">${esc(i.markets)}</a><br>
              <a href="/${lang}/category/technology/">${esc(i.technology)}</a><br>
              <a href="/${lang}/weather/">${esc(i.weather)}</a><br>
              <a href="/${lang}/sports/">${esc(i.sports)}</a><br>
              <a href="https://www.cgnnews.net/">CGN News</a>
            </div>

            <div>
              <h4><a href="/${lang}/bureaus/">${esc(i.bureaus)}</a></h4>
              <a href="/${lang}/category/entertainment/">${esc(i.entertainment)}</a><br>
              <a href="/${lang}/category/environment/">${esc(i.environment)}</a><br>
              <a href="/${lang}/category/energy/">${esc(i.energy)}</a><br>
              <a href="/${lang}/category/opinion/">${esc(i.opinion)}</a><br>
              <a href="/${lang}/category/local/">${esc(i.local)}</a><br>
              <a href="/${lang}/category/investigations/">Investigations</a><br>
              <a href="/${lang}/category/special-reports/">Special Reports</a><br>
              <a href="https://archives.cgnnews.net/">Archives</a>
            </div>

            <div class="footer-legal-links">
              <h4><a href="${MAIN_EDITORIAL}">Editorial Standards</a></h4>
              <a href="https://www.cgnnews.net/about">About Us</a><br>
              <a href="${MAIN_CONTACT}">${esc(i.contact)}</a><br>
              <a href="${MAIN_TERMS}">Terms of Service</a><br>
              <a href="${MAIN_PRIVACY}">Privacy Policy</a><br>
              <a href="mailto:sydney@cgnnews.net?subject=RE%3A%20Sydney%20Tip">Submit a Tip</a><br>
              <a href="${MAIN_SITE}/write-for-us">Write For Us</a><br>
              <a href="${MAIN_SITE}/advertise">Advertise With Us</a><br>
              <a href="${MAIN_COPYRIGHT}">Copyright</a>
            </div>

            <div class="footer-bureau">
              <h4><a href="/${lang}/bureaus/">Sydney Bureau</a></h4>
              <p class="footer-bureau-name">Cook Global News Network</p>
              <p>Quay Quarter Tower<br>50 Bridge Street<br>Suite 1490<br>Sydney, NSW 2000<br>Australia</p>
              <p><a href="mailto:sydney@cgnnews.net?subject=RE%3A%20Sydney%20Bureau">sydney@cgnnews.net</a></p>

              <div class="footer-social" aria-label="CGN social media links">
                ${socialIconsHtml()}
              </div>
            </div>

          </div>

          <div class="footer-bottom">
            <a href="${MAIN_COPYRIGHT}">Copyright © 2026 | CGN News — All Rights Reserved</a>
            <span> | Sydney Bureau</span>
          </div>
        </footer>`;
    }
  }
  function navLinks(lang){const i=I18N[lang]||I18N.en; return [
    [i.home,`/`],[i.news,`/news/`],[i.world,`/category/world/`],[i.politics,`/category/politics/`],[i.business,`/category/business/`],[i.markets,`/category/markets/`],[i.technology,`/category/technology/`],[i.local,`/category/local/`],[i.weather,`/weather/`],[i.sports,`/sports/`]
  ].map(([label,href])=>`<a href="${href}">${esc(label)}</a>`);}
  async function fetchArticles(limit=100){ const params=new URLSearchParams({action:'sydney_articles',bureau:BUREAU,limit:String(limit),format:'paged'}); const res=await fetch(`${getApiBase()}?${params.toString()}`,{cache:'no-store'}); if(!res.ok)throw new Error('CGN Sydney articles API '+res.status); const data=await res.json(); if(data&&data.success===false)throw new Error(data.error||'CGN Sydney articles API error'); if(!data||!Array.isArray(data.articles))throw new Error('CGN Sydney articles API returned malformed data'); return data.articles; }
  async function fetchArticle(slug){ const staticArticle=window.CGN_SYDNEY_STATIC_ARTICLE||null; const requestSlug=slug||(staticArticle&&staticArticle.slug)||''; const params=new URLSearchParams({action:'sydney_article',bureau:BUREAU,slug:requestSlug,user_id:getUser(),anon_id:getAnonId()}); try{const res=await fetch(`${getApiBase()}?${params.toString()}`,{cache:'no-store'});if(!res.ok)throw new Error('CGN Sydney article API '+res.status);const data=await res.json();const live=data&&data.article?data.article:data;if(!live||live.success===false||!live.title)throw new Error(live&&live.error||'CGN Sydney article API returned malformed data');return staticArticle?Object.assign({},staticArticle,live):live;}catch(err){if(staticArticle)return staticArticle;throw err;} }
  function articleTickerText(a){
    return String((a && (a.title || a.headline)) || 'CGN Sydney').trim();
  }
  function articleTickerMeta(a){
    return String((a && (a.category || a.author || 'News')) || 'News').trim();
  }
  function bureauTickerLinksHtml(articles, fallbackText, linkClass){
    const list = Array.isArray(articles) ? articles.filter(a => a && a.title).slice(0,12) : [];
    if(!list.length) return `<span class="bureau-ticker-empty">${esc(fallbackText || 'Latest Sydney bureau headlines will appear here.')}</span>`;
    const links = list.map(a => `<a class="${esc(linkClass || 'bureau-ticker-link')}" href="${esc(articleUrl(a))}"><span class="ticker-meta">${esc(articleTickerMeta(a))}</span><span class="ticker-title">${esc(articleTickerText(a))}</span></a>`).join('');
    return `<div class="bureau-ticker-track">${links}${links}</div>`;
  }
  function startBureauHeaderTicker(articles){
    const ticker = document.getElementById('cgn-breaking-text');
    if(!ticker) return;
    ticker.classList.add('cgn-breaking-marquee');
    ticker.innerHTML = bureauTickerLinksHtml(articles, t('sub') || 'Latest CGN Sydney headlines', 'cgn-breaking-link');
  }
  async function fetchLocalFeedArticles(limit){ try{ const res=await fetch('/feed.xml',{cache:'no-store'}); if(!res.ok)throw new Error('Feed '+res.status); const doc=new DOMParser().parseFromString(await res.text(),'application/xml'); return Array.from(doc.querySelectorAll('item')).slice(0,limit||50).map(item=>{const text=n=>(item.querySelector(n)&&item.querySelector(n).textContent||'').trim();const link=text('link');return {title:text('title'),summary:text('description'),subtitle:text('description'),category:'News',author:'CGN News',published_at:text('pubDate'),updated_at:text('pubDate'),url:link?link.replace(SITE,''):'/news/',language:'en',bureau:BUREAU,hero_image_url:'/assets/CGNWireBrief01.png'};}).filter(a=>a.title);}catch(e){return [];} }
  async function fetchArticlesWithFeedFallback(limit){ try{return await fetchArticles(limit||100);}catch(apiError){const feed=await fetchLocalFeedArticles(limit||100);if(feed.length)return feed;throw apiError;} }
  function renderHero(root){
    const lang = getLang();
    const hero = document.createElement('section');
    hero.className = 'bureau-live-hero';
    hero.innerHTML = `<section class="bureau-live-widget" aria-label="CGN Sydney live bureau widget">
      <div class="bureau-live-stage">
        <img id="bureau-live-bg" class="bureau-live-bg" src="/assets/SydneyBureau01.png" alt="CGN Sydney live newsroom" loading="eager" decoding="async" onerror="this.onerror=null;this.src='/assets/CGNWebBanner01.png';">
        <div class="bureau-live-overlay" aria-hidden="true"></div>
        <div class="bureau-live-topbar">
          <div class="bureau-live-bug"><span></span> CGN LIVE</div>
          <div class="bureau-live-clock"><strong>Sydney Bureau Clock</strong><span id="bureau-live-clock">Loading Sydney time…</span></div>
        </div>
        <article class="bureau-live-feature">
          <div class="bureau-live-kicker" id="bureau-live-kicker">CGN Sydney</div>
          <h1><a id="bureau-live-feature-link" class="bureau-live-feature-link" href="/${lang}/news/"><span id="bureau-live-headline">Sydney bureau coverage is loading.</span></a></h1>
          <p><a id="bureau-live-summary-link" class="bureau-live-feature-summary-link" href="/${lang}/news/"><span id="bureau-live-summary">Latest Sydney, New South Wales, Australia and the world headlines will appear here as CGN Sydney updates.</span></a></p>
          <div class="bureau-live-meta" id="bureau-live-meta">CGN News · Sydney Bureau</div>
          <div class="bureau-live-actions">
            <a class="btn gold" href="https://www.cgnnews.net/cgn-live/" target="_blank" rel="noopener">Open CGN Live</a>
            <a class="btn alt" href="https://www.cgnnews.net/weather/weekly-weather-brief/?embed=1&muted=1" target="_blank" rel="noopener">CGN Weekly Weather Brief</a>
            <a class="btn live-outline" href="#latest">Latest Sydney Headlines</a>
          </div>
        </article>
        <aside class="bureau-live-rundown" aria-label="Latest Sydney headlines">
          <div class="bureau-live-rundown-head"><span>Recent Headlines</span><span>Sydney</span></div>
          <div id="bureau-live-rundown-list" class="bureau-live-rundown-list"><p>Loading latest Sydney headlines…</p></div>
        </aside>
        <img class="bureau-live-watermark" src="/assets/CGNNewsLogo01.png" alt="" aria-hidden="true">
        <div class="bureau-live-ticker"><strong>CGN Sydney</strong><div id="bureau-live-ticker" class="bureau-live-ticker-window"><span class="bureau-ticker-empty">Latest Sydney bureau headlines will appear here.</span></div></div>
      </div>
      <div class="bureau-live-controls" aria-label="CGN Sydney live controls">
        <div class="bureau-live-audio-buttons">
          <button type="button" id="bureau-live-audio-on">Audio On</button>
          <button type="button" id="bureau-live-mute" class="active">Mute</button>
        </div>
        <div class="bureau-live-control-note">Music: “The Final Bulletin” by The Headlines.</div>
      </div>
      <audio id="bureau-live-audio" preload="none" loop playsinline>
        <source src="https://www.cgnnews.net/cgn-live/The_Final_Bulletin.mp3" type="audio/mpeg">
      </audio>
    </section>
    <section class="london-language-panel bureau-language-panel" aria-label="Language editions">
      <div class="card-kicker">Australian English</div>
      <h2>${esc(t('changeLang'))}</h2>
      <p>${LANGS.map(l=>`<a class="btn ghost" href="/${l}/">${esc(I18N[l].langName)}</a>`).join(' ')}</p>
    </section>`;
    root.appendChild(hero);
    setTimeout(initBureauLiveWidget, 0);
  }
  function initBureauLiveWidget(){
    updateBureauLiveClock();
    if(window.__cgnBureauLiveClock) clearInterval(window.__cgnBureauLiveClock);
    window.__cgnBureauLiveClock = setInterval(updateBureauLiveClock, 1000);
    const audio = document.getElementById('bureau-live-audio');
    const onBtn = document.getElementById('bureau-live-audio-on');
    const muteBtn = document.getElementById('bureau-live-mute');
    if(audio){ audio.volume = 0.18; }
    function setAudioState(on){
      if(onBtn) onBtn.classList.toggle('active', !!on);
      if(muteBtn) muteBtn.classList.toggle('active', !on);
    }
    if(onBtn && audio) onBtn.onclick = async () => { try{ audio.muted = false; await audio.play(); setAudioState(true); }catch(e){ setAudioState(false); } };
    if(muteBtn && audio) muteBtn.onclick = () => { audio.pause(); audio.muted = true; setAudioState(false); };
  }
  function updateBureauLiveClock(){
    const el = document.getElementById('bureau-live-clock'); if(!el) return;
    const now = new Date();
    try{
      const date = new Intl.DateTimeFormat(DATE_LOCALES[getLang()] || 'en-US', {timeZone:TIME_ZONE, day:'numeric', month:'long', year:'numeric'}).format(now);
      const time = new Intl.DateTimeFormat(DATE_LOCALES[getLang()] || 'en-US', {timeZone:TIME_ZONE, hour:'numeric', minute:'2-digit', second:'2-digit', timeZoneName:'short'}).format(now);
      el.textContent = `${date} | ${time}`;
    }catch(e){ el.textContent = now.toUTCString(); }
  }
  function startBureauLiveRotation(articles){
    const list = Array.isArray(articles) ? articles.filter(a=>a && a.title).slice(0,8) : [];
    if(!list.length) return;
    if(window.__cgnBureauLiveRotate) clearInterval(window.__cgnBureauLiveRotate);
    let index = 0;
    function paint(){
      const item = list[index % list.length];
      const headline = document.getElementById('bureau-live-headline');
      const summary = document.getElementById('bureau-live-summary');
      const kicker = document.getElementById('bureau-live-kicker');
      const meta = document.getElementById('bureau-live-meta');
      const bg = document.getElementById('bureau-live-bg');
      const featureLink = document.getElementById('bureau-live-feature-link');
      const summaryLink = document.getElementById('bureau-live-summary-link');
      const cards = document.querySelectorAll('.bureau-live-rundown-list a');
      const url = articleUrl(item);
      if(headline) headline.textContent = item.title || "CGN Sydney";
      if(summary) summary.textContent = item.summary || item.subtitle || 'Read the latest bureau coverage from CGN News.';
      if(kicker) kicker.textContent = `${item.category || "CGN Sydney"}${item.breaking?' · Breaking':''}`;
      if(meta) meta.textContent = `${item.author || "CGN Sydney"} · ${prettyDate(item.published_at || item.updated_at)}`;
      if(bg){ bg.onerror=function(){this.onerror=null;this.src='/assets/CGNWebBanner01.png';}; bg.src=imageUrl(item); }
      if(featureLink) featureLink.href = url;
      if(summaryLink) summaryLink.href = url;
      cards.forEach((card, i)=>card.classList.toggle('active', i === (index % list.length)));
      index++;
    }
    paint();
    window.__cgnBureauLiveRotate = setInterval(paint, 9000);
  }
  function updateBureauLiveWidget(articles){
    const list = Array.isArray(articles) ? articles.filter(a=>a && a.title).slice(0,8) : [];
    const lead = list.find(a=>String(a.breaking||'').toLowerCase()==='true') || list[0];
    const headline = document.getElementById('bureau-live-headline');
    const summary = document.getElementById('bureau-live-summary');
    const kicker = document.getElementById('bureau-live-kicker');
    const meta = document.getElementById('bureau-live-meta');
    const bg = document.getElementById('bureau-live-bg');
    const ticker = document.getElementById('bureau-live-ticker');
    const rundown = document.getElementById('bureau-live-rundown-list');
    const featureLink = document.getElementById('bureau-live-feature-link');
    const summaryLink = document.getElementById('bureau-live-summary-link');
    if(lead){
      if(headline) headline.textContent = lead.title;
      if(summary) summary.textContent = lead.summary || lead.subtitle || 'Read the latest Sydney bureau coverage from CGN News.';
      if(kicker) kicker.textContent = `${lead.category || 'CGN Sydney'}${lead.breaking?' · Breaking':''}`;
      if(meta) meta.textContent = `${lead.author || 'CGN Sydney'} · ${prettyDate(lead.published_at || lead.updated_at)}`;
      if(bg){ bg.onerror = function(){ this.onerror=null; this.src='/assets/CGNWebBanner01.png'; }; bg.src = imageUrl(lead); }
      const leadUrl = articleUrl(lead);
      if(featureLink) featureLink.href = leadUrl;
      if(summaryLink) summaryLink.href = leadUrl;
    }
    if(ticker) ticker.innerHTML = bureauTickerLinksHtml(list, 'CGN Sydney latest headlines will appear here.', 'bureau-live-ticker-link');
    if(rundown){
      rundown.innerHTML = list.length ? list.map((a,i)=>`<a class="${i===0?'active':''}" href="${esc(articleUrl(a))}"><span>${esc(a.category||'News')}</span><strong>${esc(a.title)}</strong></a>`).join('') : '<p>No headlines are available yet.</p>';
    }
    startBureauLiveRotation(list);
  }

  function renderArticleCard(a, idx){
    return `<article class="article-card ${idx===0?'lead-card':''}"><a href="${esc(articleUrl(a))}"><img src="${esc(imageUrl(a))}" alt="" loading="lazy" decoding="async" onerror="${imageFallbackAttr()}"></a><div class="article-card-body"><div class="meta"><span>${esc(CAT_LABELS[getLang()][a.category]||a.category||'News')}</span><span>·</span><span>${esc(prettyDate(a.published_at||a.updated_at))}</span></div><h3><a href="${esc(articleUrl(a))}">${esc(a.title)}</a></h3><p>${esc(a.summary || a.subtitle || '').slice(0,220)}</p><div class="meta">${esc(t('by'))}: ${esc(a.author||"CGN Sydney")}</div><a class="read" href="${esc(articleUrl(a))}">${esc(t('readMore'))} →</a></div></article>`;
  }
  function renderPaginatedArticles(listEl, articles){
    if(!listEl) return;
    const source = Array.isArray(articles) ? articles : [];
    listEl.__cgnArticles = source;
    listEl.__cgnVisibleCount = Math.min(Math.max(listEl.__cgnVisibleCount || 12, 12), Math.max(source.length, 12));
    const visible = source.slice(0, listEl.__cgnVisibleCount);
    listEl.innerHTML = visible.length ? visible.map(renderArticleCard).join('') : `<div class="empty-state">${esc(t('noStories'))}</div>`;
    let wrap = listEl.parentElement && listEl.parentElement.querySelector('.bureau-load-more-wrap');
    if(!wrap){
      wrap = document.createElement('div');
      wrap.className = 'bureau-load-more-wrap';
      wrap.innerHTML = '<button type="button" class="btn gold bureau-load-more-btn">Load More</button>';
      listEl.insertAdjacentElement('afterend', wrap);
      const btn = wrap.querySelector('button');
      if(btn) btn.addEventListener('click', () => { listEl.__cgnVisibleCount = (listEl.__cgnVisibleCount || 12) + 12; renderPaginatedArticles(listEl, listEl.__cgnArticles || []); });
    }
    wrap.style.display = source.length > visible.length ? '' : 'none';
  }
  function renderTools(root, articles, listEl){
    const lang=getLang(), i=I18N[lang]||I18N.en;
    const box=document.createElement('div');
    box.innerHTML=`<div class="tools"><input id="sydney-search" type="search" placeholder="${esc(i.search)}"><select id="sydney-category"><option value="">${esc(i.allCategories)}</option>${CATS.map(c=>`<option value="${esc(c)}">${esc(CAT_LABELS[lang][c]||c)}</option>`).join('')}</select></div>`;
    root.appendChild(box);
    const search=box.querySelector('#sydney-search'), sel=box.querySelector('#sydney-category');
    const apply=()=>{
      const q=(search.value||'').toLowerCase(), cat=sel.value;
      const filtered=articles.filter(a=>(!cat||a.category===cat)&&(!q||[a.title,a.subtitle,a.summary,a.author,a.tags,a.category].join(' ').toLowerCase().includes(q)));
      listEl.__cgnVisibleCount = 12;
      renderPaginatedArticles(listEl, filtered);
      mountCgnHouseAds();
    };
    search.addEventListener('input', apply); sel.addEventListener('change', apply);
  }
  async function renderHome(){
    const main=document.getElementById('main'); if(!main) return; configureHead(null); renderHero(main);
    const i=I18N[getLang()]||I18N.en; const sec=document.createElement('section'); sec.id='latest'; sec.innerHTML=`<div class="section-head"><div><h2>${esc(i.latestNews)}</h2><p>${esc(i.latestSub)}</p></div></div><div id="article-tools"></div><div class="grid loading" id="article-grid"><div class="empty-state">Loading Sydney articles…</div></div>`; main.appendChild(sec);
    const grid=sec.querySelector('#article-grid'), tools=sec.querySelector('#article-tools');
    try{
      const articles=await fetchArticlesWithFeedFallback(120);
      updateBureauLiveWidget(articles);
      startBureauHeaderTicker(articles);
      grid.classList.remove('loading');
      renderTools(tools, articles, grid);
      renderPaginatedArticles(grid, articles); mountCgnHouseAds();
    }catch(e){
      console.error(e);
      updateBureauLiveWidget([]);
      grid.classList.remove('loading');
      grid.innerHTML='<div class="empty-state">CGN Sydney stories are temporarily unavailable. Please try again shortly.</div>';
    }
  }

  
  // CGN emergency bureau runtime fix: robust article language/slug handling.
  function inferLangFromArticleSlug(value){
    const raw = String(value || '').toLowerCase();
    const langs = (Array.isArray(LANGS) ? LANGS : []).slice().sort((a,b)=>b.length-a.length);
    for(const l of langs){ if(raw === l || raw.indexOf(l + '-') === 0) return l; }
    return '';
  }
  function articleRequestLang(slug){ return inferLangFromArticleSlug(slug) || getLang(); }
  function normalizeArticleLookupKey(value){ return slugify(String(value || '').replace(/^index\.html$/i,'')); }
  async function resolveArticleBySlug(slug){
    const wanted = String(slug || '').trim();
    try{
      const direct = await fetchArticle(wanted);
      if(direct && direct.success !== false && direct.title) return direct;
    }catch(e){}
    const target = normalizeArticleLookupKey(wanted);
    const articles = await fetchArticlesWithFeedFallback(250);
    const match = articles.find(a => {
      const rawSlug = String(a.slug || '').trim();
      return rawSlug === wanted || normalizeArticleLookupKey(rawSlug) === target || normalizeArticleLookupKey(a.title || '') === target;
    });
    if(match) return match;
    return {success:false, error:'Article not found for slug: ' + wanted};
  }

  function currentSlug(){const parts=location.pathname.split('/').filter(Boolean); return parts[parts.length-1] || '';}
  async function renderArticlePage(){
    const main=document.getElementById('main'); if(!main) return; const slug=currentSlug();
    try{const a=await resolveArticleBySlug(slug); if(!a || a.success===false || !a.title){throw new Error(a && a.error || 'Not found');} window.CGN_CURRENT_ARTICLE=a; configureHead(a); main.innerHTML=articleHtml(a); const ticker=document.getElementById('cgn-breaking-text'); if(ticker){ ticker.classList.add('cgn-breaking-marquee'); ticker.innerHTML=`<a class="cgn-breaking-link single" href="${esc(articleUrl(a))}"><span class="ticker-meta">${esc(a.category||'News')}</span><span class="ticker-title">${esc(a.title)}</span></a>`; }}catch(e){console.error(e); configureHead(null); const service=/API|malformed|fetch|network|Failed to fetch/i.test(String(e&&e.message||e)); const heading=service?'CGN Sydney is temporarily unavailable':t('articleMissing'); const message=service?'The article service could not be reached. Please try again shortly.':t('articleMissingText'); main.innerHTML=`<article class="article-layout"><div class="article-kicker">${esc(heading)}</div><h1 class="article-title">${esc(heading)}</h1><p class="article-subtitle">${esc(message)}</p></article>`;}
  }
  function articleAdHtml(){
    return `<section class="cgn-house-ad cgn-house-ad-article" aria-label="Advertisement"><div class="cgn-house-ad-card"><div class="cgn-house-ad-label">Advertisement</div><div class="cgn-adsense-slot"><ins class="adsbygoogle cgn-google-ad" style="display:block" data-ad-client="ca-pub-5303063222439969" data-ad-slot="3184122609" data-ad-format="auto" data-full-width-responsive="true"></ins><div class="cgn-adsense-placeholder">Advertisement</div></div><div class="cgn-house-ad-disclosure">Sponsored placement</div></div></section>`;
  }
  function articleHtml(a){
    const decision = localAccessDecision(a);
    const locked = decision && decision.locked;
    const body = locked ? previewBody(a.body_html || a.summary || '') : (a.body_html || '');
    const whatMeans = locked ? '' : (a.what_this_means || '');
    return `<article class="article-layout"><div class="article-kicker">${esc(CAT_LABELS[getLang()][a.category]||a.category||'News')}</div><h1 class="article-title">${esc(a.title)}</h1>${a.subtitle?`<p class="article-subtitle">${esc(a.subtitle)}</p>`:''}<div class="meta"><span>${esc(t('by'))}: ${esc(a.author||"CGN Sydney")}</span><span>·</span><span>${esc(prettyDate(a.published_at||a.updated_at))}</span></div><div class="language-box"><strong>${esc(t('changeLang'))}:</strong>${LANGS.map(l=>`<a href="${esc(canonicalLanguagePath(l,a).replace(SITE,''))}">${esc(I18N[l].langName)}</a>`).join('')}</div><figure class="article-hero"><img src="${esc(imageUrl(a))}" alt="" decoding="async" onerror="${imageFallbackAttr()}"><figcaption class="credit">${esc(a.image_credit||'CGN News / Cook Global News Network')}</figcaption></figure><div class="article-body">${body}</div>${locked ? paywallHtml(a, decision) : ''}${whatMeans?`<section class="what-means"><h2>${esc(t('whatMeans'))}</h2>${whatMeans}</section>`:''}</article>${articleAdHtml()}`;
  }
  
  // CGN emergency bureau network fix: London-style bureau chief cards shared by every bureau repo.
  const CGN_BUREAU_NETWORK = [
  {
    "city": "Indianapolis",
    "title": "CGN News Global Headquarters",
    "description": "From downtown Indianapolis, CGN News anchors newsroom operations with coverage rooted in civic life, business, politics, weather, sports and the Midwest’s national influence.",
    "location": "Market Square Center, 151 N. Delaware Street, Suite 122, Indianapolis, IN 46204, United States of America",
    "chief": "Michael A. Cook",
    "chiefTitle": "Editor-in-Chief",
    "url": "https://www.cgnnews.net/",
    "image": "https://www.cgnnews.net/bureaus/Indianapolis02.png",
    "fallback": "https://www.cgnnews.net/bureaus/Indianapolis.png"
  },
  {
    "city": "Chicago",
    "title": "Chicago Bureau",
    "description": "The Chicago Bureau connects CGN News to regional politics, transportation, public safety, courts, labor, business development and Midwest civic life.",
    "location": "Chicago, Illinois, United States of America",
    "chief": "Natalie Ward",
    "chiefTitle": "Chicago Bureau Chief",
    "url": "https://www.cgnnews.net/reporters/natalie-ward/",
    "image": "https://www.cgnnews.net/bureaus/Chicago02.png",
    "fallback": "https://www.cgnnews.net/bureaus/Chicago01.png"
  },
  {
    "city": "London",
    "title": "London Bureau",
    "description": "The London Bureau directs CGN News coverage of Europe, diplomacy, markets, energy, NATO, U.K. politics and transatlantic affairs.",
    "location": "London, United Kingdom",
    "chief": "Helena Price",
    "chiefTitle": "London Bureau Chief",
    "url": "https://london.cgnnews.net/",
    "image": "https://www.cgnnews.net/bureaus/London02.png",
    "fallback": "https://www.cgnnews.net/bureaus/London01.png"
  },
  {
    "city": "Sydney",
    "title": "Sydney Bureau",
    "description": "The Sydney Bureau expands CGN News coverage across Australia and the Indo-Pacific, with emphasis on climate, technology, regional security and trade.",
    "location": "Quay Quarter Tower, 50 Bridge Street, Suite 1490, Sydney, NSW 2000, Australia",
    "chief": "Claire Bennett",
    "chiefTitle": "Sydney Bureau Chief",
    "url": "https://sydney.cgnnews.net/",
    "image": "https://www.cgnnews.net/bureaus/Sydney02.png",
    "fallback": "https://www.cgnnews.net/bureaus/Sydney01.png"
  },
  {
    "city": "Hong Kong",
    "title": "Hong Kong Bureau",
    "description": "The Hong Kong Bureau strengthens CGN News coverage of Asian markets, finance, technology, trade, shipping and global business.",
    "location": "International Commerce Center, 1 Austin Road West, Suite 1612, Hong Kong",
    "chief": "Vivian Lau",
    "chiefTitle": "Hong Kong Bureau Chief",
    "url": "https://hongkong.cgnnews.net/",
    "image": "https://www.cgnnews.net/bureaus/Hong-Kong02.png",
    "fallback": "https://www.cgnnews.net/bureaus/Hong-Kong01.png"
  },
  {
    "city": "Rio de Janeiro",
    "title": "Rio de Janeiro Bureau",
    "description": "The Rio de Janeiro Bureau connects CGN News to South America with coverage of energy, environment, business, culture, regional politics and major global events.",
    "location": "Torre Rio Sul, Rua Lauro Müller, 116, Suite 519, Rio de Janeiro - RJ, 22290-160, Brazil",
    "chief": "Marina Costa",
    "chiefTitle": "Rio de Janeiro Bureau Chief",
    "url": "https://rio.cgnnews.net/",
    "image": "https://www.cgnnews.net/bureaus/Rio02.png",
    "fallback": "https://www.cgnnews.net/bureaus/Rio01.png"
  },
  {
    "city": "Manila",
    "title": "Manila Bureau",
    "description": "The Manila Bureau extends CGN News coverage across the Philippines and Southeast Asia, with emphasis on maritime security, democratic institutions, diplomacy, climate risk and Indo-Pacific business corridors.",
    "location": "Metrobank Center, 35th Street, Suite 909, Manila, Philippines",
    "chief": "Isabel Reyes",
    "chiefTitle": "Manila Bureau Chief",
    "url": "https://manila.cgnnews.net/",
    "image": "https://www.cgnnews.net/bureaus/ManilaBureau02.png",
    "fallback": "https://www.cgnnews.net/bureaus/ManilaBureau01.png"
  },
  {
    "city": "Mumbai",
    "title": "Mumbai Bureau",
    "description": "The Mumbai Bureau strengthens CGN News coverage of India and South Asia, following energy security, inflation, technology services, ports, monsoon risk and financial markets.",
    "location": "International Business Park, Western Express Highway & Mohan Gokhale Road, Suite 622, Mumbai, Maharashtra 400063, India",
    "chief": "Arjun Mehta",
    "chiefTitle": "Mumbai Bureau Chief",
    "url": "https://mumbai.cgnnews.net/",
    "image": "https://www.cgnnews.net/bureaus/MumbaiBureau02.png",
    "fallback": "https://www.cgnnews.net/bureaus/MumbaiBureau01.png"
  }
];
  function renderBureauNetwork(){
    const targets = [document.getElementById('bureau-network'), document.getElementById('cgn-bureau-network')].filter(Boolean);
    if(!targets.length) return;
    const html = `<div class="bureau-network-head"><div><div class="card-kicker">Cook Global News Network</div><h2>CGN Bureau Network</h2><p>CGN News connects local reporting strength with global perspective across major civic, financial, cultural and regional news centers.</p></div><a class="btn alt" href="https://www.cgnnews.net/bureaus/" target="_blank" rel="noopener">Open Full Bureaus Page</a></div><div class="bureau-mini-grid">${CGN_BUREAU_NETWORK.map(b=>`<article class="bureau-mini-card"><a href="${esc(b.url)}" target="_blank" rel="noopener" class="bureau-mini-image"><img src="${esc(b.image)}" alt="${esc(b.city)} bureau" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${esc(b.fallback)}';"></a><div class="bureau-mini-body"><div class="bureau-mini-city">${esc(b.city)}</div><h3>${esc(b.title)}</h3><p>${esc(b.description)}</p><p class="bureau-mini-location">${esc(b.location)}</p><p class="bureau-mini-chief"><strong>Bureau Chief:</strong> ${esc(b.chief)}<br><span>${esc(b.chiefTitle)}</span></p><a class="btn gold" href="${esc(b.url)}" target="_blank" rel="noopener">Visit Bureau</a></div></article>`).join('')}</div>`;
    targets.forEach(el => { el.innerHTML = html; });
  }
  function reporterCardHtml(r){
    const src = r.image || ('/assets/reporters/' + slugify(r.name) + '.png');
    return `<article class="reporter-card"><div class="reporter-photo-wrap"><img src="${esc(src)}" alt="${esc(r.name)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='/assets/CGNNewsLogo01.png';"></div><div class="reporter-card-body"><h3>${esc(r.name)}</h3><p class="reporter-title"><strong>${esc(r.title||'')}</strong></p><p class="reporter-beats"><strong>Beats:</strong> ${esc(r.beats||'Bureau coverage')}</p><p class="reporter-bio">${esc(r.bio || r.beats || '')}</p><p class="reporter-email"><a href="mailto:${esc(r.email || 'tips@cgnnews.net')}">${esc(r.email || 'tips@cgnnews.net')}</a></p></div></article>`;
  }
  function renderStaticPage(kind){
    const main=document.getElementById('main'); if(!main) return; configureHead(null); const lang=getLang(), i=I18N[lang]||I18N.en;
    if(kind==='privacy'){ location.replace(MAIN_PRIVACY); return; }
    if(kind==='terms'){ location.replace(MAIN_TERMS); return; }
    if(kind==='copyright'){ location.replace(MAIN_COPYRIGHT); return; }
    if(kind==='contact'){ location.replace(MAIN_CONTACT); return; }
    if(kind==='editorial'){ location.replace(MAIN_EDITORIAL); return; }
    if(kind==='account'){
      main.innerHTML=`<section class="page-card account-page"><h1>${esc(i.account)}</h1><p>CGN Sydney uses the same CGN News account, paywall and subscription system.</p><div id="account-page-body"></div></section>`;
      const target=document.getElementById('account-page-body');
      if(!getUser()) target.innerHTML=`<div class="account-split"><section><h2>${esc(i.login)}</h2><form class="account-form" onsubmit="return CGNSydney.loginSubmit(event)"><label>Email</label><input type="email" id="acct-email" required><label>Password</label><input type="password" id="acct-password" required><button class="btn gold" type="submit">${esc(i.login)}</button></form></section><section><h2>${esc(i.createAccount)}</h2><p>Create a free account for ${CGN_FREE_ACCOUNT_LIMIT} free articles and subscription access.</p><button class="btn alt" onclick="CGNSydney.openAccountModal('signup')">${esc(i.createAccount)}</button></section></div><div id="account-modal-message" class="account-message"></div>`;
      else apiGet({action:'sydney_account_details', user_id:getUser()}).then(data=>{ const sub=data.subscription||{}, acct=data.account||{}, active=isActiveStatus(sub.subscriber)||isActiveStatus(sub.subscription_status)||acct.active_subscriber===true; target.innerHTML=`<div class="account-mini-grid"><div><span>Email</span><strong>${esc(acct.email||'')}</strong></div><div><span>Status</span><strong>${active?'Subscriber':'Free Account'}</strong></div><div><span>Currency</span><strong>${SYDNEY_CURRENCY}</strong></div><div><span>Renewal</span><strong>${esc((sub.subscription_expires_at||sub.renewal_expected_at||'').slice(0,10)||'—')}</strong></div></div>${active?'<div class="account-success">Subscription active.</div>':paypalCheckoutHtml('page')}<div class="account-actions"><button class="btn alt" onclick="CGNSydney.logout()">${esc(i.logout)}</button></div><div id="account-modal-message" class="account-message"></div>`; }).catch(e=>{ target.innerHTML=`<p class="account-message error">${esc(e.message)}</p>`; });
      return;
    }
    const pages={
      about:{title:i.about, body:`<p>CGN Sydney publishes bureau coverage for Australia, the Indo-Pacific, climate, regional security, mining, technology and trade through the CGN News editorial network.</p><p>${esc(i.legalNote)}</p>`},
      bureaus:{title:i.bureaus, body:`<p>CGN Sydney is part of the CGN News bureau/subdomain publishing structure. Sydney bureau coverage appears across the active language editions of the site.</p><div id="bureau-network" class="bureau-network-section"></div><h2>Local Bureau Team</h2><div id="sydney-reporters" class="reporter-grid"></div>`},
      news:{title:i.news, body:`<div id="news-list" class="grid"><div class="empty-state">Loading…</div></div>`}
    };
    const p=pages[kind]||pages.about; main.innerHTML=`<section class="page-card"><h1>${esc(p.title)}</h1>${p.body}</section>`;
    if(kind==='news'){fetchArticles(150).then(arts=>{const el=document.getElementById('news-list'); if(el)el.innerHTML=arts.length?arts.map(renderArticleCard).join(''):`<div class="empty-state">${esc(i.noStories)}</div>`;}).catch(e=>{const el=document.getElementById('news-list'); if(el)el.innerHTML=`<div class="empty-state">${esc(e.message)}</div>`;});}
    if(kind==='bureaus'){renderBureauNetwork(); renderReporterCards();}
  }
  function reporterImageCandidates(r){
    const slug = String(r.slug || slugify(r.name || '')).toLowerCase();
    const name = String(r.name || '').trim();
    const dotted = name.toLowerCase().replace(/[^a-z0-9]+/g,'.').replace(/^\.+|\.+$/g,'');
    const titled = name.replace(/[^A-Za-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
    const base = ['/assets/reporters/' + slug, '/assets/reporters/' + dotted, '/assets/reporters/' + titled, '/assets/reporters/' + titled + '01'];
    const exts = ['png','jpg','jpeg','webp'];
    return base.flatMap(b => exts.map(ext => b + '.' + ext)).concat(['/assets/CGNNewsLogo01.png']);
  }
  function reporterImageMarkup(r){
    const candidates = reporterImageCandidates(r);
    return `<img class="reporter-card-image" src="${esc(candidates[0])}" alt="${esc(r.name)}" loading="lazy" decoding="async" data-reporter-candidates="${esc(JSON.stringify(candidates))}" data-reporter-index="0" onerror="(function(img){try{var arr=JSON.parse(img.dataset.reporterCandidates||'[]');var idx=(Number(img.dataset.reporterIndex||0)+1);if(idx<arr.length){img.dataset.reporterIndex=String(idx);img.src=arr[idx];}}catch(e){img.onerror=null;img.src='/assets/CGNNewsLogo01.png';}})(this)">`;
  }
  function renderReporterCards(){
    const el=document.getElementById('sydney-reporters'); if(!el) return;
    const reps = [
      {
            "name": "Claire Bennett",
            "slug": "claire-bennett",
            "title": "Sydney Bureau Chief",
            "email": "sydney@cgnnews.net",
            "bio": "Claire Bennett is the Sydney Bureau Chief for CGN News, overseeing coverage of Australia, the Indo-Pacific, climate, regional security, mining, technology and trade. Her reporting focuses on how policy, resources, weather risk, defense partnerships and supply chains shape communities and markets across the region. Bennett brings a warm but authoritative correspondent style to stories that connect Australia’s domestic choices with wider Pacific and global consequences.",
            "chief": true,
            "profile": "https://www.cgnnews.net/reporters/claire-bennett/"
      },
      {
            "name": "Amelia Reed",
            "slug": "amelia-reed",
            "title": "Local/Civic Reporter",
            "email": "sydney@cgnnews.net",
            "bio": "Amelia Reed was born in Newcastle, New South Wales, and studied journalism and urban policy at the University of Technology Sydney. She covers city government, transport, public services and civic life for CGN Sydney, with a particular interest in how council decisions, train delays, housing pressure and neighbourhood planning show up in people’s daily routines. Reed speaks English and Italian, keeps a rescue kelpie named Banksia, and says her best story ideas usually start with a bus stop conversation or a complaint from someone’s nan.",
            "chief": false,
            "profile": "https://www.cgnnews.net/reporters/amelia-reed/"
      },
      {
            "name": "Noah Campbell",
            "slug": "noah-campbell",
            "title": "Politics Reporter",
            "email": "sydney@cgnnews.net",
            "bio": "Noah Campbell was born in Canberra and educated at the Australian National University, where he studied politics and international relations before moving into political reporting. He covers government, elections, policy and public institutions for CGN Sydney, following the decisions made in parliament, party rooms and agencies that affect voters across Australia and the wider region. Campbell speaks English and German, is a committed cricket tragic, and keeps a battered notebook from his first press gallery assignment on his desk.",
            "chief": false,
            "profile": "https://www.cgnnews.net/reporters/noah-campbell/"
      },
      {
            "name": "Matilda Brooks",
            "slug": "matilda-brooks",
            "title": "Business & Markets Reporter",
            "email": "sydney@cgnnews.net",
            "bio": "Matilda Brooks was born in Sydney’s Inner West and studied economics and media at the University of Sydney. She covers business, markets, trade and the consumer economy for CGN Sydney, connecting boardroom decisions, mining cycles, retail pressure, trade flows and household costs to the choices facing families and companies. Brooks speaks English and Mandarin, has a tabby cat named Ledger, and likes explaining market stories in plain language before the second coffee of the morning.",
            "chief": false,
            "profile": "https://www.cgnnews.net/reporters/matilda-brooks/"
      },
      {
            "name": "Liam Hart",
            "slug": "liam-hart",
            "title": "Technology Reporter",
            "email": "sydney@cgnnews.net",
            "bio": "Liam Hart was born in Brisbane and studied computer science and journalism at the University of Queensland before relocating to Sydney’s technology corridor. He covers technology, digital policy, cybersecurity and innovation for CGN Sydney, following the companies, regulators, start-ups and public agencies shaping Australia’s digital future. Hart speaks English and Japanese, builds mechanical keyboards on weekends, and has a habit of testing every new productivity app before deciding paper still works better.",
            "chief": false,
            "profile": "https://www.cgnnews.net/reporters/liam-hart/"
      },
      {
            "name": "Sienna Walsh",
            "slug": "sienna-walsh",
            "title": "Entertainment & Culture Reporter",
            "email": "sydney@cgnnews.net",
            "bio": "Sienna Walsh was born in Melbourne and studied media, theatre and cultural studies at the University of Melbourne. She covers entertainment, arts, culture and media for CGN Sydney, reporting on film, television, music, festivals, publishing, public arts funding and the creative businesses that shape Australia’s cultural life. Walsh speaks English and French, owns a greyhound named Bowie, and can usually be found comparing opening-night reactions with what the audience actually says on the train home.",
            "chief": false,
            "profile": "https://www.cgnnews.net/reporters/sienna-walsh/"
      },
      {
            "name": "Grace Taylor",
            "slug": "grace-taylor",
            "title": "Meteorologist",
            "email": "sydney@cgnnews.net",
            "bio": "Grace Taylor was born in Wollongong, New South Wales, and studied environmental science and communications at the University of New South Wales. She covers weather, preparedness, climate impact and public safety for CGN Sydney, focusing on practical forecasts, coastal conditions, heat risk, storm systems, travel disruptions and the ways changing weather affects schools, commuters, events and emergency planning. Taylor speaks English and Spanish, keeps a cockatiel named Sunny, and believes a good forecast should help people decide whether to carry an umbrella, cancel a picnic or check on a neighbour.",
            "chief": false,
            "profile": "https://www.cgnnews.net/reporters/grace-taylor/"
      },
      {
            "name": "Cooper Flynn",
            "slug": "cooper-flynn",
            "title": "Sports Desk Reporter",
            "email": "sydney@cgnnews.net",
            "bio": "Cooper Flynn was born in Perth and studied sports media and communications at Curtin University before moving east for newsroom work. He covers sports, fixtures, teams, athlete culture and fan experience for CGN Sydney, following major codes, local clubs, international matchups, venues and the business of sport across Australia and the Indo-Pacific. Flynn speaks English and Portuguese, supports too many teams for his own peace of mind, and has a border collie named Matilda who reacts to match whistles on television.",
            "chief": false,
            "profile": "https://www.cgnnews.net/reporters/cooper-flynn/"
      },
      {
            "name": "Isla Morgan",
            "slug": "isla-morgan",
            "title": "Investigations & Special Reports Reporter",
            "email": "sydney@cgnnews.net",
            "bio": "Isla Morgan was born in Auckland, New Zealand, and studied law and journalism at the University of Auckland before building her reporting career in Australia. She covers public records, accountability and special reports for CGN Sydney, focusing on institutions, public spending, regulatory failures, vulnerable communities and complex stories that require documents, patience and careful sourcing. Morgan speaks English and Arabic, keeps a quiet office plant named Trevor, and says the best investigative reporting often begins with one line in a document that everyone else skipped.",
            "chief": false,
            "profile": "https://www.cgnnews.net/reporters/isla-morgan/"
      }
];
    el.innerHTML = reps.map(r=>{
      const profile = r.chief && r.profile ? String(r.profile) : '';
      const photoHtml = profile ? `<a class="reporter-card-photo-link" href="${esc(profile)}" target="_blank" rel="noopener">${reporterImageMarkup(r)}</a>` : `<div class="reporter-card-photo-link">${reporterImageMarkup(r)}</div>`;
      const nameHtml = profile ? `<a href="${esc(profile)}" target="_blank" rel="noopener">${esc(r.name)}</a>` : esc(r.name);
      return `<article class="reporter-card ${r.chief?'bureau-chief-card':''}">${photoHtml}<div class="reporter-card-body"><h3>${nameHtml}</h3><p><strong>${esc(r.title||'')}</strong></p><p>${esc(r.bio || '')}</p><p><a href="mailto:${esc(r.email || "sydney@cgnnews.net")}">${esc(r.email || "sydney@cgnnews.net")}</a></p></div></article>`;
    }).join('');
  }
  async function renderPaymentSuccess(){
    const main=document.getElementById('main'); if(!main) return; configureHead(null); main.innerHTML=`<section class="page-card"><h1>Confirming Subscription</h1><p id="payment-message">Checking your CGN Sydney account…</p><p><a class="btn alt" href="/${getLang()}/account/">View Account</a> <a class="btn gold" href="/${getLang()}/">Return Home</a></p></section>`;
    const msg=document.getElementById('payment-message'); const uid=getUser();
    if(!uid){ try{ localStorage.setItem('CGN_SYDNEY_PENDING_PAYMENT_CONFIRM','true'); }catch(e){} msg.textContent='Please sign in to attach this PayPal payment to your CGN News account.'; openAccountModal('login'); return; }
    try{ const data=await apiGet({action:'sydney_confirm_payment', user_id:uid, currency:getSelectedCurrency(), bureau:BUREAU, context:localStorage.getItem('CGN_SYDNEY_PAYPAL_CONTEXT')||'checkout'}); if(!data.success) throw new Error(data.error||'Unable to confirm subscription.'); localStorage.setItem('subscriber','true'); msg.textContent='Subscription confirmed. Your CGN News account now has unlimited CGN Sydney access.'; }
    catch(e){ msg.textContent=e.message; }
  }

  const CGN_HOUSE_ADS = [];
  function ensureAdSenseScript(){
    if(document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;
    const s=document.createElement('script'); s.async=true; s.crossOrigin='anonymous'; s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5303063222439969'; document.head.appendChild(s);
  }
  function rotateHouseAds(){ /* AdSense-only placeholder. No house/sponsor links. */ }
  function mountCgnHouseAds(){
    ensureAdSenseScript();
    const main=document.getElementById('main'); if(!main) return;
    const latest=document.getElementById('latest');
    if(latest && !document.querySelector('.cgn-house-ad-home')) latest.insertAdjacentHTML('afterend', articleAdHtml().replace('cgn-house-ad-article','cgn-house-ad-home'));
    rotateHouseAds();
    try{ (window.adsbygoogle = window.adsbygoogle || []).push({}); }catch(e){}
  }
  function initGlobalImageFallbacks(){
    if(window.__cgnGlobalImageFallbacks) return; window.__cgnGlobalImageFallbacks=true;
    document.addEventListener('error', function(ev){
      const img=ev.target; if(!img || img.tagName !== 'IMG' || img.dataset.cgnFallbackDone === 'true') return;
      img.dataset.cgnFallbackDone='true';
      if(/reporter-card-image/.test(img.className||'')) return;
      img.src = '/assets/CGNWireBrief01.png';
      setTimeout(()=>{ if(img.complete && img.naturalWidth === 0) img.src='/assets/CGNNewsLogo01.png'; },250);
    }, true);
  }
  function enhanceBureauRuntime(){
    initGlobalImageFallbacks(); mountCgnHouseAds();
    if(!window.__cgnHouseAdTimer) window.__cgnHouseAdTimer=setInterval(rotateHouseAds,12000);
    const main=document.getElementById('main');
    if(main && !main.__cgnObserver){ main.__cgnObserver=new MutationObserver(()=>mountCgnHouseAds()); main.__cgnObserver.observe(main,{childList:true,subtree:true}); }
  }
  window.CGNSydney = {renderShell, renderHome, renderArticlePage, renderStaticPage, renderPaymentSuccess, fetchArticles, fetchArticle, getLang, I18N, openAccountModal, closeAccountModal, loginSubmit, signupSubmit, logout, confirmSydneyPayment, setSelectedCurrency, updateCheckoutCurrencyUI, renderPayPalHostedButton, mountPayPalButtons, preparePayPalCheckout:rememberPayPalCheckoutIntent};
  document.addEventListener('DOMContentLoaded', function(){ renderShell(); setTimeout(enhanceBureauRuntime, 0); });
})();
