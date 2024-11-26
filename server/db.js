// Conexión con la base de datos
const mysql = require('mysql2');

// Configuración de la conexión
const db = mysql.createConnection({
    host: 'localhost', // Cambiar si es necesario en producción
    user: 'root', // Cambiar si tu usuario de MySQL es diferente
    password: 'root', // Cambiar según la configuración de tu base de datos
    database: 'biocompany', // Nombre de la base de datos
});

// Función para conectar a la base de datos
const connectToDatabase = () => {
    db.connect((err) => {
        if (err) {
            console.error('Error conectando a la base de datos:', err.message);
            return;
        }
        console.log('Conexión a la base de datos exitosa.');

        // Verificar y crear la tabla de usuarios
        verifyUsersTable();
    });
};

// Función para verificar y crear la tabla de usuarios si no existe
const verifyUsersTable = () => {
    const tableUsersQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );
    `;

    db.query(tableUsersQuery, (err) => {
        if (err) {
            console.error('Error al crear la tabla de usuarios:', err.message);
        } else {
            console.log('Tabla de usuarios verificada y/o creada con éxito.');
        }
    });
};

// Llamar a la función de conexión
connectToDatabase();

module.exports = db;
