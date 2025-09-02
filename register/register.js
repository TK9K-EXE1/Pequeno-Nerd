const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }

  // Registro fake (sem backend)
  alert(`Conta criada com sucesso!\nUsuário: ${username}\nEmail: ${email}`);
  window.location.href = "login\login.html"; // Volta para login
});

