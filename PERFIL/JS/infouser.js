document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('perfilForm')
  const btnExcluir = document.getElementById('btnExcluir')
  const modalExcluir = document.getElementById('modalExcluir')
  const cancelarExcluir = document.getElementById('cancelarExcluir')
  const confirmarExcluir = document.getElementById('confirmarExcluir')

  // Carregar dados salvos do localStorage
  const dadosSalvos = localStorage.getItem('perfilUsuario')
  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos)
    form.nome.value = dados.nome || ''
    form.email.value = dados.email || ''
    form.telefone.value = dados.telefone || ''
    form.cep.value = dados.cep || ''
    form.endereco.value = dados.endereco || ''
    form.cpf.value = dados.cpf || ''
  }

  // Salvar dados
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const dados = {
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value,
      cep: form.cep.value,
      endereco: form.endereco.value,
      cpf: form.cpf.value
    }

    localStorage.setItem('perfilUsuario', JSON.stringify(dados))
    alert('Dados salvos com sucesso!')
  })

  // Abrir modal de exclusão
  btnExcluir.addEventListener('click', () => {
    modalExcluir.style.display = 'flex'
  })

  // Cancelar exclusão
  cancelarExcluir.addEventListener('click', () => {
    modalExcluir.style.display = 'none'
  })

  // Confirmar exclusão
  confirmarExcluir.addEventListener('click', () => {
    localStorage.removeItem('perfilUsuario')
    form.reset()
    modalExcluir.style.display = 'none'
    alert('Conta excluída!')
  })

  // Fechar modal clicando fora dele
  window.addEventListener('click', (e) => {
    if (e.target === modalExcluir) {
      modalExcluir.style.display = 'none'
    }
  })
})

// ===== Selecionar o formulário =====
const perfilForm = document.getElementById("perfilForm")

// Carregar dados salvos no localStorage ao abrir a página
window.addEventListener("load", () => {
  const nome = localStorage.getItem("nomeUsuario") || ""
  const email = localStorage.getItem("emailUsuario") || ""
  const telefone = localStorage.getItem("telefoneUsuario") || ""
  const cep = localStorage.getItem("cepUsuario") || ""
  const endereco = localStorage.getItem("enderecoUsuario") || ""
  const cpf = localStorage.getItem("cpfUsuario") || ""

  // Preenche os inputs com os dados já salvos
  perfilForm.nome.value = nome
  perfilForm.email.value = email
  perfilForm.telefone.value = telefone
  perfilForm.cep.value = cep
  perfilForm.endereco.value = endereco
  perfilForm.cpf.value = cpf
})

// Salvar dados no localStorage quando enviar o formulário
perfilForm.addEventListener("submit", (e) => {
  e.preventDefault()

  localStorage.setItem("nomeUsuario", perfilForm.nome.value)
  localStorage.setItem("emailUsuario", perfilForm.email.value)
  localStorage.setItem("telefoneUsuario", perfilForm.telefone.value)
  localStorage.setItem("cepUsuario", perfilForm.cep.value)
  localStorage.setItem("enderecoUsuario", perfilForm.endereco.value)
  localStorage.setItem("cpfUsuario", perfilForm.cpf.value)

  alert("Dados salvos com sucesso!")
  window.location.href = "perfiluser.html" // volta para a página do perfil
})

// ===== Excluir conta =====
const btnExcluir = document.getElementById("btnExcluir")
const modalExcluir = document.getElementById("modalExcluir")
const confirmarExcluir = document.getElementById("confirmarExcluir")
const cancelarExcluir = document.getElementById("cancelarExcluir")

btnExcluir.addEventListener("click", () => {
  modalExcluir.style.display = "flex"
})

cancelarExcluir.addEventListener("click", () => {
  modalExcluir.style.display = "none"
})

confirmarExcluir.addEventListener("click", () => {
  // Limpa tudo do localStorage
  localStorage.clear()
  alert("Conta excluída com sucesso!")
  window.location.href = "perfiluser.html"
})

