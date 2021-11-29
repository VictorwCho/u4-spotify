const endPointRoot = 'http://localhost:8888';
let requestIncrement = {
    get: 0,
    post: 0,
    delete: 0,
    patch: 0
  };

const access_token = localStorage.getItem('access_token');
let playlistDetails = [];
let id = "";

function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
  
function getUserId() {
    const xhttp = new XMLHttpRequest();
    const endpoint = '/callback/playlists/userId';
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
    }
};

function addPlaylistToDatabase() {
        const xhttp = new XMLHttpRequest();
        const endpoint = '/callback/playlists/addplaylist';
        xhttp.open('POST', endpoint, true);
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        let params = [];
        playlistDetails.forEach(element => 
            params.push({
            playlistId: element.playlistId,
            name: element.name,
            description: element.description,
            owner: element.owner
        }));
        xhttp.send(JSON.stringify(params));
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.response);
            }
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
                let pItem = {
                    playlistNumber: element[0],
                    playlistId: element[1].id,
                    name: element[1].name,
                    description: element[1].description,
                    owner: element[1].owner.display_name,
                }
                playlistDetails.push(pItem);
            });
            document.getElementById('playlist').innerHTML=`
            ${playlistDetails.map(playlistTemplate).join('')}
            `;
            addPlaylistToDatabase();
        }
    }
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
            let trackItems = [];
            getTrackItems.forEach(element => {
                trackItems.push({
                playlistId: playlist_id,
                title: element[1].track.name,
                artist: element[1].track.artists[0].name,
                duration: element[1].track.duration_ms,
                explicit: element[1].track.explicit,
                uri: element[1].track.uri,
                })
            });
            document.getElementById(`${playlist_id}`).innerHTML=`
            ${trackItems.map(playlistItem).join("")}
            `
        };
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
    xhttp.send(JSON.stringify(body));
    xhttp.onreadystatechange = () => {
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
            const response = xhttp.response;
            console.log(response);
        }
        location.reload();
    }
};

function deletePlaylist() {
    document.body.addEventListener('click', (e) => {
        if ( e.target.id === 'delete-playlist') {
            let id = e.path[2].getAttribute('data-value');
            let trackUri = e.path[1].getAttribute('id');
            const body = {
                tracks: [
                    {
                        "uri": trackUri,
                    }
                ]
            }
            const xhttp = new XMLHttpRequest();
            const endPoint = `https://api.spotify.com/v1/playlists/${id}/tracks`;
            xhttp.open('DELETE', endPoint, true);
            xhttp.setRequestHeader( 'Accept', 'application/json' );
            xhttp.setRequestHeader( 'Authorization', `Bearer ${access_token}` );
            xhttp.setRequestHeader( 'Content-Type', 'application/json');
            xhttp.send(JSON.stringify(body));
            xhttp.onreadystatechange = () => {
                if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
                    const response = xhttp.response;
                    console.log(response);
                };
            }
        } else {
            return;
        }
    });
};

function playlistTemplate(playlist) {
    getTracks(playlist.playlistId);
    return `
        <div class='playlist-card'>
                <h2>Playlist: ${playlist.playlistNumber}</h2>
                <h4>Name: ${playlist.name}</h4>
                <h4>Description: ${playlist.description}</h4>
                <h4>Owner: ${playlist.owner}</h4>
            <div id='${playlist.playlistId}' data-value='${playlist.playlistId}'>
                <div id='track-item'>
                </div>
            </div>
        </div>
    `
};

function playlistItem(trackItem) {
    let convertMs = millisToMinutesAndSeconds(trackItem.duration);
    return`
    <div id='${trackItem.uri}' class='playlist-track'>
        <h3>Tracks:</h3>
        <button id='delete-playlist' onClick='deletePlaylist()'>Delete</button>
        <p>Track Name: ${trackItem.title}</p>
        <p>Track Artist: ${trackItem.artist}</p>
        <p>Track Duration: ${convertMs}</p>
        <p>Explicit: ${trackItem.explicit}</p>
    </div>
    `
};

getUserId();
getPlaylist();