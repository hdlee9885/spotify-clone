import React, { useEffect, useState } from "react";
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

const spotifyApi = new SpotifyWebApi();

function App() {
  // const [token, setToken] = useState(null);
  const [{ user, token }, dispatch] = useDataLayerValue();

  // Run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    // console.log("I have a token", hash);

    if (_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      })

      // setToken(_token);

      spotifyApi.setAccessToken(_token);

      spotifyApi.getMe().then(user => {
        console.log(user);
        dispatch({
          type: 'SET_USER',
          user: user,
        })
      });
      
      spotifyApi.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        })
      });

      spotifyApi.getPlaylist("37i9dQZEVXcSaBc4guSZWX").then((response) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      })
    };
    console.log(user);

  }, []);

  return (
    <div className="App">
      {/* Spotify Logo */}
      {/* Login with Spotify button */}
      {
        token ? (
          <Player spotify={spotifyApi}/>
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
