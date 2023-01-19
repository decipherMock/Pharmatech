const mysql = require('mysql2');



const pool = mysql.createPool({
    port: process.env.DB_port,
    host: process.env.DB_host,
    user: process.env.DB_user,
    database: process.env.DB_database,
    password: process.env.DB_password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });


  
// const pool = mysql.createPool({
//   port: process.env.DB_port,
//   host: 'dbtestdemo.clrcwvpstzrm.us-east-1.rds.amazonaws.com',
//   user: 'admin',
//   database: 'sys',
//   password: 'Dubaduba6060',
//   waitForConnections: true,
//   connectionLimit: 30,
//   queueLimit: 0
// });

  module.exports = pool;