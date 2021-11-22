const express = require('express');
const mysql = require('mysql');
const PORT = process.env.PORT || 8888;
const app = express();
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const request = require('request');
const client_id = '9e55836a318b4d8f82f19477b0f603ed';
const client_secret = '2e728ff7871c48219b7b9d06e1e8e026';
// const redirect_uri = `http://localhost:${PORT}/callback/`;
const redirect_uri = 'https://victorcho.ca/COMP4537/termproject/spotify/V1/callback/';
const stateKey = 'spotify_auth_state';

//creates an sql conneciton
const connection = mysql.createConnection({
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'b75dee2cacf594',
  password: '7ff4a688',
  database: 'heroku_5e67acb080746f5',
});

// Creates a random string to be sent to spotify for an auth code exchange.
const generateRandomString = (length) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text = text + possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// // connects express and index.html.
// app.use(express.static(__dirname + '/public'))
// .use(cors())
// .use(cookieParser());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.get("/", (req, res) => {
  res.send("CONNECTED!");
});

// adds users into the database.
app.post('/user', (req, res) => {
  let count = 1;
  let body = '';

  req.on('data', function (chunk) {
    if (chunk != null) {
      body += chunk;
    }
  });
  req.on('end', function () {
    const sqlQuery = 'CREATE TABLE IF NOT EXISTS users (display_name VARCHAR(255),email VARCHAR(255),id VARCHAR(255),type VARCHAR(255), UNIQUE (email))';
    connection.query(sqlQuery, (sqlErr, sqlRes) => {
      if (sqlErr) {
        res.status(404).send('Error in the SQL Request');
        throw err;
      }
      console.log(sqlRes.message);
    });

    const sqlQuery1 = `INSERT IGNORE INTO users (display_name, email, id, type) VALUES ('${JSON.parse(body).display_name}', '${JSON.parse(body).email}', '${JSON.parse(body).id}', '${JSON.parse(body).type}')`;
    connection.query(sqlQuery1, (sqlErr, sqlRes) => {
      if (sqlErr) {
        res.status(404).send('Error in the SQL Request');
        throw err;
      }
      console.log(sqlRes.message);
    })
  });
  res.status(200).send({
    body: count});
});

// endpoint to intiate the log in procedure to redirect the user to a spotify login widget.
app.get('/login', (req, res) => {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  let scope = 'user-read-private user-read-email';
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

// creates a call back to check the auth code and requests refresh and access tokens
app.get('/callback', (req, res) => {
  // The app requests refresh and access tokens
  // After checking that state parameter
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch',
        })
    );
  } else {
    res.clearCookie(stateKey);
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64'),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token;
        let refresh_token = body.refresh_token;

        let options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true,
        };

        request.get(options, function (error, response, body) {
          console.log(body);
        });

        res.redirect(
          '/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token',
            })
        );
      }
    });
  }
});

//  Gets a refresh token after authorization has been confirmed this will help with SSO
app.get('/refresh_token', (req, res) => {
  let count = 1;
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64') },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    },
    json: true,
  };
  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      res.send({
        access_token: access_token,
        body: count
      });
    }
  });
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log('Listening on port', PORT);
});
