const express = require("express");
const app = express();
const mysql = require('mysql');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'messagingapi'
});
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/users/",(req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
		let query = "SELECT * from users";
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
		let query = "SELECT * from users WHERE id = "+ req.params.userId;
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


app.post("/user/create/",(req,res) => {
	console.log(req.body)
    let insertQuery = 'INSERT INTO ?? (??) VALUES (?)';
    let query = mysql.format(insertQuery,["users","username",req.body.username]);
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
			res.send({error: err});
            return;
        }
        // rows added
		res.send({id:response.insertId});
        console.log(response.insertId);
    });		
});

app.get("/message/:conversationID",(req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
		console.log(req.params)
		let query = "SELECT username, message, date from users JOIN messages ON users.id = messages.user_id WHERE conversation_id = "+req.params.conversationID;
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

app.get("/user/message/:userID",(req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
		console.log(req.params)
		let query = "SELECT username, message, unread_count from users JOIN conversation_detail ON users.id = conversation_detail.chat_user_id JOIN conversations ON conversation_detail.conversation_id = conversations.id JOIN messages ON conversations.last_message_id = messages.id WHERE conversation_detail.user_id = "+req.params.userID;
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

app.listen(3000);
console.log('Server started 127.0.0.1:3000');
