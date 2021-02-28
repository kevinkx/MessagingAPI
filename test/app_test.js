let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("express");
let server = require("../app")

//Assertion Style   
chai.should();

chai.use(chaiHttp);

describe('API', () => {
    //wrong PATH
    describe("GET /wrongpath", () => {
        it("It should NOT get anything, return 404", (done) => {
            chai.request(server)
                .get("/wrongpath")
                .end((err, response)  => {
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
                .end((err, response)  => {
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
                .get("/user/"+userId)
                .end((err, response)  => {
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
                .get("/user/"+userId)
                .end((err, response)  => {
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
                .get("/message/"+conversationId)
                .end((err, response)  => {
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
                .get("/message/"+conversationId)
                .end((err, response)  => {
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
                .get("/message/detail/"+conversationId+"/"+userId)
                .end((err, response)  => {
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
                .get("/message/detail/"+conversationId+"/"+userId)
                .end((err, response)  => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.be.have.property('error');
                done();
                })
        })
    })  
})
