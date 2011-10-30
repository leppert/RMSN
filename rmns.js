// Initialize libs
var fs      = require('fs'),
    express = require('express'),
    nowjs   = require('now');

//###############//
// -- Express -- //
//###############//
var app  = express.createServer(express.logger()),
    port = process.env.PORT || 3000;
app.use(express.bodyParser()); // Parse the POST data when it comes in
app.listen(port, function(){ console.log("Listening on " + port); });

//##############//
// -- Now.js -- //
//##############//
var everyone = nowjs.initialize(app);

//###########//
// -- GET -- //
//###########//
var redirect_url = process.env.REDIRECT_URL || false;
app.get('/', function(request, response){
  if(redirect_url){
    response.redirect(redirect_url);
  } else {
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, text){
      response.send(text);
    });
  }
});

//############//
// -- POST -- //
//############//
app.post('/', function(request, response){
  everyone.now.receiveMessage(request.body.event_name, request.body.message);
  response.send('true');
});
