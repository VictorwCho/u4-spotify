const express = require('express');
const mysql = require('mysql');
const PORT = process.env.PORT || 8888;
const app = express();
const cors = require('cors');


//creates an sql conneciton
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spotify',
});

// const connection = mysql.createConnection({
//     host: 'us-cdbr-east-04.cleardb.com',
//     user: 'b75dee2cacf594',
//     password: '7ff4a688',
//     database: 'heroku_5e67acb080746f5',
// });

// connects express and index.html.
app.use(express.static(__dirname + '/public'))
    .use(cors());

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


// adds playlist Ids into the database.
app.post('/callback/playlists/addplaylist', (req, res) => {
    let count = 1;
    let body = '';
  
    req.on('data', function (chunk) {
      if (chunk != null) {
        body += chunk;
      }
    });
  
    req.on('end', function () {
      let data = JSON.parse(body);
      let array = [];
      data.forEach(element => {
        array.push(Object.values(element));
      });
  
      const sqlQuery = 'CREATE TABLE IF NOT EXISTS playlists (playlistId VARCHAR(255), name VARCHAR(255), description VARCHAR(255), owner VARCHAR(255), UNIQUE (playlistId))';
      connection.query(sqlQuery, (sqlErr, sqlRes) => {
        if (sqlErr) {
          res.status(404).send('Error in the SQL Request');
          throw err;
        }
        console.log(sqlRes.message);
      });
  
      const sqlQuery1 = "INSERT IGNORE INTO playlists (playlistId, name, description, owner) VALUES ?";
      connection.query(sqlQuery1, [array], (sqlErr, sqlRes) => {
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

app.get('/callback/playlists/userId', ( req, res ) => {
    console.log('userId API was called');
    let count = + 1;
    connection.query('SELECT * FROM users', (err, result) => {
        if (err) {
            res.status(404).send('Error in request');
            throw err;
        }
        const body = {
            count: count,
            result: result[0].id,
        };
        res.status(200).send(body);
    })
});

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log('Listening on port', PORT);
});

