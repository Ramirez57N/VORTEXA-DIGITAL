document.addEventListener('DOMContentLoaded', () => {

  /* cursor accent */
  const cursor = document.getElementById('cursorDot');
  if (cursor && matchMedia('(hover:hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .solution-card, .stat-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
    });
  }

  /* hero parallax on mouse move */
  const heroVisual = document.getElementById('heroVisual');
  if (heroVisual && matchMedia('(hover:hover)').matches) {
    const hero = document.getElementById('inicio');
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      heroVisual.style.transform = `translate(${x * 18}px, ${y * 18}px)`;
    });
    hero.addEventListener('mouseleave', () => { heroVisual.style.transform = 'translate(0,0)'; });
  }

  /* menu */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  function closeMenu(){ mainNav.classList.remove('is-open'); menuToggle.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Abrir menú'); }
  function openMenu(){ mainNav.classList.add('is-open'); menuToggle.classList.add('is-open'); menuToggle.setAttribute('aria-expanded','true'); menuToggle.setAttribute('aria-label','Cerrar menú'); }
  if (menuToggle && mainNav){
    menuToggle.addEventListener('click', () => mainNav.classList.contains('is-open') ? closeMenu() : openMenu());
    mainNav.querySelectorAll('a').forEach(l => l.addEventListener('click', closeMenu));
    document.addEventListener('click', (e) => { if(!mainNav.contains(e.target) && !menuToggle.contains(e.target)) closeMenu(); });
  }

  /* header on scroll */
  const header = document.getElementById('siteHeader');
  function onScrollHeader(){ header.classList.toggle('is-scrolled', window.scrollY > 12); }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive:true });

  /* scrollspy active nav link */
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = ['inicio','soluciones','metodo','proyectos','contacto'].map(id => document.getElementById(id)).filter(Boolean);
  function onScrollSpy(){
    let current = sections[0];
    sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 160) current = sec; });
    navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === '#' + current.id));
  }
  onScrollSpy();
  window.addEventListener('scroll', onScrollSpy, { passive:true });

  /* reveal on scroll */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          const delay = (entry.target.dataset.revealIndex || 0) * 70;
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold:.15, rootMargin:'0px 0px -40px 0px' });
    let lastParent = null, idx = 0;
    revealEls.forEach(el => {
      if (el.parentElement !== lastParent){ idx = 0; lastParent = el.parentElement; }
      el.dataset.revealIndex = idx++;
      observer.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* count-up stats */
  const statEls = document.querySelectorAll('.stat-big[data-count]');
  if ('IntersectionObserver' in window && statEls.length){
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1400;
          const start = performance.now();
          function tick(now){
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          statObserver.unobserve(el);
        }
      });
    }, { threshold:.5 });
    statEls.forEach(el => statObserver.observe(el));
  }

  /* footer year */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* contact form validation */
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccess');
  if (form){
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const errorName = document.getElementById('errorName');
    const errorEmail = document.getElementById('errorEmail');
    const errorMessage = document.getElementById('errorMessage');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(field, errorEl, msg){ field.closest('.form-row').classList.add('has-error'); errorEl.textContent = msg; }
    function clearError(field, errorEl){ field.closest('.form-row').classList.remove('has-error'); errorEl.textContent = ''; }
    function validateField(field, errorEl){
      if (field === nameField && !nameField.value.trim()){ setError(nameField, errorEl, 'Cuéntanos tu nombre para poder saludarte.'); return false; }
      if (field === emailField){
        if (!emailField.value.trim()){ setError(emailField, errorEl, 'Necesitamos un correo para responderte.'); return false; }
        if (!emailPattern.test(emailField.value.trim())){ setError(emailField, errorEl, 'Revisa el formato del correo electrónico.'); return false; }
      }
      if (field === messageField && !messageField.value.trim()){ setError(messageField, errorEl, 'Escríbenos un poco sobre tu idea.'); return false; }
      clearError(field, errorEl);
      return true;
    }
    [[nameField,errorName],[emailField,errorEmail],[messageField,errorMessage]].forEach(([f,e]) => f.addEventListener('blur', () => validateField(f,e)));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = [validateField(nameField,errorName), validateField(emailField,errorEmail), validateField(messageField,errorMessage)].every(Boolean);
      if (!ok){ successMessage.classList.remove('is-visible'); return; }
      successMessage.classList.add('is-visible');
      form.reset();
      setTimeout(() => successMessage.classList.remove('is-visible'), 6000);
    });
  }

});
