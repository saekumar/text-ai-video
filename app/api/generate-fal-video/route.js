import {
  uploadImageToCloudinary,
  uploadVideoToCloudinary,
} from '@/lib/cloudinaryConfig'
import { fal } from '@fal-ai/client'

export async function POST(req) {
  try {
    const body = await req.json()
    const { prompt } = body
    console.log(prompt)
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
      })
    }
    const result = await fal.subscribe('fal-ai/ltx-video', {
      input: {
        prompt: prompt,
        negative_prompt:
          'low quality, worst quality, deformed, distorted, disfigured, motion smear, motion artifacts, fused fingers, bad anatomy, weird hand, ugly',
        num_inference_steps: 30,
        guidance_scale: 3,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_PROGRESS') {
          update.logs.map((log) => log.message).forEach(console.log)
        }
      },
    })
    console.log(result)
    console.log(result.data)
    // console.log(result.requestId)

    if (result?.data?.video?.url?.length > 0) {
      const videoUrl = result.data.video.url
      console.log(videoUrl)

      const cloudinaryVideoUrl = await uploadVideoToCloudinary(videoUrl)

      return new Response(
        JSON.stringify({
          videoUrl: cloudinaryVideoUrl,
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
    console.log(error)
  }
}
