const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
const b64 = require('js-base64').Base64;
const SpotifyWebApi = require('spotify-web-api-node');

const AUTH_URL = 'https://accounts.spotify.com/authorize?'
const CLIENT_ID = 'e84e9f8d15e7406d8261dbc10b736c1d'
const CLIENT_SECRET = '43b612a7f5f24aca96f817f02d12ccf4'
const REDIRECT = 'http://localhost:5000/authed'

require('dotenv').config();

const app = express();

let spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT
})

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.get('/authed', (req, res) => {
    spotifyApi.authorizationCodeGrant(req.query.code)
      .then(data => {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);
  
        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
      },
      err => { 
        console.log("Something went wrong with auth")
        console.log(err) 
      })
      .then(() => {
        console.log('the access token is now ' + spotifyApi.getAccessToken())
        spotifyApi.getMySavedTracks({
          limit : 50,
          offset: 0
        })
        .then(tracks => {
          res.send(JSON.stringify(tracks.body.items.map(x => x.track.name)))
        }).catch(err => console.log(err)),
        err => { 
          console.log('Something went wrong with getting tracks!')
          console.log(err)
        }
      },
      err => {
        console.log('Something went wrong!')
        console.log(err)
      })
});

app.get('/', (req, res) => {
  const authorizeUrl = spotifyApi.createAuthorizeURL(['user-library-read'], 'loggedIn')
  console.log('redirecting to' + authorizeUrl)
  res.redirect(authorizeUrl)
})

module.exports = app;