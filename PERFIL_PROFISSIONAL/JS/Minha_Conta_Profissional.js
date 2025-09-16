// RECEBIMENTOS
const modalRecebimento = document.getElementById("modal-recebimento");
const tituloRecebimento = document.getElementById("titulo-recebimento");
const descricaoRecebimento = document.getElementById("descricao-recebimento");

function toggleRecebimentos() {
  const opcoes = document.getElementById("opcoes-recebimento");
  const seta = document.getElementById("seta-recebimento");
  const titulo = document.querySelector(".section-title");

  if (opcoes.classList.contains("show")) {
    opcoes.classList.remove("show");
    titulo.classList.remove("aberto");
  } else {
    opcoes.classList.add("show");
    titulo.classList.add("aberto");
  }
}

function abrirModalRecebimento(tipo) {
  let titulo = "";
  let descricao = "";

  switch (tipo) {
    case "conta":
      titulo = "Conta Bancária";
      descricao = "Cadastre sua conta bancária para receber seus ganhos.";
      break;
    case "pix":
      titulo = "Pix";
      descricao = "Cadastre sua chave Pix para recebimentos instantâneos.";
      break;
  }

  tituloRecebimento.textContent = titulo;
  descricaoRecebimento.textContent = descricao;
  modalRecebimento.style.display = "flex";
}

function fecharRecebimento() {
  modalRecebimento.style.display = "none";
}

function salvarRecebimento() {
  alert("Forma de recebimento salva com sucesso!");
  fecharRecebimento();
}
