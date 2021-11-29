const endPointRoot = 'http://localhost:8888';
const access_token = localStorage.getItem('access_token');
const user_id = "8vnif1sopntbz8ples7srgx88";

function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function getTracks() {
    let trackName = document.getElementById("song-name").value;
    const endPoint =
        `https://api.spotify.com/v1/search?query=${trackName}&offset=0&limit=20&type=track&market=US`;
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', endPoint, true);
    xhttp.setRequestHeader('Authorization', `Bearer ${access_token}`);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const response = xhttp.response;
            const jsonResponse = JSON.parse(response);
            let tracks = Object.entries(jsonResponse.tracks.items);
            console.log(tracks)
            let trackList = [];
            tracks.forEach(track => {
                let trackInfo = {
                    title: track[1].album.name,
                    artist: track[1].album.artists[0].name,
                    duration: track[1].duration_ms,
                    releaseDate: track[1].album.release_date,
                    trackUrl: track[1].external_urls.spotify,
                    images: track[1].album.images,
                };
                console.log(trackInfo.length);
                trackList.push(trackInfo);
            });
            document.getElementById('songs_container').innerHTML=`
            ${trackList.map(songsTemplate)}
            `;
            console.log(trackList);
        }
    }
}

function songsTemplate(trackInfo){
    console.log(trackInfo);
    return `
        <div id='tracks_holder' class="tracks_holder">
            <h4>Title: ${trackInfo.title}</h4>
            <h4>Artist: ${trackInfo.artist}</h4>
            <h4>Duration: ${millisToMinutesAndSeconds(trackInfo.duration)}</h4>
            <h4>Release Date: ${trackInfo.releaseDate}</h4>
            <h4>Track URL: <a href="${trackInfo.trackUrl}">${trackInfo.trackUrl}</a></h4>
            <img src="${trackInfo.images[0].url}">
            <br>
        </div>
    `
}