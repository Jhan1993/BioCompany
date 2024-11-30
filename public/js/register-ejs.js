const form = document.getElementById('register-form');

form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Capturar datos del formulario
    const formData = {
        name: document.getElementById('name').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    console.log('Datos enviados desde el frontend:', formData);

    // Enviar datos al servidor
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indicar que el contenido es JSON
            },
            body: JSON.stringify(formData), // Convertir los datos a JSON
        });

        if (response.ok) {
            alert('Registro exitoso');
            form.reset(); // limpia el formulario tras el registro
            window.location.href = '/auth/login';
        } else {
            const errorData = await response.json();
            console.error('Error al registrar:', errorData);
            alert('Revisa la información ingresada');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al registrar. Intenta nuevamente.');
    }
});

/**
 * Funtion for Show and hide passowrd
 * @param {*} event 
 */
function togglePasswordVisibility(event) 
{   
    event.preventDefault();

    const passwordField = document.querySelector('#password');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    document.querySelector('.toggle-show').classList.toggle('_show');
}

document.querySelector('.eye-icon').addEventListener('click', togglePasswordVisibility);