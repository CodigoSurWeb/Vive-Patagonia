
// Función para el menú hamburguesa del header
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('nav ul').classList.toggle('active');
});


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

  // Divide el texto en dos partes
  const partes = texto.split(", "); // Por ejemplo, separar por coma y espacio

  partes.forEach((parte, index) => {
    // Crea un contenedor para cada parte de la frase
    const span = document.createElement("span");
    span.textContent = parte;
    titulo.appendChild(span);

    // Añadir un salto de línea si no es la última parte
    if (index < partes.length - 1) {
      titulo.appendChild(document.createElement("br"));
    }
  });
});


// Manejo de "Ver más" y "Ver menos"
const verMasBtns = document.querySelectorAll('.ver-mas');
const descripcionExtendida = document.querySelector('.descripcion-extendida');
const tituloExtendido = document.getElementById('titulo-extendido');
const descripcionLarga = document.getElementById('descripcion-larga');
const precioElemento = document.getElementById('precio');

verMasBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        const card = this.closest('.card');
        
        // Si el mismo botón está cerrando la descripción
        if (descripcionExtendida.style.display === 'block' && this.textContent === 'Ver menos') {
            descripcionExtendida.style.display = 'none';
            this.textContent = 'Ver más';
            card.classList.remove('hovered');
            return;
        }

        // Actualizar contenido
        tituloExtendido.textContent = card.querySelector('h3').textContent;
        descripcionLarga.textContent = card.getAttribute('data-descripcion-larga');
        precioElemento.textContent = `Precio: ${card.getAttribute('data-precio')}`;

        // Mostrar la descripción extendida
        descripcionExtendida.style.display = 'block';

        // Resetear todos los botones y tarjetas
        verMasBtns.forEach((b) => b.textContent = 'Ver más');
        document.querySelectorAll('.card').forEach((c) => c.classList.remove('hovered'));

        // Cambiar este botón a "Ver menos"
        this.textContent = 'Ver menos';
        card.classList.add('hovered');
    });
});

// Función para el carrusel de tarjetas de "Nuestros servicios"
document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;
  const cardsToShow = 3; // Número de tarjetas visibles
  const totalCards = document.querySelectorAll('.card').length +1; 
  const cards = document.querySelectorAll('.card');
  const prevButton = document.querySelector('.prev-card');
  const nextButton = document.querySelector('.next-card');
  const carousel = document.querySelector('.carrusel');
  
  // Función para mover el carrusel
  function moveSlide(direction) {
    // Calcula el nuevo índice
    currentIndex += direction;

    if (currentIndex < 0) {
      currentIndex = totalCards - cardsToShow; // Al llegar al principio, mueve al final
    } else if (currentIndex > totalCards - cardsToShow) {
      currentIndex = 0; // Al llegar al final, vuelve al principio
    }

    // Desplaza el contenedor del carrusel para mostrar las tarjetas correctas
    const offset = (currentIndex * 100) / cardsToShow; // Calcula el porcentaje del desplazamiento
    carousel.style.transform = `translateX(-${offset}%)`; // Aplica el desplazamiento con translateX
  }

  // Agregar eventos a las flechas
  prevButton.addEventListener('click', () => moveSlide(-1)); // Flecha izquierda
  nextButton.addEventListener('click', () => moveSlide(1));  // Flecha derecha

  // Inicializa el carrusel para mostrar las primeras 3 tarjetas
  moveSlide(0);
});

// Función para el carrusel de imagenes de "Nuestra flota"
document.addEventListener("DOMContentLoaded", () => {
  const flotaCarousel = document.querySelector(".custom-carousel"); // Selecciona el carrusel específico
  const container = flotaCarousel.querySelector(".carousel-container");
  const items = flotaCarousel.querySelectorAll(".carousel-item");
  const prevButton = flotaCarousel.querySelector(".prev");
  const nextButton = flotaCarousel.querySelector(".next");

  let index = 0;
  const totalItems = items.length;
  let interval; // Guardará el intervalo del carrusel automático

  // Función para mover el carrusel
  function moveSlide(step) {
    index += step;

    if (index < 0) {
      index = totalItems - 1; // Si llega al inicio, vuelve al final
    } else if (index >= totalItems) {
      index = 0; // Si llega al final, vuelve al inicio
    }

    const newTransformValue = -index * 100; // Desplaza el contenedor de imágenes
    container.style.transform = `translateX(${newTransformValue}%)`;
  }

  // Función para iniciar el carrusel automático
  function startAutoSlide() {
    interval = setInterval(() => moveSlide(1), 3000); // Cambia de imagen cada 3 segundos
  }

  // Función para detener el carrusel automático cuando el usuario interactúa
  function stopAutoSlide() {
    clearInterval(interval);
    startAutoSlide(); // Reinicia el intervalo
  }

  // Eventos de botones
  prevButton.addEventListener("click", () => {
    moveSlide(-1);
    stopAutoSlide();
  });

  nextButton.addEventListener("click", () => {
    moveSlide(1);
    stopAutoSlide();
  });

  // Iniciar el carrusel automático
  startAutoSlide();
});