'use client'

import React, { useContext, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Label } from '@/components/ui/label'

import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'

const VideoPage = () => {
  const [prompt, setPrompt] = useState('')
  const [videoData, setVideoData] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      console.log(prompt)
      const response = await axios.post('/api/generate-fal-video', {
        prompt: prompt,
      })

      console.log(response)
      console.log(response.data)
      if (response.status === 200) {
        setVideoData(response.data.videoUrl)
        setLoading(false)
        setPrompt('')
        saveVideoToDb(response.data.videoUrl)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      setPrompt('')
    }
  }
  const saveVideoToDb = async (videoUrl) => {
    try {
      let res = await axios.post('/api/save-fal-video-to-db', {
        videoUrl: videoUrl,
        prompt: prompt,
      })
      console.log(res)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col lg:flex-row gap-10 px-5 md:px-20 py-10">
      {/* Form Section */}
      <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="font-bold text-3xl md:text-4xl text-gray-50 text-center mb-6">
          Create New Flash
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Generate New Video</CardTitle>
            <CardDescription>
              Generate a 5-second video in one click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-7">
                {/* Prompt */}
                <div className="flex flex-col space-y-4">
                  <Label
                    htmlFor="content"
                    className="text-xl md:text-2xl font-medium text-gray-100"
                  >
                    Prompt
                  </Label>
                  <Textarea
                    placeholder="Type your Prompt..."
                    className="mt-4 p-3 text-base md:text-lg"
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit */}
              <CardFooter className="flex justify-between mt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-lg"
                >
                  {loading ? 'Generating...' : 'Generate'}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
        {videoData && (
          <video controls src={videoData} className="w-full mt-6 rounded-lg" />
        )}
      </div>

      {/* Documentation Section */}
      <div className="flex-1 bg-gray-900 text-gray-50 p-6 rounded-lg shadow-lg">
        <h2 className="font-bold text-3xl md:text-4xl mb-4">How It Works</h2>
        <p className="text-base md:text-lg leading-relaxed mb-4">
          This AI-powered tool allows you to generate short, **5-second videos**
          based on your input prompt. Simply provide a description of what you
          want the video to depict, and the AI will create a visually engaging
          output.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
          <li>
            Enter a **prompt** to describe the theme or content of your video.
          </li>
          <li>Click **Generate**, and the AI will process your input.</li>
          <li>Preview and download the generated **5-second video**.</li>
        </ul>
        <p className="mt-4 text-base md:text-lg">
          Use this tool to create eye-catching short clips for social media,
          presentations, or creative projects!
        </p>
      </div>
    </div>
  )
}

export default VideoPage

// import React from 'react'

// const VideoPage = () => {
//   return (
//     <div className="text-center flex items-center justify-center h-screen w-full font-bold text-3xl">
//       Not Now... Check Again
//     </div>
//   )
// }

// export default VideoPage
