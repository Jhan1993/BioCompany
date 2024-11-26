const express = require('express');
const path = require('path');
const session = require('express-session'); // Importar express-session
const authRoutes = require('../routes/authRoutes');
const app = express();
const PORT = 3000;

// Configuración para EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Configuración para procesar datos en formato JSON y URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Configuración de sesiones
app.use(session({
    secret: 'biocompany-secret-key', // Cambia esto a una clave secreta segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Usar rutas de autenticación
app.use('/auth', authRoutes);

// Middleware para deshabilitar el caché
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

// Ruta principal que renderiza la página de inicio
app.get('/', (req, res) => {
    res.render('index', { title: 'BioCOMPANY', user: req.session.user || null });
});

//Mostrar formulario de inicio de sesion
app.get('auth/login', (req, res) => {
    res.render('/pages/auth/login', { error: null }) // Renderiza la vista de login.ejs
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
