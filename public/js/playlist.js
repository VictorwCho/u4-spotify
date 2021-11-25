const endPointRoot = 'http://localhost:8888';
let requestIncrement = {
    get: 0,
    post: 0,
    delete: 0,
    patch: 0
  };

const access_token = localStorage.getItem('access_token');
let id = "";

function getUserId() {
    const xhttp = new XMLHttpRequest();
    let endpoint = '/callback/playlist/userId';
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

function getPlaylist() {
    const xhttp = new XMLHttpRequest();
    let endPoint = 'https://api.spotify.com/v1/me/playlists';
    xhttp.open('GET', endPoint, true);
    xhttp.setRequestHeader( 'Authorization', `Bearer ${access_token}` );
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
            const response = xhttp.response;
            let stuff = JSON.parse(response);
            const playlists = Object.entries(stuff.items);
            console.log(playlists);
            let playlistDetails = [];
            playlists.forEach(element => {
                playlistDetails.push({
                    playlistNumber: element[0],
                    name: element[1].name,
                    description: element[1].description,
                    owner: element[1].owner.display_name,
                })
            });
            console.log(playlistDetails);
            
            document.getElementById('playlist').innerHTML=`
            ${playlistDetails.map(playlistTemplate).join('')}
            `;
        }
    }
};

function playlistTemplate(playlist) {
    return `
        <div class='playlist-card'>
        <h1>Playlist: ${playlist.playlistNumber}</h1>
        <h3>Name: ${playlist.name}</h3>
        <h3>Description: ${playlist.description}</h3>
        <h3>Owner: ${playlist.owner}</h3>
        <button onclick='deletePlaylist()'>Button</button>
        </div>
    `
};

getUserId();
getPlaylist();

function deletePlaylist() {
    const xhttp = ''
};


function createPlaylist() {
    const user_id = id;
    console.log(user_id);
    console.log(access_token);
    const xhttp = new XMLHttpRequest();
    let endPoint = `https://api.spotify.com/v1/users/${user_id}/playlists`;
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
// myPromise.then(getPlaylist());