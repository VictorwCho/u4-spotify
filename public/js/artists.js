function searchArtist() {
  const access_token = localStorage.getItem('access_token');
  const user_id = '8vnif1sopntbz8ples7srgx88';
  const artistName = document.getElementById('artist_search').value;
  const artistContainer = document.getElementById('artist_container');

  const xhttp = new XMLHttpRequest();
  const endPoint = `https://api.spotify.com/v1/search?query=${artistName}&offset=0&limit=20&type=artist&market=US`;

  xhttp.open('GET', endPoint, true);

  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.setRequestHeader('Accept', 'application/json');
  xhttp.setRequestHeader('Authorization', `Bearer ${access_token}`);

  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const response = xhttp.response;
      // console.log(JSON.stringify(response));
      console.log(JSON.parse(response));
      let objectSearched = JSON.parse(response);
      console.log(objectSearched.artists.items[0].name);

      for (let i = 0; i < objectSearched.artists.items.length; i++) {
        if (objectSearched.artists.items[i].images[2]) {
          artistContainer.innerHTML += `<img src="${objectSearched.artists.items[i].images[2].url}"/>`;
        } else if (objectSearched.artists.items[i].images[1]) {
          artistContainer.innerHTML += `<img src="${objectSearched.artists.items[i].images[1].url}"/>`;
        } else if (objectSearched.artists.items[i].images[0]) {
          artistContainer.innerHTML += `<img src="${objectSearched.artists.items[i].images[0].url}"/>`;
        } else {
          artistContainer.innerHTML += 'SORRY NO IMAGE';
        }

        artistContainer.innerHTML += `<br>` + `NAME: ${objectSearched.artists.items[i].name}`;
        artistContainer.innerHTML += `<br>` + 'GENRES: ' + objectSearched.artists.items[i].genres;
        artistContainer.innerHTML += `<br>` + 'FOLLOWERS: ' + objectSearched.artists.items[i].followers.total;
        artistContainer.innerHTML += `<br>` + 'POPULARITY: ' + objectSearched.artists.items[i].popularity;
        artistContainer.innerHTML += `<br>` + 'LINK: ' + objectSearched.artists.items[i].href;
        artistContainer.innerHTML += `<br>` + 'ID: ' + objectSearched.artists.items[i].id;
        artistContainer.innerHTML +=
          `<br>` + `<a id = "anchors" href = " ${objectSearched.artists.items[i].external_urls.spotify}">Listen to ${objectSearched.artists.items[i].name}</a>`;
        artistContainer.innerHTML += `<br><br>`;
      }
    }
  };
}
