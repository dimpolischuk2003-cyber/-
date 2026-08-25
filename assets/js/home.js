(function(){
 const {D,qs}=window.V; const grid=qs('#courseGrid'); let filter='all';
 const cityOf=c=>c.city;
 function render(){grid.innerHTML='';D.courses.filter(c=>filter==='all'||(filter==='nearest'&&c.featured)||c.city===filter).forEach(c=>{const s=D.speakers[c.speaker];const el=document.createElement('article');el.className='course-card'+(c.featured?' featured':'');el.innerHTML=`<div class="course-top"><span class="pill">${c.template==='hygiene'?'Гігієна':'Практика'}</span><span class="course-date">${c.date}</span></div><h3>${c.title}</h3><p>${s.name}</p><div class="course-meta"><span>📍 ${c.city}</span><span>• ${D.templates[c.template].eyebrow}</span></div><div class="course-actions"><a href="course.html?slug=${c.slug}">Детальніше</a><button class="apply" data-course="${c.slug}">Зареєструватися</button></div>`;grid.appendChild(el);el.querySelector('.apply').addEventListener('click',()=>openLeadForm(c.slug));});}
 document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;render()}));render();
})();
