const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345', // sua senha do MySQL
  database: 'db_biblioteca',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});

module.exports = connection;