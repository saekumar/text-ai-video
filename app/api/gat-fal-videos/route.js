import { NextResponse } from 'next/server'
import db from '@/lib/prisma'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const clerkId = searchParams.get('clerkId')
  console.log('clerkId:', clerkId)

  if (!clerkId) {
    return NextResponse.json({ error: 'clerkId is required' }, { status: 400 })
  }

  try {
    const videoList = await db.falVideo.findMany({
      where: { clerkId }, // Ensure this matches the schema field name
    })
    console.log('Video List:', videoList)
    return NextResponse.json(videoList)
  } catch (error) {
    console.error('Error fetching video list:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video list' },
      { status: 500 }
    )
  }
}
