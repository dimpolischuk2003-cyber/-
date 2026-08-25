(function(){
 const {D,qs}=window.V; const slug=new URLSearchParams(location.search).get('slug');const c=D.courses.find(x=>x.slug===slug)||D.courses[0];const s=D.speakers[c.speaker];const t=D.templates[c.template];
 document.title=`${c.title} — ${c.city} | VSEODENT`;
 qs('#courseEyebrow').textContent=t.eyebrow;qs('#courseTitle').textContent=c.title;qs('#courseSummary').textContent=t.summary;qs('#courseDate').textContent=c.date;qs('#courseCity').textContent=c.city;qs('#speakerName').textContent=s.name;qs('#speakerRole').textContent=s.role;qs('#speakerImg').src=s.image;qs('#courseSource').href=c.source||'https://vseodent.com.ua/';
 ['audience','outcomes','program'].forEach(k=>{const ul=qs('#'+k);ul.innerHTML='';t[k].forEach(x=>{const li=document.createElement('li');li.textContent=x;ul.appendChild(li)})});
 qs('#courseNote').textContent=t.note||'';document.querySelectorAll('[data-course-apply]').forEach(b=>b.addEventListener('click',()=>openLeadForm(c.slug)));trackEvent('ViewContent',{content_name:c.title,content_category:c.city});
})();
