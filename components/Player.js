import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom'
import useSongInfo from '@/pages/hooks/useSongInfo'
import useSpotify from '@/pages/hooks/useSpotify'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import {ArrowRightIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline"
import {BackwardIcon, PlayCircleIcon, PauseCircleIcon, ForwardIcon, PlayPauseIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid"
import { debounce } from 'lodash'



function Player() {
  const spotifyApi = useSpotify()
  const {data:session, status} = useSession()

  const[currentTrackId, setCurrentTrackId]=useRecoilState(currentTrackIdState)
  const[isPlaying, setIsPlaying]=useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)
  const songInfo = useSongInfo()
  console.log("song in player is ",songInfo)


  useEffect(() => {
   if(volume>0 && volume <100) {
    debouncedAdjusrVolume(volume)
   }
  }, [volume])
  
  const debouncedAdjusrVolume = useCallback(
    debounce((vol) => {
      spotifyApi.setVolume(vol).catch(err => {})
    },500),
    [],
  )
  

  const handleVolumeChange = (e) => {
    // debounce

    setVolume(Number(e.target.value))
  }


  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data)=> {
      if(data.body.is_playing){
        spotifyApi.pause();
        setIsPlaying(false)
      } else{
        spotifyApi.play();
        setIsPlaying(true)
      }
    })
  }

  const fetchCurrentSong = () => {
    if(!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {setCurrentTrackId(data.body?.item?.id)})

      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        setIsPlaying(data.body?.is_playing)
      })
    }
  }

  useEffect(() => {
    if(spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(50)
    }
  
  }, [currentTrackIdState, spotifyApi, session])
  
  

  return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
      <div className='flex items-center space-x-4'>
        {
          songInfo ? (
            <>
              <img className="hidden md:inline h-10 w-10" src={songInfo.album.images?.[0].url} alt="" />
              <div>
                <h3>{songInfo.name}</h3>
                <p>{songInfo.artists?.[0].name}</p>
              </div>
            </>
            
          ): null
        }
        {/*  */}
      </div>

      <div className='flex items-center justify-evenly'>
        <ArrowsRightLeftIcon className='button' />
        <BackwardIcon className="button"/>
        {
          isPlaying ? <PauseCircleIcon onClick={handlePlayPause} className='button w-10'/> : <PlayCircleIcon onClick={handlePlayPause} className='button h-10' />
        }
        
        <ForwardIcon onClick={()=>{spotifyApi.skipToNext()}} className="button"/>
        <SpeakerWaveIcon className='button' />
      </div>

      <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
        <SpeakerWaveIcon onClick={()=>{
          volume >= 10 && setVolume(volume-10)
        }} className='button transform rotate-180'/>
        <input className='w-14 md:w-28' onChange={handleVolumeChange} type='range' value={volume} min={0} max={100}/>
        <SpeakerWaveIcon onClick={()=>{
          volume <= 90 && setVolume(volume+10)
        }}  className='button'/>
      </div>
    </div>
  )
}

export default Player