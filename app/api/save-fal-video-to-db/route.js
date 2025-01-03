import { getAuth } from '@clerk/nextjs/server'
import db from '@/lib/prisma'
export async function POST(req) {
  try {
    const { userId: clerkId } = getAuth(req) // Retrieve clerkId
    if (!clerkId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      })
    }
    const body = await req.json()
    const { videoUrl, prompt } = body
    if (!videoUrl || !prompt) {
      return new Response(JSON.stringify({ error: 'Invalid data' }), {
        status: 400,
      })
    }
    const video = await db.falVideo.create({
      data: { videoUrl, prompt, clerkId },
    })
    return new Response(JSON.stringify(video), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
