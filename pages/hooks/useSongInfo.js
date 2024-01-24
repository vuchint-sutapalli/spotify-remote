import React, { useState, useEffect } from 'react'
import useSpotify from './useSpotify'
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '@/atoms/songAtom'

function useSongInfo() {
    const spotifyApi = useSpotify()
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState)
    const [songInfo, setSongInfo] = useState(null)

    useEffect(() => {
      const fetchSongInfo = async () => {
        if(currentIdTrack) {

            let TracksArray = await spotifyApi.getTracks([currentIdTrack])

            TracksArray =TracksArray.body?.tracks
            setSongInfo(TracksArray[0])

        }
      }
      fetchSongInfo()
      
    }, [currentIdTrack, spotifyApi])
    

    return songInfo
}

export default useSongInfo