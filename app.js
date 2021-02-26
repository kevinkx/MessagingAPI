const express = require("express");
const app = express();
const mysql = require('mysql');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'messagingapi'
});

app.get("/user/",(req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
		var query = "SELECT * from users";
        connection.query(query, (err, rows) => {
            connection.release(); // return the connection to pool
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
			if(rows.length === 0){
				res.send({error: 'data not found'});
			}else{
				res.send(rows);
			}
        });
    });			
});

app.get("/user/:userId",(req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
		console.log(req.params)
		var query = "SELECT * from users WHERE id = "+ req.params.userId;
        connection.query(query, (err, rows) => {
            connection.release(); // return the connection to pool
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
			if(rows.length === 0){
				res.send({error: 'data not found'});
			}else{
				res.send({
					id: rows[0].id,
					username: rows[0].username
				});
			}
        });
    });			
});


app.listen(3000);
console.log('Server started 127.0.0.1:3000');
