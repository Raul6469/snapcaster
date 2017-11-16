var request = require('request')
require('dotenv').config();

module.exports = {
    wipStatus: function (pr) {
        var webhook = new Object()
        webhook.body = new Object()

        webhook.body.state = 'success'
        webhook.body.description = 'Ready to be merged'
        webhook.body.context = 'continuous-integration/snapcaster'
        
        if(process.env.NODE_ENV === 'production') {
            webhook.url = pr.pull_request.head.repo.url + '/statuses/' + pr.pull_request.head.sha
        }
        else {
            webhook.url = 'localhost:5000'
        }

        return webhook
    }  
}