/*!
 * RMSN JavaScript Library v0.0.1
 * https://github.com/leppert/RMSN
 *
 * Copyright 2011, Greg Leppert
 * Released under the MIT licence.
 *
 * Shamelessly modeled after Pusher's API
 * http://pusher.com
 */

var RMSN = function(app_key, options){
    },
    Pusher = RMSN; //Alias RMSN to Pusher

now.ready(function(){

  RMSN.prototype = {
    channel: function(name) {
    },

    connect: function() {
    },

    disconnect: function() {
    },

    bind: function(event_name, callback) {
    },

    bind_all: function(callback) {
    },

    subscribeAll: function() {
    },

    subscribe: now.subscribe,

    unsubscribe: now.unsubscribe,

    send_event: function(event_name, data, channel) {
    },

    send_local_event: function(event_name, event_data, channel_name) {
    }
  };

  ;(function() {
  /* Abstract event binding
  Example:

      var MyEventEmitter = function(){};
      MyEventEmitter.prototype = new Pusher.EventsDispatcher;

      var emitter = new MyEventEmitter();

      // Bind to single event
      emitter.bind('foo_event', function(data){ alert(data)} );

      // Bind to all
      emitter.bind_all(function(event_name, data){ alert(data) });

  --------------------------------------------------------*/
    function EventsDispatcher() {
      this.callbacks = {};
      this.global_callbacks = [];
    }

    EventsDispatcher.prototype.bind = function(event_name, callback) {
      this.callbacks[event_name] = this.callbacks[event_name] || [];
      this.callbacks[event_name].push(callback);
      return this;// chainable
    };

    EventsDispatcher.prototype.emit = function(event_name, data) {
      this.dispatch_global_callbacks(event_name, data);
      this.dispatch(event_name, data);
      return this;
    };

    EventsDispatcher.prototype.bind_all = function(callback) {
      this.global_callbacks.push(callback);
      return this;
    };

    EventsDispatcher.prototype.dispatch = function(event_name, event_data) {
      var callbacks = this.callbacks[event_name];

      if (callbacks) {
        for (var i = 0; i < callbacks.length; i++) {
          callbacks[i](event_data);
        }
      } else {
        // Log is un-necessary in case of global channel or connection object
        if (!(this.global || this instanceof Pusher.Connection || this instanceof Pusher.Machine)) {
          Pusher.debug('No callbacks for ' + event_name, event_data);
        }
      }
    };

    EventsDispatcher.prototype.dispatch_global_callbacks = function(event_name, data) {
      for (var i = 0; i < this.global_callbacks.length; i++) {
        this.global_callbacks[i](event_name, data);
      }
    };

    EventsDispatcher.prototype.dispatch_with_all = function(event_name, data) {
      this.dispatch(event_name, data);
      this.dispatch_global_callbacks(event_name, data);
    };

    this.Pusher.EventsDispatcher = EventsDispatcher;
  }).call(this);

  RMSN.Channels = function() {
    this.channels = {};
  };

  RMSN.Channels.prototype = {
    add: function(channel_name, pusher) {
    },

    find: function(channel_name) {
    },

    remove: function(channel_name) {
    },

    disconnect: function () {
    }
  };

  RMSN.Channel = function(channel_name, pusher) {
    Pusher.EventsDispatcher.call(this);
  };

  RMSN.Channel.prototype = {
    disconnect: function(){
    },

    acknowledge_subscription: function(data){
    },

    is_private: function(){
    },

    is_presence: function(){
    },

    authorize: function(pusher, callback){
    },

    trigger: function(event, data) {
    }
  };

  RMSN.Channel.PrivateChannel = {
    is_private: function(){
    },

    authorize: function(pusher, callback){
    }
  };

  RMSN.Channel.PresenceChannel = {

    init: function(){
    },

    disconnect: function(){
    },

    acknowledge_subscription: function(sub_data){
    },

    is_presence: function(){
    },

    members: {
      _members_map: {},
      count: 0,

      each: function(callback) {
      },

      add: function(id, info) {
      },

      remove: function(user_id) {

      },

      get: function(user_id) {
      },

      clear: function() {
      }
    }
  };

});
