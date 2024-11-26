const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//Mostrar formulario de inicio de sesion
router.get('/auth/login', (req, res) => {
    res.render('./pages/auth/login', { error: null }) // Renderiza la vista de login.ejs
});

//Mostrar formulario de registro
router.get('/auth/register', (req, res) => {
    res.render('./pages/auth/register') // Renderiza la vista de register.ejs
});

// Rutas de autenticación
//Inicio de sesion
router.post('/api/login', authController.loginUser);
//Registro de usuario
router.post('/api/register', authController.registerUser);

// Cerrar sesión
router.get('/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).redirect('/'); // Redirigir con un error
        }
        res.redirect('/'); // Redirigir ala pagina principal
    });
});

module.exports = router;
