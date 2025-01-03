import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import axios from 'axios'
import { Player } from '@remotion/player'
import RemotionVideoComponent from './RemotionVideoComponent'
import { useRouter } from 'next/navigation'

const PlayerDialog = ({ playVideo, videoId }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [resVideoData, setResVideoData] = useState(null)
  const [durationInFrame, setDurationFrame] = useState(1)
  useEffect(() => {
    if (videoId) {
      getVideoData(videoId)
      setOpen(!open)
    }
  }, [playVideo, videoId])

  const getVideoData = async (videoId) => {
    try {
      const res = await axios.get(`/api/get-video?videoId=${videoId}`)
      setResVideoData(res.data.videoData)
    } catch (error) {
      console.error('Error fetching video data:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-800 flex flex-col items-center justify-center gap-4 p-4">
        <DialogHeader>
          <DialogTitle className="text-gray-50">Preview Video</DialogTitle>
          <DialogDescription>Watch it and save it</DialogDescription>
        </DialogHeader>

        {resVideoData ? (
          <Player
            component={RemotionVideoComponent}
            durationInFrames={Number(Math.round(durationInFrame.toFixed(0)))}
            compositionWidth={300}
            compositionHeight={450}
            fps={30}
            controls={true}
            inputProps={{
              ...resVideoData,
              setDurationFrame: (frameValue) => setDurationFrame(frameValue),
            }}
          />
        ) : (
          <p className="text-gray-400">Loading video data...</p>
        )}

        <DialogFooter className="flex gap-4">
          <Button
            variant="ghost"
            onClick={() => {
              setOpen(false)
              router.push('/dashboard')
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PlayerDialog
