const access_token = localStorage.getItem('access_token');
const user_id = "8vnif1sopntbz8ples7srgx88"
let type_value = document.getElementById("type-options").value

function update_button(){
    let type_options = document.getElementById("type-options")
    let top_container = document.getElementById("top_container")
    if(type_options.value === "artists"){
        top_container.innerHTML = ""
        getTopArtists()
    }
    else{
        top_container.innerHTML = ""
        getTopTracks()
    }

}

function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

function getTopArtists(){
    const xhttp = new XMLHttpRequest()
    const endpoint = `https://api.spotify.com/v1/me/top/artists`
    console.log(endpoint)
    console.log(type_value)
    xhttp.open('GET', endpoint, true)
    xhttp.setRequestHeader('Authorization', `Bearer ${access_token}`);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send()
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            let response = xhttp.response
            let parseresponse = JSON.parse(response)
            let top_artists = Object.entries(parseresponse.items)
            let top_artists_array = []
            top_artists.forEach(element => {
                let top_artist_item = {
                    top_artist_item_url: element[1].external_urls,
                    top_artist_followers: element[1].followers.total,
                    top_artist_genres: element[1].genres,
                    top_artist_image: element[1].images,
                    top_artist_name: element[1].name
                }
                top_artists_array.push(top_artist_item)
            });
            document.getElementById('top_container').innerHTML=`
            ${top_artists_array.map(artistTemplate).join('')}
            `;
            console.log(top_artists_array)
        }
    }
}

function getTopTracks(){
    let top_tracks_array = []
    const xhttp = new XMLHttpRequest()
    const endpoint = `https://api.spotify.com/v1/me/top/tracks?limit=5`
    console.log(endpoint)
    console.log(type_value)
    xhttp.open('GET', endpoint, true)
    xhttp.setRequestHeader('Authorization', `Bearer ${access_token}`);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send()
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            let response = xhttp.response
            let parseresponse = JSON.parse(response)
            let top_tracks = Object.entries(parseresponse.items)
            console.log(top_tracks)
            top_tracks.forEach(element => {
                let top_tracks_item = {
                    top_tracks_album: element[1].album.name,
                    top_tracks_artist: element[1].artists,
                    top_artist_image: element[1].album.images,
                    top_tracks_duration_ms: element[1].duration_ms,
                    top_tracks_name: element[1].name,
                }
                top_tracks_array.push(top_tracks_item)
            });
            console.log(top_tracks_array)
            document.getElementById('top_container').innerHTML=
            `${top_tracks_array.map(trackTemplate).join('')}`
        }
    }
}

function artistTemplate(top_details){
    let artist_url = Object.entries(top_details.top_artist_item_url)
    return `
        <div id='test' class='top_listing'>
            <div class="name_title">
                <h2>Artist Name: <u>${top_details.top_artist_name}</u></h4>
            </div>
            <h2>Artist Followers: ${numberWithCommas(top_details.top_artist_followers)}</h2>
            <h2>Artist Genres: ${top_details.top_artist_genres}</h2>
            <h2>Artist URL: <a href="${artist_url[0][1]}">${artist_url[0][1]}</a></h2>
            <h2>Artist Image: </h4>
            <div class="center_image">
                <img src="${top_details.top_artist_image[0].url}">
            </div>
            <br></br>
        </div>
    `

}

function trackTemplate(top_tracks){
    console.log(top_tracks)
    return `
        <div id='test' class='top_listing'>
            <div class="name_title">
                <h2>Track Name: <u>${top_tracks.top_tracks_name}</u></h4>
            </div>
            <h2>Track Album: ${top_tracks.top_tracks_album}</h2>
            <h2>Track Artists: ${top_tracks.top_tracks_artist[0].name}</h2>
            <h2>Track Duration: ${millisToMinutesAndSeconds(top_tracks.top_tracks_duration_ms)}
            <h2>Album Cover: </h4>
            <div>
                <img class='center_image' src="${top_tracks.top_artist_image[0].url}">
            </div>
        </div>
    `

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}