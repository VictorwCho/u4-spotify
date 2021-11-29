const endPointRoot = 'http://localhost:8888';
const access_token = localStorage.getItem('access_token');
const user_id = "8vnif1sopntbz8ples7srgx88";

let trackName = document.getElementById("song-name");

function getSavedTracks() {
    const endPoint = `https://api.spotify.com/v1/me/tracks`;
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', endPoint, true);
    xhttp.setRequestHeader('Authorization', `Bearer ${access_token}`);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const response = xhttp.response;
            let items = JSON.parse(response);
            let savedTracks = Object.entries(items.items);
            console.log(savedTracks);
            let savedTrackList = [];
            savedTracks.forEach((element) => {
                savedTrackList.push({
                    title: element[1].track.name,
                    artist: element[1].track.artists[0].name,
                    duration: element[1].track.duration_ms,
                    explicit: element[1].track.explicit,
                    uri: element[1].track.uri,
                });
            });
            document.getElementById('songs_container').innerHTML=`
            ${savedTrackList.map(songsTemplate).join('')}
            `;
            console.log(savedTrackList);
        }
    };
}


function songsTemplate(){


}