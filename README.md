Reading Message Server (RMSN)
=============================
Built for [Reading.am](http://reading.am).
Intended as a drop-in replacement for [Pusher](http://pusher.com),
specifically on [Heroku](http://www.heroku.com) but generally anywhere.
Kept afloat by [now.js](http://nowjs.com) on top of [node.js](http://nodejs.org)
and [Express](http://expressjs.com).

Application Server
------------------
###Configuration Variables

* `REDIRECT_URL` - When this is set, all non-nowjs GET requests will be
  redirected to the specified URL
* `USE_SOCKETS` true (default) | false - Disables websockets when set to
  `false`. This is useful when deploying to platforms that decline to
  support sockets, such as Heroku

###Credentials
Credentials are set through environmental variables using the following
format:

    KEY_{KEY}={APP_ID}:{SECRET}

For instance, an API credential for app `1234` with key `asdfjkl` and
secret `qwerty` would look like this:

    KEY_killerrandomkey=1234:supersecretphrase

You can set as many credentials as you like. Go wild.

Client Libraries
----------------
###Javascript
To include RMSN in your client side app, just add these three lines to
the `<head>` of your HTML, replacing `rmsn.example.com` with your RMSN server:

    <script src="http://rmsn.example.com/nowjs/now.js"></script>
    <script src="http://js.pusherapp.com/1.9/pusher.min.js"></script>
    <script src="http://rmsn.example.com/rmsn.js"></script>

RMSN piggybacks on the Pusher JS library so most, if not all, of your
existing code will work as-is.

####A note about now.ready();
It's important to note that you'll probably need to wrap your code with
`now.ready()`, much as you would with jQuery's `$(document).ready()`.
If you're seeing errors like `Object has no method 'subscribe'`,
it's because your code is being executed before nowjs has fully loaded.
Only code that accesses RMSN immediately on page load needs this wrapper
and `index.html` contains a good example.

###Support
RMSN is a work in progress. As such, there are bits of the Pusher API
that aren't yet supported, marked with ~~strikethroughs~~.

* Connection
    * Connecting
    * ~~Disconnecting~~
    * ~~Connection States~~
* Channels
    * Public Channels
    * ~~Private Channels~~
    * ~~Presence Channels~~
* Events (limited support)
* ~~Presence Events~~
* Global config
    * ~~Pusher.host~~
    * ~~Pusher.channel_auth_endpoint~~
    * Pusher.log

Don't see your feature supported? Send a pull request!

Publisher Libraries
-------------------
RMSN works with most of the standard [Pusher publisher libraries](http://pusher.com/docs/rest_libraries).
Simply specify your RMSN server in place of the Pusher's `api.pusherapp.com`
and the rest should take care of itself. Library specific are details below
with `rmsn.example.com` as an example RMSN server endpoint. You knew that.

###[Ruby](https://github.com/pusher/pusher-gem)
Configure the Ruby gem using the [URL method](https://github.com/pusher/pusher-gem/blob/master/lib/pusher.rb#L50):

    http://KEY:SECRET@rmsn.example.com/apps/APP_ID

An example configuration in `config/environments/development.rb` of a
Rails application might look like this:

    Pusher.url = 'http://killerrandomkey:supersecretphrase@rmsn.example.com/apps/1234'

If you're using Heroku, make sure to remove the Pusher add-on, otherwise
your configuration will more than likely be overwritten upon deployment.

###[PHP](https://github.com/squeeks/Pusher-PHP)
Specify your host like so:

    $pusher = new Pusher($key, $secret, $app_id, $debug, 'http://rmsn.example.com');

Deploying to Heroku
-------------------

Create your Heroku app on a Cedar stack

    heroku create --stack cedar

[Disable sockets](https://twitter.com/#!/NowJsTeam/status/115861105032708096)

    heroku config:add USE_SOCKETS=false

Set the `NODE_ENV` variable, needed by Express

  heroku config:add NODE_ENV=production

Add a credential as explained in **Credentials** above

    heroku config:add KEY_killerrandomkey=1234:supersecretphrase

Push the code to Heroku

    git push heroku master

Additional instructions for running Node.js applications on Heroku can
be [found here](http://devcenter.heroku.com/articles/node-js).

Save Everything
---------------
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
