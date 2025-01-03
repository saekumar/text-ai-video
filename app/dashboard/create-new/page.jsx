'use client'
import db from '../../../lib/prisma'
import React, { useContext, useEffect, useState } from 'react'
import LoadingComponent from './_components/customLoading'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import RemotionVideoComponent from '../_components/RemotionVideoComponent'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import PlayerDialog from '../_components/PlayerDialog'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { toast } from 'sonner'
import { VideoDataContext } from '@/app/_context/videoDataContext'
import { useUser } from '@clerk/nextjs'

const contentOptions = ['Custom Prompt', 'Scary Tale', 'Jungle Book']
const styleOptions = ['Realistic', 'Cartoon', 'Comic', 'Water Color']

const CreateNew = () => {
  const { user } = useUser()
  const userId = user?.id
  console.log('User:', user)
  console.log('User ID:', userId)

  const { videoData, updateVideoData } = useContext(VideoDataContext)
  const [formData, setFormData] = useState({
    content: '',
    customPrompt: '',
    style: '',
    duration: '',
  })

  const [loading, setLoading] = useState(false)
  const [videoScript, setVideoScript] = useState([])
  const [audioUrl, setAudioUrl] = useState('')
  const [captions, setCaptions] = useState()

  const [images, setImages] = useState([])

  const [playVideo, setPlayVideo] = useState(false)
  const [videoId, setVideoId] = useState('')

  // Effect to save video data when videoData and userId are available
  const isVideoDataValid = () => {
    if (Object.keys(videoData).length !== 4) return false
    return Object.values(videoData).every((value) => value && value.length)
  }

  useEffect(() => {
    if (isVideoDataValid()) {
      saveVideoData()
    }
  }, [videoData])

  // Effect to generate audio file when videoScript is available
  useEffect(() => {
    if (videoScript.length > 0) {
      console.log('Video script available, generating audio file.')
      GenerateAudioFile()
    }
  }, [videoScript])

  // Effect to generate transcript when audioUrl is available
  useEffect(() => {
    if (audioUrl.length > 0) {
      console.log('Audio URL available, generating transcript.')
      generateTranscript(audioUrl)
    }
  }, [audioUrl])

  // Effect to generate images when videoScript is available
  useEffect(() => {
    if (videoScript.length > 0) {
      console.log('Video script available, generating images.')
      generateImages()
    }
  }, [videoScript])

  const saveVideoData = async () => {
    console.log('Saving video data for userId:', userId)
    if (!userId) {
      toast.error('User not authenticated.')
      return
    }

    const clerkId = userId
    const { videoScript, audioUrl, captions, images } = videoData

    try {
      const response = await axios.post('/api/save-video-data', {
        clerkId,
        videoScript: videoScript,
        audioUrl,
        captions: captions,
        images: images,
      })

      if (response.status !== 200) {
        throw new Error('Failed to save video data.')
      }

      console.log('Saved video data:', response.data.savedVideoData)
      setVideoId(response.data.savedVideoData.id)
      setPlayVideo(true)
      toast.success('Video data saved successfully!')

      setFormData({
        content: '',
        customPrompt: '',
        duration: '',
        style: '',
      })
    } catch (error) {
      console.error('Error saving video data:', error.message)
      toast.error('An error occurred while saving the video data.')
    }
  }

  const handleContentChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
      customPrompt: value !== 'Custom Prompt' ? '' : prev.customPrompt, // Clear custom prompt if not selected
    }))
  }

  const handleStyleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      style: value,
    }))
  }

  const handleDurationChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      duration: value,
    }))
  }

  const handleCustomPromptChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      customPrompt: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!userId) {
      toast.error('User not authenticated.')
      return
    }

    setLoading(true)
    await GetVideoScript(formData)
    setLoading(false)

    setFormData({
      customPrompt: '',
      content: '',
      style: '',
      duration: '',
    })
  }

  const GetVideoScript = async (formData) => {
    let content =
      formData.content === '' ? formData.customPrompt : formData.content
    const prompt =
      'Create a script to generate a ' +
      formData.duration +
      '-second video on the topic of an ' +
      content +
      '. Provide a JSON response with two fields: imagePrompt for detailed, ' +
      formData.style +
      " AI-generated image descriptions corresponding to each scene, and contentText for the scene's narrative content."

    console.log('Prompt:', prompt)

    try {
      const response = await axios.post('/api/get-video-script', { prompt })

      if (response.data.scenes) {
        setVideoScript(response.data.scenes)
        updateVideoData('videoScript', response.data.scenes)
      } else {
        console.error('No scenes field in response:', response.data)
        toast.error('Failed to generate video script.')
      }
    } catch (error) {
      console.error(
        'Error fetching video script:',
        error.response?.data || error.message
      )
      toast.error('An error occurred while fetching the video script.')
    }
  }

  const GenerateAudioFile = async () => {
    try {
      let script = ''

      // Check if `videoScript` is available
      if (typeof videoScript !== 'undefined' && Array.isArray(videoScript)) {
        videoScript.forEach((item) => {
          script += item.contentText + ' '
        })
      } else {
        console.error('videoScript is not defined or is not an array.')
        return
      }

      const response = await axios.post('/api/generate-audio', { script })

      if (response.data.status === 200) {
        setAudioUrl(response.data.url)
        updateVideoData('audioUrl', response.data.url)
      } else {
        toast.error(`${response.data.message}`)
      }
    } catch (error) {
      console.error('Error generating audio file:', error)
      toast.error('Something went wrong while generating the audio file.')
    }
  }

  const generateTranscript = async (audioUrl) => {
    try {
      let res = await axios.post('/api/generate-caption', { audioUrl })

      if (res.status === 200) {
        setCaptions(res.data.words)
        updateVideoData('captions', res.data.words)
      }
    } catch (error) {
      console.error('Error generating transcript:', error)
      toast.error('Something went wrong while generating the transcript.')
    }
  }

  const generateImages = async () => {
    try {
      let images = []

      // Use `Promise.all` to ensure all asynchronous calls complete before proceeding
      const imagePromises = videoScript.map(async (script) => {
        const res = await axios.post('/api/generate-image', {
          prompt: script.imagePrompt,
        })
        if (res.status === 200) {
          return res.data.imageUrl // Return the URL as a string
        } else {
          toast.error('Error generating images', 404)
          return null
        }
      })

      // Resolve all promises and filter out any null values
      images = (await Promise.all(imagePromises)).filter((url) => url)

      console.log('Generated Images:', images)

      // Update video data with the correct format
      updateVideoData('images', images)

      // Update local state
      setImages(images)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong while generating images.')
    }
  }

  return (
    <div className="md:px-20 flex flex-col ml-9 gap-6">
      <h2 className="font-bold text-4xl text-gray-50 text-center">
        Create new
      </h2>
      <Card className="w-[500px] h-[616px]">
        <CardHeader>
          <CardTitle>Generate new video</CardTitle>
          <CardDescription>
            Generate your new AI short video in one click.
          </CardDescription>
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
                  Content
                </Label>
                <Select onValueChange={handleContentChange}>
                  <SelectTrigger
                    id="content"
                    className="h-12 text-lg px-4 border rounded-lg"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="text-lg">
                    {contentOptions.map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                        className="py-3 px-4 hover:bg-gray-200 text-xl cursor-pointer"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.content === 'Custom Prompt' && (
                  <Textarea
                    placeholder="Type your Prompt..."
                    value={formData.customPrompt}
                    onChange={handleCustomPromptChange}
                    className="mt-4 p-3 text-[18px]"
                  />
                )}
              </div>

              {/* Style */}
              <div className="flex flex-col space-y-4">
                <Label
                  htmlFor="style"
                  className="text-2xl font-medium text-gray-100"
                >
                  Style
                </Label>
                <Select onValueChange={handleStyleChange}>
                  <SelectTrigger
                    id="style"
                    className="h-12 text-lg px-4 border rounded-lg"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="text-lg">
                    {styleOptions.map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                        className="py-3 px-4 hover:bg-gray-200 text-xl cursor-pointer"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="flex flex-col space-y-4">
                <Label
                  htmlFor="duration"
                  className="text-2xl font-medium text-gray-100"
                >
                  Duration
                </Label>
                <Select onValueChange={handleDurationChange}>
                  <SelectTrigger
                    id="duration"
                    className="h-12 text-lg px-4 border rounded-lg"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="text-lg">
                    <SelectItem
                      value="10"
                      className="py-3 px-4 hover:bg-gray-200 text-xl cursor-pointer"
                    >
                      10 Secs
                    </SelectItem>
                    <SelectItem
                      value="30"
                      className="py-3 px-4 hover:bg-gray-200 text-xl cursor-pointer"
                    >
                      30 Secs
                    </SelectItem>
                    <SelectItem
                      value="60"
                      className="py-3 px-4 hover:bg-gray-200 text-xl cursor-pointer"
                    >
                      60 Secs
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit */}
            <CardFooter className="flex justify-between mt-6">
              <Button type="submit" disabled={loading}>
                {loading ? 'Generating...' : 'Generate'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {loading && <LoadingComponent loading={loading} />}
      {playVideo && <PlayerDialog playVideo={playVideo} videoId={videoId} />}
    </div>
  )
}

export default CreateNew
