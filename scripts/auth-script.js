// Selección de elementos del DOM
const modal = document.getElementById('modal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.getElementById('btnRegister');
const closeButton = document.querySelector('.close-button');

// Función para mostrar el modal de inicio de sesión
export function openLoginModal() {
    modal.style.display = 'flex'; // Muestra el modal
    loginForm.style.display = 'block'; // Muestra el formulario de inicio de sesión por defecto
    registerForm.style.display = 'none'; // Oculta el formulario de registro
}

// Función para cerrar el modal
export function closeModal() {
    modal.style.display = 'none';
}

// Función para alternar entre los formularios de inicio de sesión y registro
function showLoginForm() {
    loginForm.style.display = 'block';
    document.querySelector('#btnLogin').classList.add('_active');
    document.querySelector('#btnRegister').classList.remove('_active');
    registerForm.style.display = 'none';
}

function showRegisterForm() {
    loginForm.style.display = 'none';
    document.querySelector('#btnLogin').classList.remove('_active');
    document.querySelector('#btnRegister').classList.add('_active');
    registerForm.style.display = 'block';
}

// Función para mostrar/ocultar contraseña
function togglePasswordVisibility() {
    const passwordField = document.querySelector('.password-input');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    document.querySelector('.togglePassword').classList.toggle('_show');
}

function toggleRegisterPassword() {
    const passwordField = document.querySelector('.input-register-password');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    document.querySelector('.register-password').classList.toggle('_show');
}


function toggleConfirmPassword() {
    const passwordField = document.querySelector('.input-confirm-password');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    document.querySelector('.confirm-register-password').classList.toggle('_show');
}

// Eventos
document.querySelector('.buttons-container button:first-child').addEventListener('click', openLoginModal);
closeButton.addEventListener('click', closeModal);
btnLogin.addEventListener('click', showLoginForm);
btnRegister.addEventListener('click', showRegisterForm);
document.querySelector('.togglePassword').addEventListener('click', togglePasswordVisibility);
document.querySelector('.register-password').addEventListener('click', toggleRegisterPassword);
document.querySelector('.confirm-register-password').addEventListener('click', toggleConfirmPassword);

//formulario de registro para enviar los datos a /api/register
document.getElementById('registerButton').addEventListener('click', async (e) => {
    e.preventDefault(); // Evitar recarga

    const name = document.getElementById('firstName').value;
    const lastname = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validación de contraseñas
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
            return;
    }

    // Enviar datos al servidor
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, lastname, email, password })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message); // Usuario registrado con éxito
            // Limpia el formulario y cierra el modal
            document.getElementById('firstName').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById('registerEmail').value = '';
            document.getElementById('registerPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            closeModal();
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error('Error en el registro:', error);
        alert('Hubo un problema al registrar el usuario. Inténtalo nuevamente.');
    }
});

// scripts/auth-script.js

// Selección del botón de inicio de sesión
const loginButton = document.getElementById('loginButton');

// Escuchar el evento de clic en el botón de inicio de sesión
loginButton.addEventListener('click', async (e) => {
    e.preventDefault(); // Evitar recarga de página

    // Obtener los valores de los campos del formulario de inicio de sesión
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validación de datos básicos
    if (!email || !password) {
        alert('Todos los campos son obligatorios');
        return;
    }

    // Enviar datos al servidor
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message); // Inicio de sesión exitoso
            // Opcional: Redirigir al usuario a una página principal o perfil
        } else {
            alert(result.error); // Mostrar el error recibido del servidor
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('Hubo un problema al iniciar sesión. Inténtalo nuevamente.');
    }
});
