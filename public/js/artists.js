async function ensureArtistData() {
  const access_token = localStorage.getItem('access_token');
  const artistName = document.getElementById('artist_search').value;
  const artistContainer = document.getElementById('artist_container');

  const artist = await searchArtist(access_token, artistName);
  const { id: artistId } = artist;

  const albums = await getAlbums(access_token, artistId);

  const trackPromises = albums.map(({ id: albumId }) => getTop5AlbumTracks(access_token, albumId));

  const trackResults = await Promise.all(trackPromises);

  const tracks = trackResults.reduce((prev, curr) => {
    return [...prev, ...curr];
  }, []);

  await addToPlaylist(access_token, tracks);

  // ADD STUFF TO DOM
  if (artist.images[2]) {
    artistContainer.innerHTML += `<img src="${artist.images[2].url}"/>`;
  } else if (artist.images[1]) {
    artistContainer.innerHTML += `<img src="${artist.images[1].url}"/>`;
  } else if (artist.images[0]) {
    artistContainer.innerHTML += `<img src="${artist.images[0].url}"/>`;
  } else {
    artistContainer.innerHTML += 'SORRY NO IMAGE';
  }

  artistContainer.innerHTML += `<br>` + `NAME: ${artist.name}`;
  artistContainer.innerHTML += `<br>` + 'GENRES: ' + artist.genres;
  artistContainer.innerHTML += `<br>` + 'FOLLOWERS: ' + artist.followers.total;
  artistContainer.innerHTML += `<br>` + 'POPULARITY: ' + artist.popularity;
  artistContainer.innerHTML += `<br>` + 'LINK: ' + artist.href;
  artistContainer.innerHTML += `<br>` + 'ID: ' + artist.id;
  artistContainer.innerHTML += `<br>` + `<a id = "anchors" href = " ${artist.external_urls.spotify}">Listen to ${artist.name}</a>`;
  artistContainer.innerHTML += `<br><br>`;
}

// FIRST GET ARTISTS,
// `https://api.spotify.com/v1/search?query=${artistName}&offset=0&limit=20&type=artist&market=US`
async function searchArtist(access_token, artistName) {
  const url = `https://api.spotify.com/v1/search?query=${artistName}&offset=0&limit=20&type=artist&market=US`;

  const requestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  };

  const {
    data: {
      artists: { items },
    },
  } = await axios.get(url, requestConfig);

  return items[0];
}

// THEN GET ALBUMS FOR ARTIST,
// `https://api.spotify.com/v1/artists/ARTIST_ID/albums?country=US&limit=5`
async function getAlbums(access_token, artistId) {
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums?country=US&limit=5`;

  const requestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  };

  const {
    data: { items },
  } = await axios.get(url, requestConfig);

  return items;
}

// THEN GET TRACKS FROM ALBUM,
// `https://api.spotify.com/v1/albums/ALBUM_ID/tracks?country=US&limit=5`
async function getTop5AlbumTracks(access_token, albumId) {
  const url = `https://api.spotify.com/v1/albums/${albumId}/tracks?country=US&limit=5`;

  const requestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  };

  const {
    data: { items },
  } = await axios.get(url, requestConfig);

  return items;
}

// THEN ADD TRACKS TO PLAYLIST.
// `https://api.spotify.com/v1/playlists/8vnif1sopntbz8ples7srgx88/tracks?uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M`

async function addToPlaylist(access_token, tracks) {
  const url = `https://api.spotify.com/v1/playlists/3dRZd09p8aOE8FPLvYUVlF/tracks`;

  const requestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  };

  await axios.post(
    url,
    {
      uris: tracks.map(({ id: trackId }) => {
        return `spotify:track:${trackId}`;
      }),
    },
    requestConfig
  );
}
