import { uploadImageToCloudinary } from '@/lib/cloudinaryConfig'
import { fal } from '@fal-ai/client'

fal.config({
  credentials: process.env.FAL_KEY,
})

export async function POST(req) {
  try {
    const body = await req.json()
    const { prompt } = body

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
      })
    }

    const result = await fal.subscribe('fal-ai/flux/schnell', {
      input: {
        prompt: prompt,
        image_size: 'landscape_4_3',
        num_inference_steps: 4,
        num_images: 1,
        enable_safety_checker: true,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_PROGRESS') {
          update.logs.map((log) => log.message).forEach(console.log)
        }
      },
    })
    if (result?.data?.images?.length > 0) {
      const imageUrl = result.data.images[0].url

      const cloudinaryImageUrl = await uploadImageToCloudinary(videoUrl)

      return new Response(
        JSON.stringify({
          imageUrl: cloudinaryImageUrl,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    } else {
      return new Response(
        JSON.stringify({
          error: 'Image generation failed or no image returned',
        }),
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error generating image:', error)
    return new Response(JSON.stringify({ error: 'Failed to generate image' }), {
      status: 500,
    })
  }
}
