// Menu responsivo
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  siteNav.classList.toggle('active');
});

// Atualiza o ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();
