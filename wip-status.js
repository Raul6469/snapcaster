var request = require('request')

module.exports = {
    wipStatus: function(pr) {
        request({
            har: {
              url: pr.url + '/statuses/' + pr.pull_request.head.sha,
              method: 'POST',
              headers: [
                {
                  name: 'content-type',
                  value: 'application/application-json'
                }
              ],
              postData: {
                mimeType: 'application/applicatio-json',
                params: [
                  {
                    "state": "success",
                    "description": "Ready to be merged",
                    "context": "continuous-integration/snapcaster"
                  }
                ]
              }
            }
          })  
    }
};