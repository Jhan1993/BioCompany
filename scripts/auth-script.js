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
