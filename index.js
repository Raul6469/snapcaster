require('dotenv').config();
var express = require('express');
var app = express();

var snapcaster = require('./src/process-post')

module.exports = app

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.end("GET received")
});

app.post('/api', function(request, response) {
  snapcaster.processPost(request, response)
});

app.listen(app.get('port'), function() {
  console.log('NODE_ENV: ' + process.env.NODE_ENV + '\n')
  if(process.env.NODE_ENV === 'dev') {
    console.log('Node app is running on port', app.get('port'));
  }
});
