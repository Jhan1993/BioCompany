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

// Configuración de sesiones
app.use(session({
    secret: 'biocompany-secret-key', // Cambia esto a una clave secreta segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Ruta principal que renderiza la página de inicio
app.get('/', (req, res) => {
    res.render('index', { title: 'BioCOMPANY', user: req.session.user || null });
});

// Usar rutas de autenticación
app.use('/', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

