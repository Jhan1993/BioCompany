const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    const { name, lastname, email, password } = req.body;

    // Validación de campos obligatorios
    if (!name || !lastname || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el correo ya está registrado
        const existingUser = await new Promise((resolve, reject) => {
            userModel.findUserByEmail(email, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el usuario
        const newUser = await new Promise((resolve, reject) => {
            userModel.insertUser({ name, lastname, email, password: hashedPassword }, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        res.status(201).json({ message: 'Usuario registrado con éxito', userId: newUser.insertId });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).render('pages/auth/login', { error: 'Todos los campos son obligatorios' });
    }

    try {
        const user = await new Promise((resolve, reject) => {
            userModel.findUserByEmail(email, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        if (user.length === 0) {
            return res.status(401).render('pages/auth/login', { error: 'Correo o contraseña incorrectos' });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(401).render('pages/auth/login', { error: 'Correo o contraseña incorrectos' });
        }

        // Guardar datos del usuario en la sesión
        req.session.user = { id: user[0].id, name: user[0].name, email: user[0].email };

        res.status(200).redirect('/'); // Redirigir al index.ejs tras inicio de sesión exitoso
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).render('pages/error', { message: 'Error interno del servidor' });
    }
};
