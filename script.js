// Configuración de la fecha de inicio de la relación
// IMPORTANTE: Cambia esta fecha a la fecha en que comenzaron a ser novios
// Formato: Año, Mes (0-11), Día, Hora, Minuto, Segundo
  // Reemplaza esta URL con la URL de compartir de tu álbum de Google Fotos

const startDate = new Date(2022, 0, 9, 0, 0, 0) // Ejemplo: 1 de enero de 2023

/// Función para actualizar el contador
function updateCounter() {
  const now = new Date()
  const difference = now - startDate

  // Cálculos de tiempo
  const seconds = Math.floor((difference / 1000) % 60)
  const minutes = Math.floor((difference / (1000 * 60)) % 60)
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
  const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30.4375) // Aproximación de días en un mes

  // Cálculo de meses y años
  let months = 0
  let years = 0

  // Copia de las fechas para no modificar las originales
  const tempStartDate = new Date(startDate)
  const tempNow = new Date(now)

  // Calcular años
  years = tempNow.getFullYear() - tempStartDate.getFullYear()

  // Ajustar años si aún no hemos llegado al mes/día de aniversario este año
  if (
    tempNow.getMonth() < tempStartDate.getMonth() ||
    (tempNow.getMonth() === tempStartDate.getMonth() && tempNow.getDate() < tempStartDate.getDate())
  ) {
    years--
  }

  // Calcular meses
  months = tempNow.getMonth() - tempStartDate.getMonth()
  if (months < 0) months += 12
  if (tempNow.getDate() < tempStartDate.getDate()) {
    months--
    if (months < 0) months += 12
  }

  // Actualizar elementos HTML
  document.getElementById("years").textContent = years
  document.getElementById("months").textContent = months
  document.getElementById("days").textContent = days
  document.getElementById("hours").textContent = hours
  document.getElementById("minutes").textContent = minutes
  document.getElementById("seconds").textContent = seconds

  // Verificar si hoy es un mesario (aniversario mensual)
  checkMonthlyAnniversary(now)
}

// Función para verificar si es un mesario
function checkMonthlyAnniversary(currentDate) {
  const anniversaryMessageSection = document.getElementById("anniversary-message")

  // Si el día del mes actual coincide con el día de inicio de la relación
  if (currentDate.getDate() === startDate.getDate()) {
    // Calcular cuántos meses han pasado
    let monthsPassed = (currentDate.getFullYear() - startDate.getFullYear()) * 12
    monthsPassed += currentDate.getMonth() - startDate.getMonth()

    // Solo mostrar si ha pasado al menos un mes
    if (monthsPassed > 0) {
      // Crear mensaje de aniversario
      anniversaryMessageSection.innerHTML = `
                <h3>¡Feliz ${monthsPassed} ${monthsPassed === 1 ? "Mes" : "Meses"} Juntos!</h3>
                <p>Hoy celebramos ${monthsPassed} ${monthsPassed === 1 ? "mes" : "meses"} de amor, risas y momentos inolvidables. 
                Cada día a tu lado es un regalo y no puedo esperar para crear más recuerdos juntos. 
                Te amo más que ayer y menos que mañana.</p>
            `
      anniversaryMessageSection.style.display = "block"
    } else {
      anniversaryMessageSection.style.display = "none"
    }
  } else {
    anniversaryMessageSection.style.display = "none"
  }
}

// Iniciar el contador y actualizarlo cada segundo
updateCounter()
setInterval(updateCounter, 1000)

// Funcionalidad del carrusel de fotos
let slideIndex = 1
showSlides(slideIndex)

// Función para cambiar de slide
function changeSlide(n) {
  showSlides((slideIndex += n))
}

// Función para mostrar un slide específico
function currentSlide(n) {
  showSlides((slideIndex = n))
}

function showSlides(n) {
  let i
  const slides = document.getElementsByClassName("gallery-item")
  const dots = document.getElementsByClassName("dot")

  // Ajustar el índice si está fuera de rango
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }

  // Ocultar todos los slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }

  // Desactivar todos los puntos
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "")
  }

  // Mostrar el slide actual y activar el punto correspondiente
  slides[slideIndex - 1].style.display = "block"
  dots[slideIndex - 1].className += " active"
}

