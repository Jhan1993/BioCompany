//Conexion con la base de datos
const mysql = require('mysql2');

//Configuracion de la conexion
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'biocompany'
});

db.connect((err) => {
    if(err){
        console.log('Error conectando a la base de datos', err);
        return;
    }else
        console.log('Conexion a la base de datos exitosa.');

    //Creamos la tabla de usuarios si no existe
    const tableUsersQuery = `
    CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
    `;

    db.query(tableUsersQuery, (err) => {
        if (err)
            console.log('Error al crear la tabla de usuarios', err);
        else
            console.log('tabla de usuarios verificada y/o creada con exito')
    }); 
});

module.exports = db;
