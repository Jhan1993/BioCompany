// server/app.js
const express = require('express'); //importamos el modulo de express
const path = require('path'); //importamos modulo path: permite trabajar con rutas y directorios
const db = require('./db'); //importamos la conexion a la base de datos
const { error } = require('console');
const app = express(); //Crea una instancia de la app express o app del servidos
const PORT = 3000; //Puerto en el que el servidor escuchara las solicitudes
const bcrypt = require('bcryptjs'); // Importamos bcryptjs para encriptar contraseñas

// Configuración para procesar datos en formato JSON y URL
app.use(express.json()); //json
app.use(express.urlencoded({extended:true})); //url

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../')));

// Ruta principal que sirve el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Ruta para el registro de usuaios
app.post('/api/register', async (req, res) => {
    const { name, lastname, email, password } = req.body;

    // Validación de datos básicos (en el servidor)
    if (!name || !lastname || !email || !password)
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datosvcon la contraseña encriptada
        const query = `INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)`;
        db.query(query, [name, lastname, email, hashedPassword], (err, result) => {
            if (err){
                console.error('Error al registrar usuario', err);
                return res.status(500).json({ error: 'Error al registrar usuario' });
            }else
                res.status(201).json({ message: 'Usuario registrado con exito' });
        });   
    } catch (error) {
        console.error('Error en el proceso de registro:', error);
        res.status(500).json({ error: 'Error en el proceso de registro' });
    }
});

// Ruta para el inicio de sesión
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    //Validacion de datos
    if (!email || !password)
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });

    // Buscar el usuario en la base de datos por correo electrónico
    const query = `SELECT * FROM users WHERE email = ?`;g
    db.query (query, [email], async (err, results) => {
        if (err){
            console.error('Error al buscar usuario:', err);
            return res.status(500).json({ error: 'Error al buscar usuario' });
        }

        //si el usuario no existe
        if (results.length === 0)
            return res.status(500).json({ error: 'correo o contraseña incorrectos'});

        const user = results[0];

        // Comparar la contraseña encriptada
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(401).json({ error: 'correo o contraseña incorrectos' });

        // Si la contraseña coincide, el inicio de sesión es exitoso
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
