import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
 import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playListIdState, playListState } from '@/atoms/playlistAtom';
import useSpotify from '@/pages/hooks/useSpotify';
import Songs from './Songs';

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-red-500",
    "from-green-500",
    "from-yellow-500",
    "from-pink-500"
]

function Center() {
    const {data: session} = useSession();

    const [color, setColor] = useState(null)

    const spotifyApi = useSpotify()

    const playListId = useRecoilValue(playListIdState)

    const [playlist,setPlayList] = useRecoilState(playListState)


    // console.log("session data", session)


    useEffect(() => {
      setColor(shuffle(colors).pop())


    
     
    }, [playListId])
    
    useEffect(() => {

      if(spotifyApi.getAccessToken()){
        spotifyApi.getPlaylist(playListId)
          .then((data) => {
            setPlayList(data.body)
          })
          .catch((err) => {
            console.log("something went wrong", err)
          })
      }
      
    }, [spotifyApi, playListId])
    
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide text-white" >

    <header className='absolute top-5 right-8'>
        <div onClick={signOut} className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
            <img className="w-6 h-6 rounded-full" src={session?.user?.image} alt="" />
            <h2>{session?.user?.name}</h2>
            <ChevronDownIcon className="h-5 w-5"  />
        </div>
    </header>
    <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8 text-white `}>
      <img className='h-44 w-44 shadow-2xl' src={playlist?.images?.[0]?.url} alt="" />
        <div>
          <p>PlAYLIST</p>
          <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold' >{playlist?.name}</h1>

        </div>
        <h1>eruer</h1>
    </section>

    <Songs/>

    </div>
  )
}

export default Center