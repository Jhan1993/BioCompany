const express = require('express');
const router = express.Router();

// Mostrar página de contacto
router.get('/contact', (req, res) => {
    res.render('./pages/about/contactUs', { title: 'Contáctanos', user: req.session.user || null });
});

// Mostrar página de "Acerca de Nosotros"
router.get('/about', (req, res) => {
    res.render('./pages/about/aboutOf', { title: 'Acerca de', user: req.session.user || null });
});

module.exports = router;