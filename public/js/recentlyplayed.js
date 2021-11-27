const access_token = localStorage.getItem('access_token');
const user_id = "8vnif1sopntbz8ples7srgx88"
let top_details = []

function getTopItems(){

    let selected_option = document.getElementByName("selected-option")
    let button = document.createElement("button")
    if(selected_option === "Artist"){
        button.innerHTML = "Get your most played artists"
    }
    else{
        button.innerHTML = "Get your most played tracks"
    }
    let button_placement = document.getElementByName("get_button")
    button_placement.innerHTML = button
    const xhttp = new XMLHttpRequest()
    const endpoint = `https://api.spotify.com/v1/me/top/${selected_option}`
    xhttp.open('GET', endpoint, true)
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.setRequestHeader('Accept', 'application/json');
    xhttp.setRequestHeader('Authorization' `Bearer ${access_token}`)
    xhttp.send()
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            let response = xhttp.response
            let parseresponse = JSON.parse(response)
            console.log(parseresponse)
            // let top_items = Object.entries(parseresponse.items)
        }
    }

}