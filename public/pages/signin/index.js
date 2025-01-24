import Cookie from "../../models/Cookie.js";

const socket = io("/signin");

const form = document.getElementById("sign-in-form");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const name = form["name"].value;
  const password = form["password"].value;
  socket.emit("sign_in_submit", { name, password });
});

socket.on("sign_in_success", (token) => {
  Cookie.createCookie("access_token", token);
  alert("Login realizado com sucesso!");
  window.location.href = "/";
});

socket.on("sign_in_failed", () => {
  alert("Erro no login!");
});

socket.on("sign_in_invalid_fields", () => {
  alert(`Nome de usuário ou senha inválidos!`);
});
