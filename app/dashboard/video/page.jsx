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
    <div className="md:px-20 flex flex-col ml-9 gap-6">
      <h2 className="font-bold text-4xl text-gray-50 text-center">
        Create new
      </h2>
      <Card className="">
        <CardHeader>
          <CardTitle>Generate new video</CardTitle>
          <CardDescription>Generate new video in one click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-7">
              {/* Content */}
              <div className="flex flex-col space-y-4">
                <Label
                  htmlFor="content"
                  className="text-2xl font-medium text-gray-100"
                >
                  Prompt
                </Label>

                <Textarea
                  placeholder="Type your Prompt..."
                  className="mt-4 p-3 text-[18px]"
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
            </div>

            {/* Submit */}
            <CardFooter className="flex justify-between mt-6">
              <Button type="submit" disabled={loading}>
                Generate
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      {videoData && <video controls src={videoData} className="w-full" />}
    </div>
  )
}

export default VideoPage
