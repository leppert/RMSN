// Initialize libs
var fs      = require('fs'),
    express = require('express'),
    nowjs   = require('now'),
    Signature = require('signature');

// Config
var config = {
  port:         parseInt(process.env.PORT || 3000),
  redirect_url: process.env.REDIRECT_URL || false,
  use_sockets:  process.env.USE_SOCKETS !== 'false'
};
// make sure the redirect URL is a full URL with http://
if(config.redirect_url && redirect_url.substring(0,4).toLowerCase() != 'http'){
  config.redirect_url = 'http://'+config.redirect_url;
}
console.log('config', config);

// Helpers
var get_creds = function(key){
  var creds = process.env['KEY_'+key];
  if(!creds) return {};
  creds = creds.split(':');
  return {app_id: creds[0], secret: creds[1]};
};

//###############//
// -- Express -- //
//###############//
var app  = express.createServer(express.logger());
app.use(express.bodyParser()); // Parse the POST data when it comes in
app.listen(config.port, function(){ console.log("Listening on " + config.port); });

//##############//
// -- Now.js -- //
//##############//
var everyone = (config.use_sockets)
                ? nowjs.initialize(app)
                : nowjs.initialize(app, {socketio: {transports:['xhr-polling','jsonp-polling']}});

everyone.now.RMSN = {
  subscribe: function(channel_name){
    var creds = get_creds(this.now.rmsn.connection.key);
    if(creds.app_id){
      nowjs.getGroup(creds.app_id+'_'+channel_name).addUser(this.user.clientId);
      console.log('User added to channel', this.user.clientId, channel_name);
    } else {
      console.log('Invalid API key');
    }
  },
  unsubscribe: function(channel_name){
    var creds = get_creds(this.now.rmsn.connection.key);
    if(creds.app_id){
      nowjs.getGroup(creds.app_id+'_'+channel_name).removeUser(this.user.clientId);
      console.log('User removed from channel', this.user.clientId, channel_name);
    } else {
      console.log('Invalid API key');
    }
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

app.get('*', function(req, res){
  if(config.redirect_url){
    res.redirect(config.redirect_url);
  } else {
    if(req.query.app_id){
      // This is for test posts since we can't do the full auth in the client side JS
      // For security reasons, this is disabled when config.redirect_url exists
      nowjs
        .getGroup(req.query.app_id+'_'+req.query.channel_name)
        .now.rmsn.connection.emit('message', {'event':req.query.name, 'data':req.query.data, 'channel':req.query.channel_name});
    }
    // send the test page
    res.sendfile(__dirname + '/index.html');
  }
});

//############//
// -- POST -- //
//############//
// Modeled after: http://pusher.com/docs/rest_api
app.post('/apps/:app_id/channels/:channel_name/events', function(req, res){
  var sig_req = new Signature.Request(req.method, req.url.split('?')[0], req.query),
      token   = sig_req.authenticate(function(key){
        return new Signature.Token(key, get_creds(key).secret);
      });
  // TODO - account for no one connected
  nowjs
    .getGroup(req.params.app_id+'_'+req.params.channel_name)
    .now.rmsn.connection.emit('message', {'event':req.query.name, 'data':req.body, 'channel':req.params.channel_name});
  res.send('true');
});
