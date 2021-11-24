let requestIncrement = {
  get: 0,
  post: 0,
  delete: 0,
  patch: 0
};


let stateKey = 'spotify_auth_state';

/**
 * * Obtains parameters from the hash of the URL
 * * @return Object
 * */
function getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
let userProfileSource = document.getElementById('user-profile-template').innerHTML,
userProfileTemplate = Handlebars.compile(userProfileSource),
userProfilePlaceholder = document.getElementById('user-profile');

let params = getHashParams();

let access_token = params.access_token,
state = params.state,
storedState = localStorage.getItem(stateKey);

if (access_token && (state == null || state !== storedState)) {
    alert('There was an error during the authentication');
    window.location.href='http://localhost:8888';
} else {
    localStorage.removeItem(stateKey);
    if (access_token) {
        localStorage.setItem('access_token', access_token);
            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                    userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                    console.log(response);
                    let paramJson = {
                        display_name: response.display_name,
                        email: response.email,
                        id: response.id,
                        type: response.type
                    }
                    try {
                        const xhttp = new XMLHttpRequest();
                        // const endpoint = 'https://u4-spotify-server.herokuapp.com/user';
                        const endpoint = 'http://localhost:8888/user';
                        xhttp.open('POST', endpoint, true);
                        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                        xhttp.send(JSON.stringify(paramJson));
                        xhttp.onreadystatechange = () => {
                            if (xhttp.readyState == 4 && xhttp.status == 200) {
                                const count = JSON.parse(xhttp.response);
                                requestIncrement.post = requestIncrement.post + count.body;
                                document.getElementById('request-post').innerHTML='POST: ' + requestIncrement.post;
                                console.log(requestIncrement.post);
                            }
                        }
                    } catch(err) {
                        console.log('An Error has occured: ' + err);
                    }
                    $('#login').hide();
                    $('#loggedin').show();
                }
            });
        } else {
            // window.location.href='http://localhost:8888';
            // render initial screen
            $('#login').show();
            $('#loggedin').hide();
        }
    }
