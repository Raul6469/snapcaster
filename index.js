var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.end("GET received")
});

app.post('/', function(request, response) {
  var res = new Object();
  res.message = "POST received"
  res.post = request.body
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(res))
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
