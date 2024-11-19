// script.js
document.addEventListener("DOMContentLoaded", () => {
  const showRegister = document.getElementById("show-register");
  const showLogin = document.getElementById("show-login");
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");

  showRegister.addEventListener("click", () => {
    registerForm.style.display = "block";
    loginForm.style.display = "none";
    showRegister.classList.add("active");
    showLogin.classList.remove("active");
  });

  showLogin.addEventListener("click", () => {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    showLogin.classList.add("active");
    showRegister.classList.remove("active");
  });
});