'use client'
import VideoList from '../dashboard/_components/VideoList'
import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import EmptyStateComponent from './_components/EmptyStateCompo'
import Link from 'next/link'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import FalVideos from './_components/FalVideos'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const DashboardPage = () => {
  const [videoList, setVideoList] = useState([])
  const { user } = useUser()
  const userId = user?.id // Fetch userId if user is defined

  const getVideoList = async () => {
    console.log('Fetching videos for userId:', userId)
    if (!userId) return // Wait until userId is available
    try {
      const res = await axios.get(`/api/get-video-list?clerkId=${userId}`)
      console.log('Video list response:', res.data)
      setVideoList(res.data)
    } catch (error) {
      console.error('Error fetching video list:', error)
    }
  }

  useEffect(() => {
    if (userId) {
      getVideoList()
    }
  }, [userId]) // Run only when userId changes

  return (
    <div className="">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl"></h2>
        <Link href="/dashboard/create-new">
          <Button className="bg-gray-50 text-gray-950 hover:bg-neutral-500 hover:text-neutral-50">
            + Create New
          </Button>
        </Link>
      </div>
      {videoList.length === 0 ? (
        <EmptyStateComponent />
      ) : (
        <>
          <Tabs defaultValue="short" className="w-full mt-10">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="short">Story Videos</TabsTrigger>
              <TabsTrigger value="fal">Flash Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="short">
              <VideoList videos={videoList} />
            </TabsContent>
            <TabsContent value="fal">
              <FalVideos />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

export default DashboardPage
