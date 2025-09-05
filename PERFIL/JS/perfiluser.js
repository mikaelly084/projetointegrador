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

// ==================== FOTO DE PERFIL (somente exibição) ====================
const profileImage = document.getElementById("profile-image");
const defaultIcon = document.getElementById("default-icon");

function atualizarFotoPerfil(foto) {
  if (foto) {
    profileImage.src = foto;
    profileImage.style.display = "block";
    defaultIcon.style.display = "none";
  } else {
    profileImage.src = "";
    profileImage.style.display = "none";
    defaultIcon.style.display = "flex";
  }
}

// 🔹 Recupera a mesma foto salva na página Minha Conta
const fotoSalva = localStorage.getItem("fotoPerfil");
if (fotoSalva) atualizarFotoPerfil(fotoSalva);

// ==================== MODO ESCURO ====================
const btnDark = document.getElementById("toggle-darkmode");
btnDark?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  btnDark.setAttribute("aria-pressed", isDark);
  btnDark.textContent = isDark ? "☀️" : "🌙";
});

// ==================== COMPARTILHAMENTO ====================
const btnCompartilhar = document.getElementById("btnCompartilhar");
const menuCompartilhar = document.getElementById("menuCompartilhar");
const msgCopiado = document.getElementById("copiado-msg");

btnCompartilhar?.addEventListener("click", (e) => {
  e.stopPropagation();
  navigator.clipboard.writeText(window.location.href).then(mostrarMensagem);
  menuCompartilhar?.classList.toggle("show");
  atualizarLinksCompartilhamento();
});

document.addEventListener("click", (e) => {
  if (
    menuCompartilhar &&
    !menuCompartilhar.contains(e.target) &&
    !btnCompartilhar?.contains(e.target)
  ) {
    menuCompartilhar.classList.remove("show");
  }
});

function mostrarMensagem() {
  if (!msgCopiado) return;
  msgCopiado.classList.add("mostrar");
  setTimeout(() => msgCopiado.classList.remove("mostrar"), 2500);
}

function atualizarLinksCompartilhamento() {
  const url = encodeURIComponent(window.location.href);
  const whats = document.getElementById("btnWhatsApp");
  const face = document.getElementById("btnFacebook");
  if (whats) whats.href = `https://wa.me/?text=${url}`;
  if (face) face.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
}

// ==================== AVALIAÇÕES E COMENTÁRIOS ====================
let avaliacoes = obterLocal("avaliacoes", []);
let notaSelecionada = 0;

const estrelas = document.querySelectorAll("#selecao-estrelas span");
const notaMediaEl = document.getElementById("nota-media");
const comentarioInput = document.getElementById("comentario");
const enviarBtn = document.getElementById("enviarComentario");
const listaComentarios = document.getElementById("lista-comentarios");

// Seleção de estrelas
estrelas.forEach((estrela) => {
  estrela.addEventListener("click", () => {
    notaSelecionada = parseInt(estrela.dataset.value);
    estrelas.forEach((e) =>
      e.classList.toggle("ativa", parseInt(e.dataset.value) <= notaSelecionada)
    );
  });
});

// Envio de comentário
enviarBtn?.addEventListener("click", () => {
  const comentario = comentarioInput.value.trim();
  if (notaSelecionada === 0 || comentario === "") {
    alert("Por favor, selecione uma nota e escreva um comentário.");
    return;
  }

  const novaAvaliacao = {
    nota: notaSelecionada,
    comentario,
    data: new Date().toLocaleDateString("pt-BR"),
  };

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
    div.innerHTML = `
      <div class="stars">${'★'.repeat(avaliacao.nota)}${'☆'.repeat(5 - avaliacao.nota)}</div>
      <p>${escapeHtml(avaliacao.comentario)}</p>
      <small>${avaliacao.data}</small>
    `;
    listaComentarios.appendChild(div);
  });
}

// Inicializa comentários e nota média ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  mostrarComentarios();
  atualizarNotaMedia();
});
