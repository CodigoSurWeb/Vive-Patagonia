document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('active');
  });


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 


    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const vuelo = document.getElementById('vuelo').value;
    const fecha = document.getElementById('fecha').value;
    const personas = document.getElementById('personas').value;
    const servicios = Array.from(document.querySelectorAll('select[name="servicios"] option:checked'))
                            .map(option => option.text).join(', ');
    const pago = document.getElementById('pago').value;
    const notas = document.getElementById('notas').value;


    const mensaje = `
        Nombre: ${nombre}
        Email: ${email}
        Teléfono: ${telefono}
        Número de vuelo: ${vuelo}
        Fecha de reserva: ${fecha}
        Cantidad de personas: ${personas}
        Servicios: ${servicios}
        Forma de pago: ${pago}
        Notas adicionales: ${notas}
    `;


    alert(mensaje);
});