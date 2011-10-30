// Initialize libs
var fs      = require('fs'),
    express = require('express'),
    nowjs   = require('now');

//###############//
// -- Express -- //
//###############//
var app = express.createServer(express.logger());
// Parse the POST data when it comes in
app.use(express.bodyParser());
// Start listening for requests
var port = process.env.PORT || 3000;
app.listen(port, function(){ console.log("Listening on " + port); });

//##############//
// -- Now.js -- //
//##############//
var everyone = nowjs.initialize(app);

everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};

//###########//
// -- GET -- //
//###########//
app.get('/', function(request, response) {
  fs.readFile(__dirname + '/helloworld.html', 'utf8', function(err, text){
    response.send(text);
  });
});

//############//
// -- POST -- //
//############//
app.post('/', function(request, response){
  everyone.now.receiveMessage('test', request.body.message);
  response.send('true');
});
