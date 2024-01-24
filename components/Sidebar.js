import React, {useEffect, useState} from 'react'
 
import { HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon, PlusCircleIcon, RssIcon, HeartIcon } from "@heroicons/react/24/outline"
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '@/pages/hooks/useSpotify'
import { useRecoilState } from 'recoil';
import { playListIdState } from '@/atoms/playlistAtom';



function Sidebar() {

    const spotifyApi = useSpotify();
   const {data: session, status} =  useSession();
   const [playlists, setPlaylists] = useState([])

   const [playListId, setPlayListId] = useRecoilState(playListIdState)
   

   useEffect(() => {
     if(spotifyApi.getAccessToken()){
        spotifyApi.getUserPlaylists().then((data)=>{
            setPlaylists(data.body.items)
        })
     }
   
    //  return () => {
    //    second
    //  }
   }, [session, spotifyApi])

   
  return (

        <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36 ">
            <div className='space-y-4'>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5"  />
                    <p>Home</p>
                </button>
                {/* <button className="flex items-center space-x-2 hover:text-white" onClick={() =>{signOut()}}>
                    <HomeIcon className="h-5 w-5"  />
                    <p>Log out</p>
                </button> */}
                <button className="flex items-center space-x-2 hover:text-white">
                    <MagnifyingGlassIcon className="h-5 w-5"  />
                    <p>Search</p>
                </button> 
                
                <button className="flex items-center space-x-2 hover:text-white">
                    <BuildingLibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900" />

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5"  />
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5"  />
                    <p>Liked Songs</p>
                </button> 
                
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Your Episodes</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900" />
                {/* p */}
                {
                    playlists.map((playlist)=> {
                        return (<p onClick={()=>{setPlayListId(playlist.id)}} key={playlist.id} className="cursor-pointer hover:text-white">{playlist.name}</p>)
                    })
                }
{/* 
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p>
                <p className="cursor-pointer hover:text-white">title track...</p> */}

            </div>
            
        </div>

  )
}

export default Sidebar