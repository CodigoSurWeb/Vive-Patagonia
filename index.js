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

// Función para pasar las imágenes automáticamente cada 3 segundos
function autoSlide() {
  moveSlide(1);
}

setInterval(autoSlide, 3000); // Cambia de imagen cada 3 segundos

document.addEventListener("DOMContentLoaded", function () {
  const modoUshuaia = document.querySelector(".modo-ushuaia");
  const toggleInput = document.getElementById("toggle-switch");

  // Activar el switch automáticamente después de 1.5 segundos
  setTimeout(() => {
    toggleInput.checked = true; // Activa visualmente el switch
    modoUshuaia.classList.add("active"); // Aplica la animación de fade-out del toggle
  }, 1000);
});