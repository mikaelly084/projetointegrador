// Compartilhamento de Link 
const btn = document.getElementById('btnCompartilhar')
const msg = document.getElementById('copiado-msg')
const menu = document.getElementById('menuCompartilhar')

btn.addEventListener('click', (e) => {
  e.stopPropagation()
  navigator.clipboard.writeText(window.location.href).then(() => {
    msg.classList.add('mostrar');
    setTimeout(() => msg.classList.remove('mostrar'), 2500)
  })
  menu.classList.toggle('show')
  atualizarLinksCompartilhamento()
})

document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove('show')
  }
})

function copiarLink() {
  const url = window.location.href
  navigator.clipboard.writeText(url).then(() => {
    msg.classList.add('mostrar')
    setTimeout(() => msg.classList.remove('mostrar'), 2500)
    menu.classList.remove('show')
  }).catch(() => {
    alert('❌ Não foi possível copiar o link.')
  })
}

function atualizarLinksCompartilhamento() {
  const url = encodeURIComponent(window.location.href)
  document.getElementById('btnWhatsApp').href = `https://wa.me/?text=${url}`
  document.getElementById('btnFacebook').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`
}


//Upload da imagem de perfil
const input = document.getElementById('upload-photo')
const image = document.getElementById('profile-image')

input.addEventListener('change', function () {
  const file = this.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = function (e) {
      image.src = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    alert('Por favor, selecione uma imagem válida.')
  }
})

//Avaliações com estrelas 
let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || []
let notaSelecionada = 0

const estrelas = document.querySelectorAll('#selecao-estrelas span')
const notaMediaEl = document.getElementById('nota-media')
const comentarioInput = document.getElementById('comentario')
const enviarBtn = document.getElementById('enviarComentario')
const listaComentarios = document.getElementById('lista-comentarios')

estrelas.forEach(estrela => {
  estrela.addEventListener('click', () => {
    notaSelecionada = parseInt(estrela.getAttribute('data-value'))
    estrelas.forEach(e => {
      const valor = parseInt(e.getAttribute('data-value'))
      e.classList.toggle('ativa', valor <= notaSelecionada)
    })
  })
})

enviarBtn.addEventListener('click', () => {
  const comentario = comentarioInput.value.trim()
  if (notaSelecionada === 0 || comentario === '') {
    alert('Por favor, selecione uma nota e escreva um comentário.')
    return
  }

  avaliacoes.push({ nota: notaSelecionada, comentario })
  localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes))

  atualizarNotaMedia()
  mostrarComentarios()

  comentarioInput.value = ''
  notaSelecionada = 0
  estrelas.forEach(e => e.classList.remove('ativa'))
})

function atualizarNotaMedia() {
  if (avaliacoes.length === 0) {
    notaMediaEl.textContent = '0.0'
    return
  }
  const soma = avaliacoes.reduce((acc, a) => acc + a.nota, 0)
  const media = (soma / avaliacoes.length).toFixed(1)
  notaMediaEl.textContent = media
}

function mostrarComentarios() {
  listaComentarios.innerHTML = ''
  avaliacoes.forEach(avaliacao => {
    const div = document.createElement('div')
    div.className = 'comentario'
    div.innerHTML = `<strong>${avaliacao.nota} ⭐</strong><p>${escapeHtml(avaliacao.comentario)}</p>`
    listaComentarios.appendChild(div)
  })
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// Inicialização
mostrarComentarios()
atualizarNotaMedia()
