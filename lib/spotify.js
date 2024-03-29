import SpotifyWebApi from "spotify-web-api-node";



const scopes = [
    'user-read-email',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'streaming',
    'user-read-private',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-follow-read',
  ].join(',');

  const params = {
    scope:scopes
  }

  const queryParamString = new URLSearchParams(params)

  const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`

  const spotifyApi =new SpotifyWebApi({
    clientId : process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret : process.env.NEXT_PUBLIC_CLIENT_SECRET,
  })

  export default spotifyApi;
  export {LOGIN_URL}
