const mysql = require('mysql2');
require('dotenv').config();

//This variable creates the connection in mysql. 
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employees'
    },
);

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;