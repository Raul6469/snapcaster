var wip = require('./wip-status')
var request = require('request')
require('dotenv').config();

module.exports = {
    processPost: function(request, response) {
        var body = request.body
        if((body.action === "opened" || body.action === "reopened") && "pull_request" in body) {
            var webhook = wip.wipStatus(body)
            response.end("this is a pr")
            postResponse(webhook)
        }
        else {
            response.end("not a pr")
        }
    }
};

function postResponse(webhook) {
    var myHeaders = Object()
    myHeaders['User-Agent'] = 'Raul6469'
    myHeaders.Authorization = 'token ' + process.env.GITHUB_OAUTH_TOKEN

    if(process.env.NODE_ENV === 'production') {
        request.post({url: webhook.url, form: webhook.body, headers: myHeaders}, function(err, httpResponse, body){
            if(process.env.NODE_ENV === 'dev') {
                console.log(body);
            }
        })
    }
}