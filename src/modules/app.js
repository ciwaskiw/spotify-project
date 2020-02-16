const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path')
const fetch = require('node-fetch')
const b64 = require('js-base64').Base64
const AUTH_URL = 'https://accounts.spotify.com/authorize?'
const CLIENT_ID = 'e84e9f8d15e7406d8261dbc10b736c1d'
const CLIENT_SECRET = '43b612a7f5f24aca96f817f02d12ccf4'
const REDIRECT = 'http:%2F%2Flocalhost:5000%2F'

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  if (req.query.state === 'loggedIn') {
    console.log(req.query.code)
    //console.log( `curl -H \"Authorization: Basic ${b64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}\" -d grant_type=authorization_code -d code=AQCSZxsOsUndi2G7-PJWB-CI18Udh5NO9UG6UDc87ua5uz1NyKx3GR3_OxHlBI8sZzGmunvwKWxEaQadWYh47HjuZmX8CxcFBu64fkTfkv4FvTyHTH7IMPVhuUo9jOiMulpq7faDyZMR56Qd-3l1a87hM6IBO-JW1GTkcBdVmy5WpZ2IfKrTYKUrEOA -d redirect_uri=${REDIRECT} https://accounts.spotify.com/api/token`);
    fetch('https://accounts.spotify.com/api/token',
    {
      method: 'post',
      headers: {
        Authorization: `Basic ${b64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${REDIRECT}`
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      res.send(json)
    }).catch(err => {
      res.send(err)
    })
  } else {
    const authorizationUrl = AUTH_URL +
    `client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT}&state=loggedIn`
    res.redirect(authorizationUrl)
  }

});

module.exports = app;