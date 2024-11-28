const form = document.querySelector('.form-login');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Inicio de sesión exitoso');
            form.reset();
            window.location.href = '/';
        } else {
            const errorData = await response.json();
            console.error('Revisa las credenciales ingresadas:', errorData);
            alert('Revisa la información ingresada');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Su correo o contraseña no es valida, verifique los datos.');
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