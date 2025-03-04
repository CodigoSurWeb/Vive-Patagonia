let ImporteServicio=0;
let ArrayServicios=[];
let DescripcionServicio = '';
let remitente = '';

document.addEventListener("DOMContentLoaded", async () => {

    const selectServicios = document.getElementById("servicios");    

    const buscarServicios = async () => {
        try {

            const response = await fetch('https://vivepatagonia.com.ar/apiservicios.php');
            const data = await response.json();

            if (data.error) {
                console.error(`Error: ${data.error}`);
                selectServicios.innerHTML = '<option value="">No hay servicios disponibles</option>';
            } else {
                selectServicios.innerHTML = '';

                // Limpiar el array antes de llenarlo
                ArrayServicios.length = 0;

                data.servicios.forEach(servicio => {
                    const option = document.createElement("option");
                    option.value = servicio.IdServicio;
                    option.textContent = servicio.descripcion;
                    selectServicios.appendChild(option);

                    // Agregar el servicio al array usando map()
                    ArrayServicios.push({
                        id: servicio.IdServicio,
                        descripcion: servicio.descripcion,
                        importe: servicio.costo
                    });
                });
            }
        } catch (error) {
            console.error('Error al consultar la API:', error);
            selectServicios.innerHTML = '<option value="">Error al cargar servicios</option>';
        }
    };
    await buscarServicios();

    const selectMediospago = document.getElementById("pago");    

    const buscarMediospago = async () => {
        try {
            const response = await fetch('https://vivepatagonia.com.ar/apimediospago.php');
            const data = await response.json();

            if (data.error) {
                console.error(`Error: ${data.error}`);
                selectMediospago.innerHTML = '<option value="">No hay servicios disponibles</option>';
            } else {
                selectMediospago.innerHTML = '';
                data.mediospago.forEach(pago => {
                    const option = document.createElement("option");
                    option.value = pago.IdMediopago;
                    option.textContent = pago.descripcion;
                    selectMediospago.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error al consultar la API:', error);
            selectMediospago.innerHTML = '<option value="">Error al cargar servicios</option>';
        }
    };
    await buscarMediospago();

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
        const servicios = document.getElementById('servicios').value;
        const pago = document.getElementById('pago').value;
        const notas = document.getElementById('notas').value;

        remitente = email;

        // Validar que nombre, email y teléfono sean obligatorios
        if (!nombre || !email || !telefono) {
            Swal.fire({
                title: 'Datos incompletos',
                text: 'Por favor, complete los campos obligatorios: Nombre, Teléfono y correo electrónico.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Validar que la fecha no sea menor o igual a hoy, ni '0000-00-00', ni inválida
        const fechaSeleccionada = new Date(fecha);
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);

        if (fecha === '0000-00-00' || isNaN(fechaSeleccionada) || fechaSeleccionada <= fechaActual) {
            Swal.fire({
                title: 'Fecha no válida',
                text: 'Por favor, seleccione una fecha futura válida.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        const servicioEncontrado = ArrayServicios.find(miservicio => miservicio.id === servicios);
        if (servicioEncontrado) {
            ImporteServicio = servicioEncontrado.importe;
            console.log(`Importe del servicio "${DescripcionServicio}": $${ImporteServicio}`);
        } else {
            console.log(`No se encontró el servicio con descripción: ${DescripcionServicio}`);
        }
        ImporteServicio = ImporteServicio*personas;

        const mensaje = `
        <b>Nombre:</b> ${nombre}<br>
        <b>Email:</b> ${email}<br>
        <b>Teléfono:</b> ${telefono}<br>
        <b>Número de vuelo:</b> ${vuelo}<br>
        <b>Fecha de reserva:</b> ${fecha}<br>
        <b>Cantidad de personas:</b> ${personas}<br>
        <b>Servicios:</b> ${servicios}<br>
        <b>Forma de pago:</b> ${pago}<br>
        <b>Notas adicionales:</b> ${notas}
        <b>Importe Servicio:</b> ${ImporteServicio}`

        EnviarDatos({ nombre, email, telefono, vuelo, fecha, personas, servicios, pago, notas, ImporteServicio });
    });

    async function EnviarDatos(datos) {
        try {
            const response = await fetch('https://vivepatagonia.com.ar/guardar_reserva.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
    
            const resultado = await response.json();
    
            if (resultado.success) {
                // Enviar email después de registrar la reserva
                await fetch('https://vivepatagonia.com.ar/enviar_email.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        destinatario: "reservas@vivepatagonia.com.ar",
                        remitente: remitente,
                        asunto: "Nueva reserva de servicios Vive Patagonia",
                        mensaje: datos.mensaje
                    })
                });
    
                Swal.fire({
                    title: 'Reserva Recibida',
                    text: 'Su reserva ha sido registrada correctamente.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = 'index.html';
                });
    
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al registrar la reserva.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error al enviar los datos de la reserva:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo conectar con el servidor.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
});
