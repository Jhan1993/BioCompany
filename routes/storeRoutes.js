const express = require('express');
const router = express.Router();

// Mostrar página de carrito
router.get('/cart', (req, res) => {
    res.render('./pages/store/cart', { title: 'Carrito', user: req.session.user || null });
});

module.exports = router;