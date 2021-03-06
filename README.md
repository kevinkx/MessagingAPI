# MessagingAPI
## API services for a Messaging Feature similar to how WhatsApp works.


## Features

- Add user and view all user.
- User can send a message to another user.
- User can list all messages in a conversation between them and another user.
- User can reply to a conversation they are involved with.
- User can list all their conversations (i fuser A has been chatting with user C & D, the list for A will shows A-C & A-D)
Bonus 4.a: each conversation is accompanied by its last message.
Bonus 4.b: each conversation is accompanied by unread count.


## Tech

MessagingAPI uses a number of open source projects to work properly:


- node.js - evented I/O for the backend
- Express - fast node.js network app framework
- MySQL - database storage
- body-parser



## Installation

- Install node.js and XAMPP
- Pull this repository
- Go to the directory
```sh
npm init --y
npm install --save mysql
npm install --save express
npm install body-parser --save 
```
- Run XAMPP (Apache and MySQL)
- Go to MySQL Admin
- Import messagingapidb.sql
- Run the app
```sh
node app.js
```

## API
You can test the API using Postman.
example url: http://127.0.0.1:3000/ (running in local environment)
### Method GET
##### Get User By Id
```sh
 http://127.0.0.1:3000/user/:userid
```

example request: 
```sh
http://127.0.0.1:3000/user/2
```

example response: 
```sh
{
    "id": 2,
    "username": "kevin"
}
```
##### Get All User
```sh
 http://127.0.0.1:3000/users
```

example request: 
```sh
http://127.0.0.1:3000/users/
```

example response: 
```sh
[
    {
        "id": 1,
        "username": "admin"
    },
    {
        "id": 8,
        "username": "budi"
    },
    {
        "id": 2,
        "username": "kevin"
    },
    {
        "id": 5,
        "username": "richard"
    },
    {
        "id": 6,
        "username": "ricky"
    },
    {
        "id": 7,
        "username": "sujana"
    }
]
```
##### Get All Message in Conversation
```sh
http://127.0.0.1:3000/message/:conversationid
```

example request: 
```sh
http://127.0.0.1:3000/message/1
```

example response: 
```sh
[
    {
        "username": "admin",
        "message": "hallo",
        "date": "2021-01-31T17:00:00.000Z"
    },
    {
        "username": "kevin",
        "message": "oi",
        "date": "2021-02-01T17:00:00.000Z"
    },
    {
        "username": "admin",
        "message": "ga jadi bro hehe",
        "date": "2021-02-26T12:56:42.000Z"
    },
    {
        "username": "kevin",
        "message": "\"wkwkwk\"",
        "date": "2021-02-26T15:57:34.000Z"
    },
    {
        "username": "kevin",
        "message": "\"wkwkwk\"",
        "date": "2021-02-26T16:00:03.000Z"
    },
    {
        "username": "kevin",
        "message": "\"wkwkwk\"",
        "date": "2021-02-26T16:00:36.000Z"
    },
    {
        "username": "kevin",
        "message": "\"wkwkwk\"",
        "date": "2021-02-26T16:01:34.000Z"
    },
    {
        "username": "kevin",
        "message": "\"wkwkwk\"",
        "date": "2021-02-26T16:02:49.000Z"
    },
    {
        "username": "kevin",
        "message": "\"wkwkwk\"",
        "date": "2021-02-26T16:03:30.000Z"
    },
    {
        "username": "kevin",
        "message": "\"wkwkwk\"",
        "date": "2021-02-26T16:03:35.000Z"
    },
    {
        "username": "kevin",
        "message": "\"wkwkwk\"",
        "date": "2021-02-26T16:03:36.000Z"
    },
    {
        "username": "kevin",
        "message": "\"wkwkwk\"",
        "date": "2021-02-26T16:03:36.000Z"
    }
]
```
##### Get All Message in Conversation With Flag Seen.
```sh
http://127.0.0.1:3000/message/detail/:conversationid/:userid
```

example request: 
```sh
http://127.0.0.1:3000/message/detail/5/6
```

example response: 
```sh
[
    {
        "username": "ricky",
        "message": "\"wkwkwk\"",
        "date": "2021-02-26T17:31:17.000Z",
        "seen": true
    },
    {
        "username": "ricky",
        "message": "\"woiii\"",
        "date": "2021-02-27T11:25:02.000Z",
        "seen": true
    },
    {
        "username": "ricky",
        "message": "\"haiiiiii\"",
        "date": "2021-02-27T11:25:09.000Z",
        "seen": true
    },
    {
        "username": "ricky",
        "message": "\"haiiiiii\"",
        "date": "2021-02-27T11:25:10.000Z",
        "seen": true
    },
    {
        "username": "ricky",
        "message": "\"haiiiiii\"",
        "date": "2021-02-27T11:25:10.000Z",
        "seen": true
    },
    {
        "username": "ricky",
        "message": "\"haiiiiii\"",
        "date": "2021-02-27T11:25:11.000Z",
        "seen": true
    },
    {
        "username": "ricky",
        "message": "\"haiiiiii\"",
        "date": "2021-02-27T11:25:12.000Z",
        "seen": true
    },
    {
        "username": "richard",
        "message": "\"ada apa bro\"",
        "date": "2021-02-27T11:58:54.000Z",
        "seen": false
    },
    {
        "username": "richard",
        "message": "kenapa ?",
        "date": "2021-02-27T12:04:33.000Z",
        "seen": false
    }
]
```
##### Get All User Conversation
```sh
 http://127.0.0.1:3000/user/message/:userid
```

example request: 
```sh
http://127.0.0.1:3000/user/message/2
```

example response: 
```sh
[
    {
        "id": 1,
        "username": "admin",
        "message": "\"wkwkwk\"",
        "date": "2021-02-26T16:03:36.000Z",
        "unread_count": 0
    },
    {
        "id": 3,
        "username": "richard",
        "message": "\"wkwkwk\"",
        "date": "2021-02-26T16:17:28.000Z",
        "unread_count": 0
    },
    {
        "id": 4,
        "username": "ricky",
        "message": "\"wkwkwk\"",
        "date": "2021-02-26T16:19:24.000Z",
        "unread_count": 0
    }
]
```
#### Method POST
##### Create User
```sh
 http://127.0.0.1:3000/user/create/
```

example CURL request: 
```
hhttp://127.0.0.1:3000/user/create/
 Content-Type: application/x-www-form-urlencoded
 Parameter: 
 username: budi123
```
example response: 
```sh
{
    "id": 9
}
```
##### Send Message
```sh
 http://127.0.0.1:3000/message/send/
```

example request: 
```sh
http://127.0.0.1:3000/message/send/
 Parameter: 
 receiverid: 1
 senderid: 2
 message: "wkwkwk"
```
example response: 
```sh
{
    "conversation_id": 1,
    "user_id": "2",
    "receiver_id": "1",
    "result": "message successfully sent"
}
```
#### Method PUT
##### Read Message
```sh
 http://127.0.0.1:3000/conversation/read/
```

example request: 
```sh
http://127.0.0.1:3000/conversation/read/
 Content-Type: application/x-www-form-urlencoded
 Parameter: 
 conversationid: 1
 userid: 1
```

example response: 
```sh
{
    "conversation_id": "1",
    "user_id": "1",
    "result": "message successfully read"
}
```

## Unit Testing

- Install Mocha and Chai
```sh
npm install mocha --save-dev 
npm install chai --save-dev 
npm install chai-http --save-dev 
```
- Run the unit test
```sh
npm test
```
dont forget, you must run XAMPP (MySQL) before run the test.