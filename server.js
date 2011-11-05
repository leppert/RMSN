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
var everyone = (!process.env.SOCKETS_OFF || process.env.SOCKETS_OFF.toLowerCase() == 'false')
                  ? nowjs.initialize(app)
                  : nowjs.initialize(app, {socketio: {transports:['xhr-polling','jsonp-polling']}});

everyone.now.RMSN = {
  subscribe: function(channel_name){
    nowjs.getGroup(channel_name).addUser(this.user.clientId);
    console.log('User added to channel', this.user.clientId, channel_name);
  },
  unsubscribe: function(channel_name){
    nowjs.getGroup(channel_name).removeUser(this.user.clientId);
    console.log('User removed from channel', this.user.clientId, channel_name);
  }
};

//###########//
// -- GET -- //
//###########//
// TODO - account for channel stats requests. These follow the same URL
// structure as the event publishing POST requests but use GET instead
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
  if(redirect_url) res.redirect(redirect_url);
  else res.sendfile(__dirname + '/index.html');
});

//############//
// -- POST -- //
//############//
// Modeled after: http://pusher.com/docs/rest_api
app.post('/apps/:app_id/channels/:channel_name/events', function(req, res){
  nowjs.getGroup(req.params.channel_name).now.rmsn.connection.emit('message', {'event':req.query.name, 'data':req.body, 'channel':req.params.channel_name});
  res.send('true');
});
