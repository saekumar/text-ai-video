import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

const FalVideos = () => {
  const { user } = useUser() // Get user details
  const [falVideos, setFalVideos] = useState([])
  const [open, setOpen] = useState(false)
  const [videoId, setVideoId] = useState(null)

  const getFalVideos = async () => {
    if (!user) {
      console.log('User not authenticated')
      return
    }

    try {
      const res = await axios.get('/api/gat-fal-videos', {
        params: {
          clerkId: user.id, // Pass clerkId dynamically
        },
      })
      console.log(res)
      setFalVideos(res.data)
    } catch (error) {
      console.log('Error fetching videos:', error)
    }
  }

  useEffect(() => {
    getFalVideos()
  }, [user]) // Fetch videos whenever user changes

  return (
    <div className="mt-10 grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
      {falVideos.map((video) => (
        <div
          key={video.id}
          className="cursor-pointer hover:scale-110 transition-all"
          onClick={() => {
            setOpen(true)
            setVideoId(video.id)
          }}
        >
          <video controls className="w-full h-full">
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-center mt-2 text-sm text-gray-300">
            {video.prompt.slice(0, 50)}...
          </p>
        </div>
      ))}

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-transparent p-5 rounded-lg shadow-lg">
            <video
              controls
              className="w-full h-auto"
              src={falVideos.find((vid) => vid.id === videoId)?.videoUrl}
            />
            <button
              onClick={() => setOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
            {/* <div className="text-gray-900">
              {falVideos.find((vid) => vid.id === videoId)?.prompt}
            </div> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default FalVideos
