const access_token = localStorage.getItem('access_token');
const user_id = "8vnif1sopntbz8ples7srgx88"
let type_value = document.getElementById("type-options").value
let top_details = []

function update_button(){
    
    let type_options = document.getElementById("type-options")
    console.log(type_options.value)
    let option_button = document.getElementById("option_button")
    if(type_options.value === "artists"){
        option_button.innerHTML = "Get your top artists"
    }
    else{
        option_button.innerHTML = "Get your most played tracks"
    }

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
            top_artists.forEach(element => {
                let top_artist_item = {
                    top_artist_item_url: element[1].external_urls,
                    top_artist_followers: element[1].followers.total,
                    top_artist_genres: element[1].genres,
                    top_artist_image: element[1].images,
                    top_artist_name: element[1].name
                }
                top_details.push(top_artist_item)
            });
            document.getElementById('artist_container').innerHTML=
            `${top_details.map(artistTemplate).join('')}`
            console.log(top_details)
        }
    }
}


function artistTemplate(top_details){
    return `
        <h2>Artist URL: ${top_details.top_artist_item_url}</h2>
        <h4>Artist Followers: ${top_details.top_artist_followers}</h4>
        <h4>Artist Genres: ${top_details.top_artist_genres}</h4>
        <h4>Artist Image: </h4>
        <img src="${top_details.top_artist_image}>
        <h4>Artist Name: ${top_details.top_artist_name}</h4>
    `

}

