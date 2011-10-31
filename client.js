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

  RMSN.prototype.subscribe = now.subscribe;
  RMSN.prototype.unsubscribe = now.unsubscribe;

});
