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

console.log("Archivo login conectado")