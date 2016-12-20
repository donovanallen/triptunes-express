var parser = require('body-parser');
var http = require('http');
var https = require('https');

var express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    SpotifyStrategy = require('../../lib/passport-spotify/index').Strategy;

var clientId = '1089e67fb5704f6d9ab8251ee5f1a20b'; // Your client id
var clientSecret = '7e6625f56ae0454d82a56245385ed0ed'; // Your secret
var redirect_uri = 'REDIRECT_URI'; // Your redirect uri

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SpotifyStrategy({
  clientID: clientId,
  clientSecret: clientSecret,
  callbackURL: 'http://localhost:4000/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      return done(null, profile);
    });
  }));

// ///////////////

var spotifyController = {

  get: (req, res) => {

    var options = {
      host : 'accounts.spotify.com',
      path : '/authorize/?client_id=' + clientId + '&response_type=code&redirect_uri=%2Fapi%2Ftrip%2F&scope=user-read-private%20user-read-email'
    }
    res.send(options + '++++')
  }
}

module.export = spotifyController
