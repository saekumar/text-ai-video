'use client'
import React, { createContext, useState } from 'react'

// Create the context
export const VideoDataContext = createContext()

// Create the provider component
export const VideoDataProvider = ({ children }) => {
  const [videoData, setVideoData] = useState({
    videoScript: [],
    audioUrl: '',
    captions: [],
    images: [],
  })

  const updateVideoData = (key, value) => {
    setVideoData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <VideoDataContext.Provider value={{ videoData, updateVideoData }}>
      {children}
    </VideoDataContext.Provider>
  )
}
