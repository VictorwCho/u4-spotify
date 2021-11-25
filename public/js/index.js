let requestIncrement = {
  get: 0,
  post: 0,
  delete: 0,
  patch: 0,
};

(function () {
  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  function getHashParams() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  let userProfileSource = document.getElementById('user-profile-template').innerHTML,
    userProfileTemplate = Handlebars.compile(userProfileSource),
    userProfilePlaceholder = document.getElementById('user-profile');

  let oauthSource = document.getElementById('oauth-template').innerHTML,
    oauthTemplate = Handlebars.compile(oauthSource),
    oauthPlaceholder = document.getElementById('oauth');

  let params = getHashParams();
  let access_token = params.access_token,
    refresh_token = params.refresh_token,
    error = params.error;

  if (error) {
    alert('There was an error during the authentication');
  } else {
    if (access_token) {
      // render oauth info
      oauthPlaceholder.innerHTML = oauthTemplate({
        access_token: access_token,
        refresh_token: refresh_token,
      });

      $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
        success: function (response) {
          userProfilePlaceholder.innerHTML = userProfileTemplate(response);
          // console.log(response);
          let paramJson = {
            display_name: response.display_name,
            email: response.email,
            id: response.id,
            type: response.type,
          };
          try {
            const xhttp = new XMLHttpRequest();
            xhttp.open('POST', '/user', true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhttp.send(JSON.stringify(paramJson));
            xhttp.onreadystatechange = () => {
              if (xhttp.readyState == 4 && xhttp.status == 200) {
                const count = JSON.parse(xhttp.response);
                requestIncrement.post = requestIncrement.post + count.body;
                document.getElementById('request-post').innerHTML = 'POST: ' + requestIncrement.post;
                console.log(requestIncrement.post);
              }
            };
          } catch (err) {
            console.log('An Error has occured: ' + err);
          }

          $('#login').hide();
          $('#loggedin').show();
        },
      });
    } else {
      // render initial screen
      $('#login').show();
      $('#loggedin').hide();
    }

    document.getElementById('obtain-new-token').addEventListener(
      'click',
      function () {
        $.ajax({
          url: '/refresh_token',
          data: {
            refresh_token: refresh_token,
          },
        }).done(function (data) {
          access_token = data.access_token;
          requestIncrement.get = requestIncrement.get + data.body;
          document.getElementById('request-get').innerHTML = 'GET: ' + requestIncrement.get;
          // console.log(requestIncrement.get);
          oauthPlaceholder.innerHTML = oauthTemplate({
            access_token: access_token,
            refresh_token: refresh_token,
          });
        });
      },
      false
    );
  }
})();
