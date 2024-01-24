import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom'
import { millisToMinutesAndSeconds } from '@/lib/time'
import useSpotify from '@/pages/hooks/useSpotify'
import React from 'react'
import { useRecoilState } from 'recoil'

function Song({order, track}) {

    const spotifyApi = useSpotify()

    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)


    const playSong = () => {
        setCurrentTrackId(track.id)
        setIsPlaying(true)
        spotifyApi.play({
            uris:[track.uri]
        })
    }
    
  
  return (
    <div onClick={playSong} className="grid grid-cols-2 text-gray-500  py-4 px-4 hover:bg-gray-900 cursor-pointer rounded-lg">
        <div className='flex space-x-4 items-center '>
            <p>{order+1}</p>
            <img className="h-10 w-10" src={track.album.images[0].url} alt="" />
            
            <div>
                <p className='w-36 lg:w-64 truncate text-white'>{track.name}</p>
                <p className='w-40'>{track.artists[0].name}</p>
            </div>
            
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0">
            <p className="w-40 hidden md:inline">{track.album.name}</p>
            <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
        </div>
    </div>
    
    
  )
}

export default Song