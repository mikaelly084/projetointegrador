window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen')
  if (loadingScreen) {
    
    setTimeout(() => {
      loadingScreen.style.display = 'none'
    }, 1000)
  }
})

const input = document.getElementById('upload-photo')
const image = document.getElementById('profile-image')

input.addEventListener('change', function () {
  const file = this.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = function (e) {
      image.src = e.target.result
    }
    reader.readAsDataURL(file)
  }
})

const logoutBtn = document.getElementById('logout-btn')
const modal = document.getElementById('confirm-modal')
const confirmYes = document.getElementById('confirm-yes')
const confirmNo = document.getElementById('confirm-no')

logoutBtn.addEventListener('click', function () {
  modal.style.display = 'flex'
})

confirmYes.addEventListener('click', function () {
  sessionStorage.clear()
  localStorage.clear()
  window.location.href = "login.html"
})

confirmNo.addEventListener('click', function () {
  modal.style.display = 'none'
})

  function enviarEmergencia() {
    // Faz ligação para a polícia (190 no Brasil)
    window.location.href = 'tel:190';
  }

  // function enviarEmergencia() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;
  //       const linkLocalizacao = `https://www.google.com/maps?q=${latitude},${longitude}`;

  //       // Número de WhatsApp do suporte de emergência (formato internacional sem + e sem espaços)
  //       const numeroWhatsApp = "5511999999999"; // Altere para o número real

  //       const mensagem = `🚨 EMERGÊNCIA! Preciso de ajuda imediata.\n📍 Minha localização: ${linkLocalizacao}`;

  //       window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`, '_blank');
  //     }, function() {
  //       alert("Não foi possível obter sua localização. Por favor, ative o GPS.");
  //     });
  //   } else {
  //     alert("Geolocalização não é suportada pelo seu navegador.");
  //   }
  // }
