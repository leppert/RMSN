var fs = require('fs');
var express = require('express');
var nowjs = require("now");

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  fs.readFile(__dirname + '/helloworld.html', 'utf8', function(err, text){
    response.send(text);
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

var everyone = nowjs.initialize(app);

everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};
