const db = require('../server/db');

// Modelo para insertar un usuario
exports.insertUser = (userData, callback) => {
    const { name, lastname, email, password } = userData;
    const query = `INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, lastname, email, password], (err, results) => {
        if (err) {
            console.error('Error al insertar el usuario:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

// Modelo para buscar un usuario por correo
exports.findUserByEmail = (email, callback) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error al buscar el usuario por correo:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

