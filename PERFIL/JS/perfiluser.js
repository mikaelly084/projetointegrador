// ==================== FUNÇÕES UTILITÁRIAS ====================
function salvarLocal(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (e) {
    console.error("Erro ao salvar no localStorage", e);
  }
}

function obterLocal(chave, padrao = null) {
  try {
    const item = localStorage.getItem(chave);
    return item ? JSON.parse(item) : padrao;
  } catch (e) {
    console.error("Erro ao obter do localStorage", e);
    return padrao;
  }
}

function removerLocal(chave) {
  try {
    localStorage.removeItem(chave);
  } catch (e) {
    console.error("Erro ao remover do localStorage", e);
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ==================== FOTO DE PERFIL ====================
const uploadInput = document.getElementById("upload-photo");
const profileImage = document.getElementById("profile-image");
const defaultIcon = document.getElementById("default-icon");
const actionBtn = document.getElementById("profile-action");
const actionIcon = actionBtn.querySelector("i");

function atualizarFotoPerfil(foto) {
  if (foto) {
    profileImage.src = foto;
    profileImage.style.display = "block";
    defaultIcon.style.display = "none";
    actionIcon.className = "fas fa-trash";
  } else {
    profileImage.src = "";
    profileImage.style.display = "none";
    defaultIcon.style.display = "flex";
    actionIcon.className = "fas fa-camera";
  }
}

uploadInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    atualizarFotoPerfil(e.target.result);
    salvarLocal("fotoPerfil", e.target.result);
  };
  reader.readAsDataURL(file);
});

actionBtn.addEventListener("click", () => {
  if (actionIcon.classList.contains("fa-camera")) {
    uploadInput.click();
  } else {
    removerLocal("fotoPerfil");
    atualizarFotoPerfil(null);
  }
});

const fotoSalva = obterLocal("fotoPerfil");
if (fotoSalva) atualizarFotoPerfil(fotoSalva);

// ==================== MODO ESCURO ====================
const btnDark = document.getElementById("toggle-darkmode");
btnDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  btnDark.setAttribute("aria-pressed", isDark);
  btnDark.textContent = isDark ? "☀️" : "🌙";
});

// ==================== COMPARTILHAMENTO ====================
const btnCompartilhar = document.getElementById("btnCompartilhar");
const menuCompartilhar = document.getElementById("menuCompartilhar");
const msgCopiado = document.getElementById("copiado-msg");

btnCompartilhar.addEventListener("click", (e) => {
  e.stopPropagation();
  navigator.clipboard.writeText(window.location.href).then(mostrarMensagem);
  menuCompartilhar.classList.toggle("show");
  atualizarLinksCompartilhamento();
});

document.addEventListener("click", (e) => {
  if (!menuCompartilhar.contains(e.target) && !btnCompartilhar.contains(e.target)) {
    menuCompartilhar.classList.remove("show");
  }
});

function mostrarMensagem() {
  msgCopiado.classList.add("mostrar");
  setTimeout(() => msgCopiado.classList.remove("mostrar"), 2500);
}

function atualizarLinksCompartilhamento() {
  const url = encodeURIComponent(window.location.href);
  document.getElementById("btnWhatsApp").href = `https://wa.me/?text=${url}`;
  document.getElementById("btnFacebook").href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
}

// ==================== FORMULÁRIO DE PERFIL ====================
const perfilForm = document.getElementById("perfilForm");

perfilForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  salvarLocal("nomeUsuario", perfilForm.nome.value);
  salvarLocal("emailUsuario", perfilForm.email.value);
  salvarLocal("telefoneUsuario", perfilForm.telefone.value);
  salvarLocal("cepUsuario", perfilForm.cep.value);
  salvarLocal("enderecoUsuario", perfilForm.endereco.value);
  salvarLocal("cpfUsuario", perfilForm.cpf.value);

  alert("Dados salvos com sucesso!");
  window.location.href = "perfiluser.html";
});

// ==================== AVALIAÇÕES E COMENTÁRIOS ====================
let avaliacoes = obterLocal("avaliacoes", []);
let notaSelecionada = 0;

const estrelas = document.querySelectorAll("#selecao-estrelas span");
const notaMediaEl = document.getElementById("nota-media");
const comentarioInput = document.getElementById("comentario");
const enviarBtn = document.getElementById("enviarComentario");
const listaComentarios = document.getElementById("lista-comentarios");

estrelas.forEach((estrela) => {
  estrela.addEventListener("click", () => {
    notaSelecionada = parseInt(estrela.dataset.value);
    estrelas.forEach((e) => {
      e.classList.toggle("ativa", parseInt(e.dataset.value) <= notaSelecionada);
    });
  });
});

enviarBtn.addEventListener("click", () => {
  const comentario = comentarioInput.value.trim();
  if (notaSelecionada === 0 || comentario === "") {
    alert("Por favor, selecione uma nota e escreva um comentário.");
    return;
  }

  const novaAvaliacao = { nota: notaSelecionada, comentario };
  avaliacoes.push(novaAvaliacao);
  salvarLocal("avaliacoes", avaliacoes);

  comentarioInput.value = "";
  notaSelecionada = 0;
  estrelas.forEach((e) => e.classList.remove("ativa"));

  atualizarNotaMedia();
  mostrarComentarios();
});

function atualizarNotaMedia() {
  if (avaliacoes.length === 0) {
    notaMediaEl.textContent = "0.0";
    return;
  }
  const soma = avaliacoes.reduce((acc, a) => acc + a.nota, 0);
  const media = (soma / avaliacoes.length).toFixed(1);
  notaMediaEl.textContent = media;
}

function mostrarComentarios() {
  listaComentarios.innerHTML = "";
  avaliacoes.forEach((avaliacao) => {
    const div = document.createElement("div");
    div.className = "comentario";
    div.innerHTML = `<strong>${avaliacao.nota} ⭐</strong><p>${escapeHtml(avaliacao.comentario)}</p>`;
    listaComentarios.appendChild(div);
  });
}

// Inicializa comentários e média ao carregar
mostrarComentarios();
atualizarNotaMedia();

