Reading Message Server (RMSN)
=============================
Built for and currently powering [Reading.am](http://reading.am).
Intended as a drop-in replacement for [Pusher](http://pusher.com),
specifically on [Heroku](http://www.heroku.com) but generally anywhere.

Components
----------
###Application Server
Built using [Now.js](http://nowjs.com) on top of [Node.js](http://nodejs.org)

###Gem
Shamelessly stolen from [the Pusher gem](https://github.com/pusher/pusher-gem)

Configuration
-------------
There are two environment variables that need to be set:

* `SECRET` - the token that will be used to validate your requests
* `REDIRECT_URL` - the url that GET requests will be redirected to

Deploying to Heroku
-----------------
Heroku doesn't allow websockets at the moment so [deploying will require
opting out of that connection option](https://twitter.com/#!/NowJsTeam/status/115861105032708096) using the following command:

`nowjs.initialize('httpServer', {socketio: {transports:['xhr-polling','jsonp-polling']}});`

* Create your Heroku app `heroku create --stack cedar`
* Setup your NODE_ENV variable for Express `heroku config:add NODE_ENV=production`
* Push the code to master `git push heroku master`

RMSN
----
RMSN, the acronym, is an homage to [Shipping News](http://www.shippingnews.org),
a seminal band from the birthplace of post-rock – Louisville KY.
You've been done a disservice by your friends and your family if this is
the first mention of Shipping News that you've come across,
especially here in the age of real time messaging systems.

Shipping News' [Kyle Crabtree](http://history.louisvillehardcore.com/index.php?title=Kyle_Crabtree) is one of the most tasteful and nuanced
drummers in music today. His timing is, surely, even better than that 
of the humble Reading Message Server; we strive to replicate his timing.
It's critical that you listen to Shipping News while implementing RMSN.
In fact, the entire thing hinges on it.

* [Save Everything](http://grooveshark.com/#/album/Save+Everything/649951)
* [Very Soon, and in Pleasant Company](http://grooveshark.com/#/album/Very+Soon+And+In+Pleasant+Company/459292)
* [Flies the Fields](http://grooveshark.com/#/album/Flies+The+Fields/248240)
* [One Less Heartless to Fear](http://shippingnews.bandcamp.com/album/one-less-heartless-to-fear)
