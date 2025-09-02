const form = document.getElementById("loginForm");
const registerBtn = document.getElementById("registerBtn");

// Evento de login fake
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  alert(`Bem-vindo de volta, ${user}!`);
});

// Evento de registro → redireciona para a página register.html
registerBtn.addEventListener("click", () => {
  window.location.href = "register\register.html";
});