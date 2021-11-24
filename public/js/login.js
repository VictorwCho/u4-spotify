document.getElementById('login-button').addEventListener('click', function() {
    let client_id = '9e55836a318b4d8f82f19477b0f603ed'; // Your client id
    let redirect_uri = 'http://localhost:8888/callback/';
    // let redirect_uri = 'https://victorcho.ca/COMP4537/termproject/spotify/V1/'; // Your redirect uri
    let state = generateRandomString(16);
    localStorage.setItem(stateKey, state);
    let scope = 'user-read-private user-read-email';
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    console.log(url);
    window.location = url;
    
}, false);