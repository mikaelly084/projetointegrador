const body = document.body;
const toggleDark = document.getElementById("toggleDark");

// Aplica o tema salvo no localStorage
if (localStorage.getItem("tema") === "dark") {
  body.classList.add("dark-mode");
  if (toggleDark) toggleDark.textContent = "☀️ Modo Claro";
}

// Adiciona evento ao botão, se existir
if (toggleDark) {
  toggleDark.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("tema", "dark");
      toggleDark.textContent = "☀️ Modo Claro";
    } else {
      localStorage.setItem("tema", "light");
      toggleDark.textContent = "🌙 Modo Escuro";
    }
  });
}