var wip = require('./wip-status')

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

}