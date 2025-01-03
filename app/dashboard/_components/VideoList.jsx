import React, { useState } from 'react'
import { Thumbnail } from '@remotion/player'
import RemotionVideoComponent from './RemotionVideoComponent'
import PlayerDialog from './PlayerDialog'
const VideoList = ({ videos }) => {
  console.log(videos)
  const [open, setOpen] = useState(false)
  const [videoId, setVideoId] = useState('')
  return (
    <div className="mt-10 grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video) => (
        <div
          className=" cursor-pointer hover:scale-110 transition-all"
          key={video.id}
          onClick={() => {
            setOpen(Date.now())
            setVideoId(video?.id)
          }}
        >
          <Thumbnail
            component={RemotionVideoComponent}
            compositionWidth={250}
            compositionHeight={350}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{ borderRadius: '10px' }}
            inputProps={{
              ...video,
              setDurationFrame: (v) => console.log(v),
            }}
          />
        </div>
      ))}
      <PlayerDialog playVideo={open} videoId={videoId} />
    </div>
  )
}

export default VideoList
