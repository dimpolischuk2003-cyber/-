/* ============================================================
   VSEODENT — блок «До / Після»
   Дві колонки в одній картці: ліворуч ДО (сіра), праворуч ПІСЛЯ (синя).
   Повзунок посередині змінює ширину колонок — можна «віддати» більше
   місця тій стороні, яку читаєш.
   На мобільному колонки складаються одна під одну: текст надто довгий,
   щоб читати його у вузькій колонці.
   ============================================================ */
(function () {
  const { qs } = window.V;
  const esc = (s) => String(s).replace(/[&<>"]/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  const MIN = 26, MAX = 74;   /* межі, за якими текст стає нечитабельним */

  window.renderBeforeAfter = function (rootSel, t) {
    const root = qs(rootSel);
    if (!root) return;
    if (!t) { const sec = root.closest('section'); if (sec) sec.remove(); return; }

    const list = (items) => items.map(i => `<li>${esc(i)}</li>`).join('');

    root.innerHTML = `
      <div class="ba__stage" id="baStage">
        <div class="ba__side ba__side--before">
          <span class="ba__tag">До курсу</span>
          <h3>${esc(t.beforeTitle)}</h3>
          <ul>${list(t.before)}</ul>
        </div>
        <div class="ba__side ba__side--after">
          <span class="ba__tag ba__tag--light">Після курсу</span>
          <h3>${esc(t.afterTitle)}</h3>
          <ul>${list(t.after)}</ul>
        </div>
        <div class="ba__handle" id="baHandle" role="slider" tabindex="0"
             aria-label="Порівняння: до курсу і після курсу"
             aria-valuemin="${MIN}" aria-valuemax="${MAX}" aria-valuenow="50">
          <span class="ba__grip">
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
              <path d="M7 2 2.5 7 7 12M13 2l4.5 5-4.5 5" stroke="currentColor"
                    stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
      ${t.note ? `<p class="ba__note">${esc(t.note)}</p>` : ''}`;

    const stage = qs('#baStage', root);
    const handle = qs('#baHandle', root);
    let pct = 50;

    const isSlider = () =>
      getComputedStyle(stage).getPropertyValue('--ba').trim() === 'slider';

    function apply() {
      if (!isSlider()) {
        stage.style.removeProperty('--split');
        handle.style.removeProperty('left');
        return;
      }
      stage.style.setProperty('--split', pct + '%');
      handle.style.left = pct + '%';
      handle.setAttribute('aria-valuenow', Math.round(pct));
    }

    function setFromX(clientX) {
      const r = stage.getBoundingClientRect();
      pct = Math.min(MAX, Math.max(MIN, ((clientX - r.left) / r.width) * 100));
      apply();
    }

    let dragging = false;
    const down = (e) => {
      if (!isSlider()) return;
      dragging = true;
      stage.classList.add('is-dragging');
      stage.classList.remove('is-hinted');
      setFromX(e.touches ? e.touches[0].clientX : e.clientX);
      e.preventDefault();
    };
    const move = (e) => {
      if (!dragging) return;
      setFromX(e.touches ? e.touches[0].clientX : e.clientX);
    };
    const up = () => { dragging = false; stage.classList.remove('is-dragging'); };

    handle.addEventListener('mousedown', down);
    handle.addEventListener('touchstart', down, { passive: false });
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);

    handle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { pct = Math.max(MIN, pct - 4); apply(); e.preventDefault(); }
      if (e.key === 'ArrowRight') { pct = Math.min(MAX, pct + 4); apply(); e.preventDefault(); }
    });

    /* на мобільному повзунка немає — підзаголовок має відповідати реальності */
    const sub = root.parentElement && root.parentElement.querySelector('.ssub');
    const subSlider = sub ? sub.textContent : '';
    const subStacked = 'Спочатку — типові складнощі, нижче — системний клінічний алгоритм.';
    function syncSub() {
      if (!sub) return;
      sub.textContent = isSlider() ? subSlider : subStacked;
    }

    window.addEventListener('resize', () => { apply(); syncSub(); });
    apply(); syncSub();

    /* повзунок один раз «дихає», коли блок потрапляє в екран */
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (en.isIntersecting && isSlider()) {
            stage.classList.add('is-hinted');
            io.disconnect();
          }
        });
      }, { threshold: 0.35 });
      io.observe(stage);
    }
  };
})();
