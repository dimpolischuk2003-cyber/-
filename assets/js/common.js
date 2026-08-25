(function(){
  const D=window.VSEODENT_DATA;
  const qs=(s,c=document)=>c.querySelector(s); const qsa=(s,c=document)=>[...c.querySelectorAll(s)];
  window.V = {qs,qsa,D};

  // UTM persistence for attribution
  const params=new URLSearchParams(location.search);
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'].forEach(k=>{ if(params.get(k)) localStorage.setItem('vseodent_'+k,params.get(k)); });
  window.getAttribution=()=>Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'].map(k=>[k,localStorage.getItem('vseodent_'+k)||'']));

  window.trackEvent=(name,params={})=>{
    try{ if(window.fbq) fbq('track',name,params); }catch(e){}
    window.dataLayer=window.dataLayer||[]; window.dataLayer.push({event:name,...params});
  };

  qsa('[data-open-form]').forEach(btn=>btn.addEventListener('click',()=>window.openLeadForm(btn.dataset.course||'')));
})();
