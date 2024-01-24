import { playListState } from '@/atoms/playlistAtom'
import React from 'react'
import { useRecoilState } from 'recoil'
import Song from './Song'

function Songs() {

    const playList = useRecoilState(playListState)[0]

  return (
    <div className="text-white pb-28  flex flex-col">
        {
            playList?.tracks?.items?.map((trackItem,i)=>(
                <Song key ={trackItem.track.id} order={i} track={trackItem.track}/>
            ))
        }
    </div>
  )
}

export default Songs