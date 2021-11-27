const express = require('express');
const PORT = process.env.PORT || 8888;
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

/* Route paths */
const users = require('./routes/users');
const artists = require('./routes/artists');
const genres = require('./routes/genres');
const playlists = require('./routes/playlists');
const songs = require('./routes/songs');

// connects express and index.html.
app.use(express.static(__dirname + '/public'))
.use(cors());

app.get("/", (req, res) => {
  res.send("Connected!");
});

/* Routes */
app.use("/users", users);
// app.use("/artists", artists);
// app.use("/genres", genres);
// app.use("/playlists", playlists);
// app.use("/songs", songs);

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log('Listening on port', PORT);
});
