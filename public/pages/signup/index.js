const socket = io("/signup");

const form = document.getElementById("sign-up-form");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const name = form["name"].value;
  const password = form["password"].value;

  socket.emit("sign_up_submit", { name, password });
});

socket.on("sign_up_success", () => {
  alert("Cadastro realizado com sucesso!");
  window.location.href = "/login";
});

socket.on("sign_up_failed", () => {
  alert("Erro no cadastro!");
});

socket.on("username_already_exists", (name) => {
  alert(`O nome ${name} já foi cadastrado! Tente outro.`);
});
