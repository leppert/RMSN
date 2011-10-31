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


app.get('/rmsn.js', function(req, res){
  res.sendfile(__dirname + '/client.js');
});

var redirect_url = false;
if(process.env.REDIRECT_URL){
  redirect_url = process.env.REDIRECT_URL;
  if(redirect_url.substring(0,4).toLowerCase() != 'http'){
    redirect_url = 'http://'+redirect_url;
  }
}
app.get('*', function(req, res){
  if(redirect_url){
    res.redirect(redirect_url);
  } else {
    res.sendfile(__dirname + '/index.html');
  }
});

//############//
// -- POST -- //
//############//
// Modeled after: http://pusher.com/docs/rest_api
app.post('apps/:app_id/channels/:channel_name/events', function(req, res){
  everyone.now.receiveMessage(req.body.event_name, req.body.message);
  res.send('true');
});
