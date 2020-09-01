const mysql = require('mysql')

const conexao = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'petshop_agenda_admin',
  password: '1234',
  database: 'petshop-agenda'
})

module.exports = conexao
