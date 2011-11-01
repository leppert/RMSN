/*!
 * RMSN JavaScript Library v0.0.1
 * https://github.com/leppert/RMSN
 *
 * Copyright 2011, Greg Leppert
 * Released under the MIT licence.
 *
 * Shamelessly hijacking Pusher's API
 * http://pusher.com
 */


var RMSN = Pusher; //Alias RMSN to Pusher

now.ready(function(){

  RMSN.prototype.connect = function(){
    //this function intentionally left blank to prevent connection
    // TODO - create now.connections to track all connections
  };

  RMSN.prototype.subscribe = function(channel_name){
    now.RMSN.subscribe(channel_name);
    var self = this;
    var channel = this.channels.add(channel_name, this);
    self.send_event('pusher:subscribe', {
      channel: channel_name,
      auth: false, //data.auth,
      channel_data: false //data.channel_data
    });
    return channel;
  };

  RMSN.prototype.unsubscribe = function(channel_name){
    now.RMSN.unsubscribe(channel_name);
    this.channels.remove(channel_name);
    this.send_event('pusher:unsubscribe', {
      channel: channel_name
    });
  };

});
