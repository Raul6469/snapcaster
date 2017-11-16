var request = require('request')
require('dotenv').config();

module.exports = {
    wipStatus: function (pr) {
        var data = new Object()
        data.state = 'success'
        data.target_url = 'https://www.github.com/Raul6469'
        data.description = 'Ready to be merged'
        data.context = 'continuous-integration/snapcaster'
    
        var dataJson = JSON.stringify(data)
    
        var myHeaders = Object()
        myHeaders['User-Agent'] = 'Raul6469'
        myHeaders.Authorization = 'token ' + process.env.GITHUB_OAUTH_TOKEN
        
        if(process.env.NODE_ENV === 'test') {
            var apiurl = "localhost:5000"
        }
        else {
            var apiurl = pr.pull_request.head.repo.url + '/statuses/' + pr.pull_request.head.sha
        }
    
        request.post({url: apiurl, form: dataJson, headers: myHeaders}, function(err, httpResponse, body){
            if(process.env.NODE_ENV === 'dev') {
                console.log(body);
            }
        })  
    }  
}