// ===================================================
// Utilidades simples para a landing page
// ===================================================
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // Ano no rodapé
  $('#year').textContent = new Date().getFullYear();

  // Toggle do menu mobile
  const btn = $('.nav-toggle');
  const nav = $('#siteNav');
  btn?.addEventListener('click', () => {
    nav.classList.toggle('hidden');
  });
  $$('#siteNav a').forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth < 860) nav.classList.add('hidden');
  }));

  // Navegação suave
  $$("a[href^='#']").forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const el = $(id);
      if (el){
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Newsletter fake
  const form = $('#newsletter');
  const email = $('#email');
  const msg = document.createElement('div');
  msg.className = 'form-msg muted';
  form?.appendChild(msg);

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = String(email.value || '').trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    if (!ok){
      msg.textContent = 'Ops! Digite um e-mail válido.';
      msg.style.color = '#fca5a5';
      email.focus();
      return;
    }
    msg.textContent = 'Tudo certo! Você entrou na lista. 👾';
    msg.style.color = '#bef264';
    form.reset();
  });
})();

// ===================================================
// Torna cada card clicável
// ===================================================
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const url = card.dataset.href;
    if (url) window.location.href = url;
  });
});

// Alterna o menu em dispositivos móveis
document.querySelector('.nav-toggle').addEventListener('click', function () {
  document.getElementById('siteNav').classList.toggle('active');
});

// Atualiza o ano automaticamente no rodapé
document.getElementById('year').textContent = new Date().getFullYear();
