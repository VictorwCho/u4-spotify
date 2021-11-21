const docsDiv = document.getElementById("docsDiv");

let paramJson = {
  "swagger": "2.0",
  "info": {
    "description": "This is our Spotify server.  You can find \nout more about Swagger at \n[http://swagger.io](http://swagger.io) or on \n[irc.freenode.net, #swagger](http://swagger.io/irc/).\n",
    "version": "1.0.0",
    "title": "Swagger Spotify API Documentation TeamU4",
    "termsOfService": "http://swagger.io/terms/",
    "contact": {
      "email": "apiteam@swagger.io"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "host": "virtserver.swaggerhub.com",
  "basePath": "/Pragmatism/COMP_4537_Term_Project/1.0.0",
  "tags": [
    {
      "name": "Spotify",
      "description": "Everything about your account",
      "externalDocs": {
        "description": "Find out more",
        "url": "https://accounts.spotify.com/"
      }
    },
    {
      "name": "artist",
      "description": "Operations about artist"
    },
    {
      "name": "playList",
      "description": "Operations about playList"
    },
    {
      "name": "genre",
      "description": "Operations about genre"
    },
    {
      "name": "album",
      "description": "Operations about album"
    },
    {
      "name": "user",
      "description": "Operations about user"
    }
  ],
  "schemes": [
    "https",
    "http"
  ],
  "paths":
  {
    "/callback": {
      "get": {
        "tags": [
          "Spotify"
        ],
        "summary": "checks auth code and requests refresh & access tokens",
        "description": "This before allowed access to account.",
        "operationId": "getCallback",
        "produces": [
          "application/json",
          "application/xml"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": " creates a call back to check the auth code and requests refresh and access tokens",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Spotify"
            }
          }
        ],
        "responses": {
          "default": {
            "description": "successful operation"
          }
        }
      }
    },
    "/refresh_token": {
      "get": {
        "tags": [
          "Spotify"
        ],
        "summary": "Gets refresh token after authorization is confirmed",
        "description": "This before allowed access to account.",
        "operationId": "getCallback",
        "produces": [
          "application/json",
          "application/xml"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Gets a refresh token after authorization has been confirmed this will help with SSO",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Spotify"
            }
          }
        ],
        "responses": {
          "default": {
            "description": "successful operation"
          }
        }
      }
    },
    "/artist": {
      "post": {
        "tags": [
          "artist"
        ],
        "summary": "Add an artist",
        "description": "This can only be done by the logged in user.",
        "operationId": "addArtist",
        "produces": [
          "application/json",
          "application/xml"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Add artist object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Artist"
            }
          }
        ],
        "responses": {
          "default": {
            "description": "successful operation"
          }
        }
      }
    },
    "/playList": {
      "post": {
        "tags": [
          "playList"
        ],
        "summary": "Add an playList",
        "description": "This can only be done by the logged in user.",
        "operationId": "addPlayList",
        "produces": [
          "application/json",
          "application/xml"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Add playList object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/PlayList"
            }
          }
        ],
        "responses": {
          "default": {
            "description": "successful operation"
          }
        }
      }
    },
    "/genre": {
      "post": {
        "tags": [
          "genre"
        ],
        "summary": "Add an genre",
        "description": "This can only be done by the logged in user.",
        "operationId": "addGenre",
        "produces": [
          "application/json",
          "application/xml"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Add genre object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Genre"
            }
          }
        ],
        "responses": {
          "default": {
            "description": "successful operation"
          }
        }
      }
    },
    "/album": {
      "post": {
        "tags": [
          "album"
        ],
        "summary": "Add an album",
        "description": "This can only be done by the logged in user.",
        "operationId": "addAlbum",
        "produces": [
          "application/json",
          "application/xml"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Add album object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Album"
            }
          }
        ],
        "responses": {
          "default": {
            "description": "successful operation"
          }
        }
      }
    },
    "/user": {
      "post": {
        "tags": [
          "user"
        ],
        "summary": "Create User",
        "description": "This can only be done by the logged in user.",
        "operationId": "createUser",
        "produces": [
          "application/json",
          "application/xml"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Created user object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        ],
        "responses": {
          "default": {
            "description": "successful operation"
          }
        }
      }
    },
    "/user/login": {
      "get": {
        "tags": [
          "user"
        ],
        "summary": "Logs user into the system",
        "operationId": "loginUser",
        "produces": [
          "application/json",
          "application/xml"
        ],
        "parameters": [
          {
            "name": "username",
            "in": "query",
            "description": "The user name for login",
            "required": true,
            "type": "string"
          },
          {
            "name": "password",
            "in": "query",
            "description": "The password for login in clear text",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "headers": {
              "X-Rate-Limit": {
                "type": "integer",
                "format": "int32",
                "description": "calls per hour allowed by the user"
              },
              "X-Expires-After": {
                "type": "string",
                "format": "date-time",
                "description": "date in UTC when token expires"
              }
            },
            "schema": {
              "type": "string"
            }
          },
          "400": {
            "description": "Invalid username/password supplied"
          }
        }
      }
    },
    "/user/logout": {
      "get": {
        "tags": [
          "user"
        ],
        "summary": "Logs out current logged in user session",
        "operationId": "logoutUser",
        "produces": [
          "application/json",
          "application/xml"
        ],
        "parameters": [],
        "responses": {
          "default": {
            "description": "successful operation"
          }
        }
      }
    },
    "/user/{username}": {
      "get": {
        "tags": [
          "user"
        ],
        "summary": "Get user by user name",
        "operationId": "getUserByName",
        "produces": [
          "application/json",
          "application/xml"
        ],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "description": "The name that needs to be fetched. Use user1 for testing.",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          "400": {
            "description": "Invalid username supplied"
          },
          "404": {
            "description": "User not found"
          }
        }
      },
      "put": {
        "tags": [
          "user"
        ],
        "summary": "Updated user",
        "description": "This can only be done by the logged in user.",
        "operationId": "updateUser",
        "produces": [
          "application/json",
          "application/xml"
        ],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "description": "name that need to be updated",
            "required": true,
            "type": "string"
          },
          {
            "in": "body",
            "name": "body",
            "description": "Updated user object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Invalid user supplied"
          },
          "404": {
            "description": "User not found"
          }
        }
      },
      "delete": {
        "tags": [
          "user"
        ],
        "summary": "Delete user",
        "description": "This can only be done by the logged in user.",
        "operationId": "deleteUser",
        "produces": [
          "application/json",
          "application/xml"
        ],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "description": "The name that needs to be deleted",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "400": {
            "description": "Invalid username supplied"
          },
          "404": {
            "description": "User not found"
          }
        }
      }
    }
  },
  "securityDefinitions": {
    "petstore_auth": {
      "type": "oauth2",
      "authorizationUrl": "http://petstore.swagger.io/oauth/dialog",
      "flow": "implicit",
      "scopes": {
        "write:pets": "modify pets in your account",
        "read:pets": "read your pets"
      }
    },
    "api_key": {
      "type": "apiKey",
      "name": "api_key",
      "in": "header"
    }
  },
  "definitions": {
    "Spotify": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "string"
        },
        "refresh_token": {
          "type": "string"
        },
        "grant_type": {
          "type": "string"
        }
      },
      "xml": {
        "name": "Spotify"
      }
    },
    "Artist": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "artistsGenre": {
          "type": "string",
          "description": "Artists Genre"
        }
      },
      "xml": {
        "name": "Artists"
      }
    },
    "PlayList": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "Name": {
          "type": "string"
        }
      },
      "xml": {
        "name": "PlayList"
      }
    },
    "Genre": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "Name": {
          "type": "string"
        }
      },
      "xml": {
        "name": "Genre"
      }
    },
    "Album": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "Name": {
          "type": "string"
        }
      },
      "xml": {
        "name": "Album"
      }
    },
    "User": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "username": {
          "type": "string"
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "userStatus": {
          "type": "integer",
          "format": "int32",
          "description": "User Status"
        }
      },
      "xml": {
        "name": "User"
      }
    },
    "Tag": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "name": {
          "type": "string"
        }
      },
      "xml": {
        "name": "Tag"
      }
    },
    "ApiResponse": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "type": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      }
    }
  },
  "externalDocs": {
    "description": "Find out more about Swagger",
    "url": "http://swagger.io"
  }
}


function (req, res, next) {

  try {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/documentation', true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify(paramJson));
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        docsDiv.innerHTML = res.parameters;
        console.log(res.parameters);
      };
    }
  } catch(err) {
    console.log('An Error has occured: ' + err);
  };

}
