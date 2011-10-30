var server = require('http').createServer(function(req, res){
  res.end('hello world');
});
server.listen(8080);

var nowjs = require("now");
var everyone = nowjs.initialize(server);

everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};
