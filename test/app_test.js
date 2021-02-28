let chai = require("chai");
let chaiHttp = require("chai-http");
const {
  response
} = require("express");
let server = require("../app")

//Assertion Style   
chai.should();
chai.use(chaiHttp);

describe('API', () => {
  //wrong GET PATH
  describe("GET /wrongpath", () => {
    it("It should NOT get anything, return 404", (done) => {
      chai.request(server)
        .get("/wrongpath")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        })
    })
  })
  // Get all users
  describe("GET /users", () => {
    it("It should get all users data", (done) => {
      chai.request(server)
        .get("/users")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        })
    })
  })
  // Get users by id
  describe("GET /user/:id", () => {
    it("It should get specify user data", (done) => {
      const userId = 1;
      chai.request(server)
        .get("/user/" + userId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.have.property('id');
          response.body.should.be.have.property('username');
          done();
        })
    })
  })
  describe("GET /user/:id", () => {
    it("It should NOT get user data", (done) => {
      const userId = 0;
      chai.request(server)
        .get("/user/" + userId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.have.property('error');
          done();
        })
    })
  })
  //Get all message in Conversation
  describe("GET /message/:conversationid", () => {
    it("It should get all message in conversation", (done) => {
      const conversationId = 1;
      chai.request(server)
        .get("/message/" + conversationId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        })
    })
  })
  describe("GET /message/:conversationid", () => {
    it("It should NOT get any message data", (done) => {
      const conversationId = 0;
      chai.request(server)
        .get("/message/" + conversationId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.have.property('error');
          done();
        })
    })
  })
  //Get all message in Conversation
  describe("GET /message/detail/:conversationid/:userid", () => {
    it("It should get all message in conversation (with flag seen or unseen)", (done) => {
      const conversationId = 5;
      const userId = 6;
      chai.request(server)
        .get("/message/detail/" + conversationId + "/" + userId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        })
    })
  })
  describe("GET /message/detail/:conversationid/:userid", () => {
    it("It should NOT get any message data (with flag seen or unseen)", (done) => {
      const conversationId = 0;
      const userId = 0;
      chai.request(server)
        .get("/message/detail/" + conversationId + "/" + userId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.have.property('error');
          done();
        })
    })
  })
  //wrong POST PATH
  describe("POST /wrongpath", () => {
    it("It should NOT post anything, return 404", (done) => {
      chai.request(server)
        .post("/wrongpath")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        })
    })
  })
  //Create User
  describe("POST /user/create/", () => {
    it("It should success creating new user", (done) => {
      chai.request(server)
        .post("/user/create/")
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          username: randomString(10)
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.have.property('id');
          done();
        })
    })
  })
  //Create User with already created username
  describe("POST /user/create/", () => {
    it("It should error creating new user", (done) => {
      chai.request(server)
        .post("/user/create/")
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          username: 'admin'
        })
        .end((err, response) => {
          response.body.should.be.a("object");
          response.body.should.be.have.property('error');
          done();
        })
    })
  })
  //Create User without parameter
  describe("POST /user/create/", () => {
    it("It should error creating new user", (done) => {
      chai.request(server)
        .post("/user/create/")
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, response) => {
          response.body.should.be.a("object");
          response.body.should.be.have.property('error');
          done();
        })
    })
  })
  //Send message
  describe("POST /message/send/", () => {
    it("It should success creating new user", (done) => {
      chai.request(server)
        .post("/message/send/")
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          receiverid: 1,
          senderid: 2,
          message: randomString(10)
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.have.property('conversation_id');
          response.body.should.be.have.property('user_id');
          response.body.should.be.have.property('receiver_id');
          response.body.should.be.have.property('result');
          done();
        })
    })
  })
  //Send message without param message
  describe("POST /message/send/", () => {
    it("It should success creating new user", (done) => {
      chai.request(server)
        .post("/message/send/")
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          receiverid: 1,
          senderid: 2
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.have.property('error');
          done();
        })
    })
  })
  //Send message without param senderid
  describe("POST /message/send/", () => {
    it("It should success creating new user", (done) => {
      chai.request(server)
        .post("/message/send/")
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          receiverid: 1,
          message: randomString(10)
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.have.property('error');
          done();
        })
    })
  })
  //Send message without param receiverid
  describe("POST /message/send/", () => {
    it("It should success creating new user", (done) => {
      chai.request(server)
        .post("/message/send/")
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          senderid: 2,
          message: randomString(10)
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.have.property('error');
          done();
        })
    })
  })
  //wrong PUT PATH
  describe("PUT /wrongpath", () => {
    it("It should NOT put anything, return 404", (done) => {
      chai.request(server)
        .put("/wrongpath")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        })
    })
  })
  //Read message
  describe("PUT /conversation/read/", () => {
    it("It should success creating new user", (done) => {
      chai.request(server)
        .put("/conversation/read/")
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          conversationid: 1,
          userid: 1
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.have.property('conversation_id');
          response.body.should.be.have.property('user_id');
          response.body.should.be.have.property('result');
          done();
        })
    })
  })
})

function randomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}