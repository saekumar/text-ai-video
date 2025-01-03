import { NextResponse } from 'next/server'
import db from '@/lib/prisma'

export async function POST(req) {
  try {
    const body = await req.json()
    const { clerkId, videoScript, audioUrl, captions, images } = body

    if (!clerkId || !videoScript || !audioUrl || !captions || !images) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400 }
      )
    }

    let savedVideoData = await db.videoData.create({
      data: { clerkId, videoScript, audioUrl, captions, images },
    })

    return new Response(JSON.stringify({ savedVideoData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error saving video data:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to save video data' }),
      { status: 500 }
    )
  }
}
