import spotifyApi from '@/lib/spotify';
import { signIn, useSession } from 'next-auth/react'
import React, {useEffect} from 'react'

function useSpotify() {

    const {data: session, status} = useSession();
    useEffect(() => {
      if(session) {
        // if refresh token in nextauth fails
        if(session.error === "RefreshTokenError") {
            signIn();
        }

        spotifyApi.setAccessToken(session.user.accessToken)
      }
    
     
    }, [session])
    
  return spotifyApi;
}

export default useSpotify