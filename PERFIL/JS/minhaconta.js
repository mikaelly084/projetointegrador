
// ELEMENTOS DOM
const el = (id) => document.getElementById(id); // atalho para pegar elementos

const uploadInput   = el("upload-photo");
const profileImage  = el("profile-image");
const defaultIcon   = el("default-icon");
const removeBtn     = el("remove-photo");
const profileCont   = el("profile-container");

const logoutBtn     = el("logout-btn");
const modal         = el("confirm-modal");

const perfilForm    = el("perfilForm");


// FUNÇÕES AUXILIARES
function salvarLocal(chave, valor) {
  localStorage.setItem(chave, valor);
}

function carregarLocal(chave) {
  return localStorage.getItem(chave);
}

function removerLocal(chave) {
  localStorage.removeItem(chave);
}

// FOTO DE PERFIL
function atualizarFotoPerfil(foto) {
  if (foto) {
    profileImage.src = foto;
    profileImage.style.display = "block";
    defaultIcon.style.display = "none";
    removeBtn.s
  } else {
    profileImage.src = "";
    profileImage.style.display = "none";
    defaultIcon.style.display = "block";
    removeBtn.style.display = "none";
  }
}

function carregarFotoSalva() {
  const fotoSalva = carregarLocal("fotoPerfil");
  if (fotoSalva) atualizarFotoPerfil(fotoSalva);
}

uploadInput?.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    atualizarFotoPerfil(e.target.result);
    salvarLocal("fotoPerfil", e.target.result);
  };
  reader.readAsDataURL(file);
});

removeBtn?.addEventListener("click", () => {
  removerLocal("fotoPerfil");
  atualizarFotoPerfil(null);
});


// BOTÃO DE EMERGÊNCIA
function enviarEmergencia() {
  window.location.href = "tel:190";
}



// PERFIL - FORMULÁRIO

const camposPerfil = ["nomeUsuario", "emailUsuario", "telefoneUsuario", "cepUsuario", "enderecoUsuario", "cpfUsuario"];

perfilForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  camposPerfil.forEach(campo => {
    if (perfilForm[campo.replace("Usuario", "")]) {
      salvarLocal(campo, perfilForm[campo.replace("Usuario", "")].value);
    }
  });

  alert("Dados salvos com sucesso!");
  window.location.href = "perfiluser.html";
});

function carregarDadosSalvos() {
  camposPerfil.forEach(campo => {
    const valor = carregarLocal(campo);
    if (valor && perfilForm[campo.replace("Usuario", "")]) {
      perfilForm[campo.replace("Usuario", "")].value = valor;
    }
  });
}


// modal
function abrirModal() {
  modal.style.display = "flex";
}

function fecharModal() {
  modal.style.display = "none";
}

function confirmarSaida() {
  fecharModal();
  window.location.href = "login.html"; // Redireciona de verdade
}

// Ativando o modal ao clicar em "Sair"
logoutBtn?.addEventListener("click", function (e) {
  e.preventDefault(); // Impede redirecionamento imediato
  abrirModal();
});

//inicializacao
window.addEventListener("load", () => {
  carregarFotoSalva();
  carregarDadosSalvos();
});
