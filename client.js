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
