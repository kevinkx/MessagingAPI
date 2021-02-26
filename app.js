const express = require("express");
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'messagingapi'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

app.get("/",(req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        connection.query('SELECT * from users LIMIT 1', (err, rows) => {
            connection.release(); // return the connection to pool
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
        });
    });
});

var http = require('http');
http.createServer(function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/plain'});
 res.end('Hello World\n');
}).listen(3000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:3000');