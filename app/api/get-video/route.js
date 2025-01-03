import { NextResponse } from 'next/server'
import db from '@/lib/prisma'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const videoId = searchParams.get('videoId')

    if (!videoId) {
      return new Response(JSON.stringify({ error: 'Video ID is required' }), {
        status: 400,
      })
    }

    const videoData = await db.videoData.findUnique({
      where: { id: videoId },
    })

    if (!videoData) {
      return new Response(JSON.stringify({ error: 'Video not found' }), {
        status: 404,
      })
    }

    console.log(videoData)
    return new Response(JSON.stringify({ videoData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching video data:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch video data' }),
      { status: 500 }
    )
  }
}
