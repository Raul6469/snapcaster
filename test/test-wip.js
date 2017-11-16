process.env.NODE_ENV = 'test'

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

let fs = require('fs')
let content = fs.readFileSync('test/open-pr.json')
let webhook = JSON.parse(content)

let server = require('../index.js')

chai.use(chaiHttp);

describe('WIP pull request status', function () {
        it("should set a success status when PR is opened", (done) => {
            chai.request(server)
            .post('/api')
            .send(webhook)
            .end((err, res) => {
                res.should.have.status(200)
                res.text.should.equals('this is a pr')
                done()
            })
        })
    }
)