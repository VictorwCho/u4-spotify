const endPointRoot = 'http://localhost:8888';
let requestIncrement = {
    get: 0,
    post: 0,
    delete: 0,
    patch: 0
  };

const access_token = localStorage.getItem('access_token');
let playlistDetails = [];
let trackItems = [];
let id = "";

function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  

function getUserId() {
    const xhttp = new XMLHttpRequest();
    const endpoint = '/callback/playlist/userId';
    xhttp.open('GET', endPointRoot + endpoint, true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
            const response = xhttp.response;
            parseResponse = JSON.parse(response);
            id = parseResponse.result;
            requestIncrement.get = parseResponse.count;
            console.log(id, requestIncrement.get);
        }
    };
;  
};

function getTracks(playlist_id) {
    const endPoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', endPoint, true);
    xhttp.setRequestHeader( 'Authorization', `Bearer ${access_token}` );
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
            const response = xhttp.response;
            items = JSON.parse(response);
            const getTrackItems = Object.entries(items.items);
            getTrackItems.forEach(element => {
                trackItems.push({
                  title: element[1].track.name,
                  artist: element[1].track.artists[0].name,
                  duration: element[1].track.duration_ms,
                  explicit: element[1].track.explicit
                });
            });
            document.getElementById('track-item').innerHTML=`
            ${trackItems.map(playlistItem).join("")}
            `
        };
    }
};

function getPlaylist() {
    const xhttp = new XMLHttpRequest();
    const endPoint = 'https://api.spotify.com/v1/me/playlists';
    xhttp.open('GET', endPoint, true);
    xhttp.setRequestHeader( 'Authorization', `Bearer ${access_token}` );
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
            const response = xhttp.response;
            let stuff = JSON.parse(response);
            const playlists = Object.entries(stuff.items);
            playlists.forEach(element => {
                playlistDetails.push({
                    playlistNumber: element[0],
                    playlistId: element[1].id,
                    name: element[1].name,
                    description: element[1].description,
                    owner: element[1].owner.display_name,
                })
            });
            document.getElementById('playlist').innerHTML=`
            ${playlistDetails.map(playlistTemplate).join('')}
            `;
        }
    }
};

function createPlaylist() {
    const user_id = id;
    const xhttp = new XMLHttpRequest();
    const endPoint = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    xhttp.open('POST', endPoint, true);
    xhttp.setRequestHeader( 'Accept', 'application/json' );
    xhttp.setRequestHeader( 'Authorization', `Bearer ${access_token}` );
    xhttp.setRequestHeader( 'Content-Type', 'application/json');
    body = {
        name: document.getElementById('playlist-name').value,
        description: document.getElementById('playlist-description').value,
        public: true
    }
    console.log(body);
    xhttp.send(JSON.stringify(body));
    xhttp.onreadystatechange = () => {
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
            const response = xhttp.response;
            console.log(response);
        }
    }
};

function playlistTemplate(playlist) {
    getTracks(playlist.playlistId);
    return `
        <div class='playlist-card'>
                <h2>Playlist: ${playlist.playlistNumber}</h2>
                <h4>Name: ${playlist.name}</h4>
                <h4>Description: ${playlist.description}</h4>
                <h4>Owner: ${playlist.owner}</h4>
            <div id="tracks">
                <div id='track-item'>
                </div>
            </div>
        </div>
    `
};

function playlistItem(trackItem) {
    let convertMs = millisToMinutesAndSeconds(trackItem.duration);
    return`
    <div class='playlist-track'>
        <h3>Tracks:</h3>
        <p>Track Name: ${trackItem.title}</p>
        <p>Track Artist: ${trackItem.artist}</p>
        <p>Track Duration: ${convertMs}</p>
        <p>Explicit: ${trackItem.explicit}</p>
    </div>
    `
}

getUserId();
getPlaylist();