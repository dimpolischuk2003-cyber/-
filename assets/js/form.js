(function(){
 const {D,qs,qsa}=window.V;
 let step=0; let initialCourse='';
 const modal=qs('#leadModal'); if(!modal) return;
 const steps=qsa('.form-step',modal); const bar=qs('#formProgress',modal);
 const form=qs('#leadForm',modal);
 const courseSelect=qs('[name=course]',form);
 D.courses.forEach(c=>{const o=document.createElement('option');o.value=c.slug;o.textContent=`${c.date} · ${c.city} · ${c.title}`;courseSelect.appendChild(o)});
 function show(i){step=Math.max(0,Math.min(i,steps.length-1));steps.forEach((s,idx)=>s.classList.toggle('active',idx===step));bar.style.width=((step+1)/steps.length*100)+'%';modal.querySelector('.modal').scrollTop=0;}
 function validCurrent(){const curr=steps[step];const req=[...curr.querySelectorAll('[required]')].filter(el=>el.offsetParent!==null);for(const el of req){if((el.type==='checkbox'&&!el.checked)||(!el.value)){el.focus();return false}}return true}
 function branchNext(){
   const status=form.status?.value;
   if(step===3){ if(status==='student'||status==='intern') return 4; if(status==='group') return 5; return 6; }
   if(step===4) return 6;
   if(step===5) return 8;
   if(step===6){ return form.bpr?.value==='yes'?7:8; }
   if(step===7) return 8;
   if(step===8) return 9;
   return step+1;
 }
 function branchBack(){
   if(step===4) return 3;
   if(step===5) return 3;
   if(step===6) return 3;
   if(step===7) return 6;
   if(step===8){const status=form.status?.value;if(status==='group') return 5;if((status==='doctor'||status==='')&&form.bpr?.value==='yes')return 7;if(status==='student'||status==='intern')return 4;return 6;}
   return step-1;
 }
 function buildReview(){const c=D.courses.find(x=>x.slug===form.course.value);const values={
   'Email':form.email.value,'Телефон / Viber':form.phone.value,'ПІБ українською':form.fullnameUa.value,'ПІБ англійською':form.fullnameEn.value,'Дата народження':form.dob.value,'Курс':c?`${c.date} · ${c.city} · ${c.title}`:form.course.value,'Статус':form.status.value,'Бали БПР':form.bpr?.value||'—','Освіта':form.education?.value||'—','Спеціальність':form.specialty?.value||'—','Місце роботи / навчання':form.workplace?.value||'—','Посада / факультет':form.position?.value||'—','Група':form.groupList?.value||'—','Коментар':form.comment?.value||'—'};
   const dl=qs('#reviewList');dl.innerHTML='';Object.entries(values).forEach(([k,v])=>{const dt=document.createElement('dt');dt.textContent=k;const dd=document.createElement('dd');dd.textContent=v||'—';dl.append(dt,dd)});
 }
 qsa('[data-next]',form).forEach(b=>b.addEventListener('click',()=>{if(!validCurrent())return;const n=branchNext();if(n===9)buildReview();show(n)}));
 qsa('[data-back]',form).forEach(b=>b.addEventListener('click',()=>show(branchBack())));
 qsa('.close-modal',modal).forEach(b=>b.addEventListener('click',()=>modal.classList.remove('open')));
 modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
 window.openLeadForm=(slug='')=>{initialCourse=slug||'';form.reset();if(initialCourse)courseSelect.value=initialCourse;modal.classList.add('open');show(0);trackEvent('InitiateCheckout',{content_name:initialCourse||'course_catalog'});};
 form.addEventListener('submit',async e=>{
   e.preventDefault(); if(!validCurrent())return;
   const c=D.courses.find(x=>x.slug===form.course.value);
   const fd=new FormData(form);const payload=Object.fromEntries(fd.entries());payload.course_name=c?.title||'';payload.course_city=c?.city||'';payload.course_date=c?.date||'';payload.page_url=location.href;payload.created_at=new Date().toISOString();Object.assign(payload,getAttribution());
   const btn=qs('[type=submit]',form);btn.disabled=true;btn.textContent='Надсилаємо…';
   const staticPreview = location.hostname.endsWith('github.io') || location.hostname==='localhost' || location.hostname==='127.0.0.1' || location.protocol==='file:';
   if(staticPreview){
     console.info('GitHub/static preview. Lead payload:',payload);
     try{localStorage.setItem('vseodent_last_demo_lead',JSON.stringify(payload))}catch(e){}
     trackEvent('Lead',{content_name:payload.course_name,content_category:payload.course_city});
     show(10);
     btn.disabled=false;btn.textContent='Завершити реєстрацію';
     return;
   }
   try{
     const res=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
     if(!res.ok) throw new Error('submit failed');
     trackEvent('Lead',{content_name:payload.course_name,content_category:payload.course_city});show(10);
   }catch(err){
     console.warn('Lead endpoint error. Payload:',payload);
     alert('Не вдалося відправити заявку. Спробуйте ще раз або звʼяжіться з VSEODENT.');
   }finally{btn.disabled=false;btn.textContent='Завершити реєстрацію';}
 });
 show(0);
})();
