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
		let query = "SELECT * from users WHERE id = "+ req.params.userid;
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

app.post("/conversation/read/",(req,res) => {
	console.log(req.body)
    let updateQuery = 'UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?';
    let query = mysql.format(updateQuery,["conversation_detail","unread_count",0,"conversation_id",req.body.conversationid,"user_id",req.body.userid]);
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
			res.send({error: err});
            return;
        }
        // rows updated
		res.send({conversation_id:req.body.conversationid, user_id:req.body.userid, result:"message successfully read"});
        console.log({conversation_id:req.body.conversationid, user_id:req.body.userid, result:"message successfully read"});
    });		
});


app.post("/message/send/", (req,res) => {
	console.log(req.body)
	pool.getConnection((err, connection) => {
			if(err) throw err;
			console.log('connected as id ' + connection.threadId);
			//check conversation is new or not.
			let getQuery =  'SELECT id FROM ?? WHERE (?? = ? and ?? = ?) or (?? = ? and ?? = ?)';
			let query =  mysql.format(getQuery,["conversations","user_id_1",req.body.senderid,"user_id_2",req.body.receiverid,"user_id_1",req.body.receiverid,"user_id_2",req.body.senderid,]);
			connection.query(query,  (err, rows) => {
            connection.release(); // return the connection to pool
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
			if(rows.length === 0){
				var conversationId
				//if new, create new conversation data.
				let insertQuery =  'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';
				let query =  mysql.format(insertQuery,["conversations","user_id_1","user_id_2","last_message_id",req.body.senderid,req.body.receiverid,0]);
				  pool.query(query,(err, response) => {
					if(err) {
						console.error(err);
						res.send({error: err});
						return;
					}
					// rows inserted
					console.log(response);
					conversationId = response.insertId;
					insertQuery =  'INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?),(?,?,?,?)';
					query =  mysql.format(insertQuery,["conversation_detail","conversation_id","user_id","chat_user_id","unread_count",response.insertId,req.body.senderid,req.body.receiverid,0,conversationId,req.body.receiverid,req.body.senderid,0]);
					pool.query(query,(err, response) => {
						if(err) {
							console.error(err);
							res.send({error: err});
							return;
						}
						// rows inserted
						console.log(response);
						//insert the message
						let insertQuery = 'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';
						let query = mysql.format(insertQuery,["messages","user_id","conversation_id","message",req.body.senderid,conversationId,req.body.message]);
						 pool.query(query,(err, response) => {
							if(err) {
								console.error(err);
								res.send({error: err});
								return;
							}
							// rows inserted
							//update last message
							let updateQuery = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
							let query = mysql.format(updateQuery,["conversations","last_message_id",response.insertId,"id",conversationId]);
							pool.query(query,(err, response) => {
								if(err) {
									console.error(err);
									res.send({error: err});
									return;
								}
									// rows updated
									//increment unread count to the receiver
									let updateQuery = 'UPDATE ?? SET ?? = ?? + ? WHERE ?? = ? AND ?? = ?';
									let query = mysql.format(updateQuery,["conversation_detail","unread_count","unread_count", 1,"conversation_id",conversationId,"user_id",req.body.receiverid]);
									pool.query(query,(err, response) => {
										if(err) {
											console.error(err);
											res.send({error: err});
											return;
										}
										// rows updated
										//remove all unread count in the sender
										let updateQuery = 'UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?';
										let query = mysql.format(updateQuery,["conversation_detail","unread_count",0,"conversation_id",conversationId,"user_id",req.body.senderid]);
										pool.query(query,(err, response) => {
											if(err) {
												console.error(err);
												res.send({error: err});
												return;
											}
											// rows updated
											res.send({conversation_id:conversationId, user_id:req.body.senderid, receiver_id:req.body.receiverid, result:"message successfully sent"});
											console.log({conversation_id:conversationId, user_id:req.body.senderid, receiver_id:req.body.receiverid, result:"message successfully sent"});
										});		
									});	
							});	
						});	
					});	
					});
			}else{
				//insert the message
				let insertQuery = 'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';
				let query = mysql.format(insertQuery,["messages","user_id","conversation_id","message",req.body.senderid,rows[0].id,req.body.message]);
				 pool.query(query,(err, response) => {
					if(err) {
						console.error(err);
						res.send({error: err});
						return;
					}
					// rows inserted
					//update last message
					let updateQuery = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
					let query = mysql.format(updateQuery,["conversations","last_message_id",response.insertId,"id",rows[0].id]);
					pool.query(query,(err, response) => {
						if(err) {
							console.error(err);
							res.send({error: err});
							return;
						}
							// rows updated
							//increment unread count to the receiver
							let updateQuery = 'UPDATE ?? SET ?? = ?? + ? WHERE ?? = ? AND ?? = ?';
							let query = mysql.format(updateQuery,["conversation_detail","unread_count","unread_count", 1,"conversation_id",rows[0].id,"user_id",req.body.receiverid]);
							pool.query(query,(err, response) => {
								if(err) {
									console.error(err);
									res.send({error: err});
									return;
								}
								// rows updated
								//remove all unread count in the sender
								let updateQuery = 'UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?';
								let query = mysql.format(updateQuery,["conversation_detail","unread_count",0,"conversation_id",rows[0].id,"user_id",req.body.senderid]);
								pool.query(query,(err, response) => {
									if(err) {
										console.error(err);
										res.send({error: err});
										return;
									}
									// rows updated
									res.send({conversation_id:rows[0].id, user_id:req.body.senderid, receiver_id:req.body.receiverid, result:"message successfully sent"});
									console.log({conversation_id:rows[0].id, user_id:req.body.senderid, receiver_id:req.body.receiverid, result:"message successfully sent"});
								});		
							});	
					});	
				});	
				}
			
        });
    });
	
});

app.get("/message/:conversationId",(req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
		console.log(req.params)
		let query = "SELECT username, message, date from users JOIN messages ON users.id = messages.user_id WHERE conversation_id = "+req.params.conversationId;
        connection.query(query, (err, rows) => {
            connection.release(); // return the connection to pool
            if(err) throw err;
            console.log('The conversations message are: \n', rows);
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
		let query = "SELECT conversations.id, username, message, date, unread_count from users JOIN conversation_detail ON users.id = conversation_detail.chat_user_id JOIN conversations ON conversation_detail.conversation_id = conversations.id JOIN messages ON conversations.last_message_id = messages.id WHERE conversation_detail.user_id = "+req.params.userID;
        connection.query(query, (err, rows) => {
            connection.release(); // return the connection to pool
            if(err) throw err;
            console.log('The conversation data are: \n', rows);
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
