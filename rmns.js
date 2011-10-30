var server = require('http').createServer(function(req, res){
  res.end('hello world');
});
var port = process.env.PORT || 8080;
server.listen(port);

var nowjs = require("now");
var everyone = nowjs.initialize(server);

everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};
