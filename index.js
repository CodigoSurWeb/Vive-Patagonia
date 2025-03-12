// Función para el menú hamburguesa del header
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('active');
  });

  let index = 0;

function moveSlide(step) {
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;

  index += step;

  if (index < 0) index = totalItems - 1; // Si llega al inicio, va al final
  if (index >= totalItems) index = 0; // Si llega al final, va al inicio

  const newTransformValue = -index * 100; // Desplaza el contenedor de las imágenes
  document.querySelector('.carousel-container').style.transform = `translateX(${newTransformValue}%)`;
}

// Función para pasar las imágenes del carrusel automáticamente cada 3 segundos
function autoSlide() {
  moveSlide(1);
}setInterval(autoSlide, 3000); // Cambia de imagen cada 3 segundos


// Función para función de toggle de modo Ushuaia
document.addEventListener("DOMContentLoaded", function () {
  // Toggle de Modo Ushuaia
  const modoUshuaia = document.querySelector(".modo-ushuaia");
  const toggleInput = document.getElementById("toggle-switch");

  // Activar el switch automáticamente después de 1 segundo
  setTimeout(() => {
    toggleInput.checked = true; // Activa visualmente el switch
  }, 500);

  // Aplicar la clase 'active' después de que el toggle se haya mostrado
  setTimeout(() => {
    modoUshuaia.classList.add("active"); // Aplica la animación de fade-out del toggle
  }, 1500); // Espera para asegurar que se vea antes de desaparecer
});

// Función para animación de letras de eslogan
document.addEventListener("DOMContentLoaded", function () {
  const titulo = document.getElementById("animado");
  const texto = titulo.innerText;
  titulo.innerHTML = ""; // Vacía el contenido original

  texto.split("").forEach(letra => {
    const span = document.createElement("span");
    span.textContent = letra;
    titulo.appendChild(span);
  });
});

// Obtener elementos del carrusel y los botones
const carrusel = document.querySelector('.carrusel');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Función para desplazar el carrusel hacia la izquierda
let currentIndex = 0;

function moveCarrusel() {
  carrusel.style.transform = `translateX(-${currentIndex * 100 / 5}%)`; // Ajusta el carrusel
}

// Navegar hacia la izquierda
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = 5; // Si está en la primera, vuelve al final
  }
  moveCarrusel();
});

// Navegar hacia la derecha
nextButton.addEventListener('click', () => {
  if (currentIndex < 5) {
    currentIndex++;
  } else {
    currentIndex = 0; // Si está en el final, vuelve al principio
  }
  moveCarrusel();
});

// Manejo de "Ver más" y mostrar descripción extendida
const verMasBtns = document.querySelectorAll('.ver-mas');
const descripcionExtendida = document.getElementById('descripcion-extendida');
const descripcionLarga = document.getElementById('descripcion-larga');
const precioElemento = document.getElementById('precio');

verMasBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    const card = this.closest('.card');
    const descripcion = card.getAttribute('data-descripcion-larga');
    const precio = card.getAttribute('data-precio');
    descripcionLarga.textContent = descripcion;
    precioElemento.textContent = `Precio: ${precio}`;
    descripcionExtendida.style.display = 'block';
  });
});