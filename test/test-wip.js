require('dotenv').config();

process.env.NODE_ENV = 'test'

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

let fs = require('fs')

var contentOpen = fs.readFileSync('test/open-pr.json')
let webhookOpen = JSON.parse(contentOpen)

var contentReopen = fs.readFileSync('test/reopen-pr.json')
let webhookReopen = JSON.parse(contentReopen)

var contentPush = fs.readFileSync('test/push.json')
let webhookPush = JSON.parse(contentPush)

let server = require('../index.js')

let wip = require('../src/wip-status')

chai.use(chaiHttp);

describe('WIP pull request status', function () {
        it("should detect when a pull request is opened", (done) => {
            chai.request(server)
            .post('/api')
            .send(webhookOpen)
            .end((err, res) => {
                res.should.have.status(200)
                res.text.should.equals('this is a pr')
                done()
            })
        })

        it("should detect when a pull request is reopened", (done) => {
            chai.request(server)
            .post('/api')
            .send(webhookReopen)
            .end((err, res) => {
                res.should.have.status(200)
                res.text.should.equals('this is a pr')
                done()
            })
        })

        it("should detect when the webhook does not correspond to a pull request", (done) => {
            chai.request(server)
            .post('/api')
            .send(webhookPush)
            .end((err, res) => {
                res.should.have.status(200)
                res.text.should.equals('not a pr')
                done()
            })
        })

        it("should send a correct body", (done) => {
            var response = wip.wipStatus(webhookOpen.body)
            //console.log(response)
            response.should.have.property("body")

            response.body.should.have.property("state")
            response.body.should.have.property("description")
            response.body.should.have.property("context")

            response.body.state.should.equals("success")

            done()
        })

        it("should send it to the correct url", (done) => {
            process.env.NODE_ENV = 'production'

            var response = wip.wipStatus(webhookOpen)
            response.should.have.property("url")
            response.url.should.be.equals("https://api.github.com/repos/Raul6469/snapcaster/statuses/058a6f46acf879762b6b6d35f3c06f4ae4f884c5")
            
            process.env.NODE_ENV = 'test'

            done()
        })
    }
)