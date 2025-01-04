import { uploadVideoToCloudinary } from '@/lib/cloudinaryConfig'
import { fal } from '@fal-ai/client'

export async function POST(req) {
  try {
    const body = await req.json()
    const { prompt } = body

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
      })
    }

    const start = Date.now()
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 9500) // 9.5 seconds

    try {
      const result = await fal.subscribe(
        'fal-ai/ltx-video',
        {
          input: {
            prompt,
            negative_prompt:
              'low quality, worst quality, deformed, distorted, disfigured, motion smear, motion artifacts, fused fingers, bad anatomy, weird hand, ugly',
            num_inference_steps: 30,
            guidance_scale: 3,
          },
          logs: true,
        },
        { signal: controller.signal }
      )
      clearTimeout(timeout)
      console.log('fal.subscribe response time:', Date.now() - start, 'ms')

      if (result?.data?.video?.url?.length > 0) {
        const videoUrl = result.data.video.url
        const cloudinaryVideoUrl = await uploadVideoToCloudinary(videoUrl)

        return new Response(JSON.stringify({ videoUrl: cloudinaryVideoUrl }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      } else {
        return new Response(
          JSON.stringify({
            error: 'Video generation failed or no video returned',
          }),
          { status: 500 }
        )
      }
    } catch (err) {
      clearTimeout(timeout)
      if (err.name === 'AbortError') {
        console.error('fal.subscribe request timed out')
        return new Response(JSON.stringify({ error: 'Request timed out' }), {
          status: 504,
        })
      }
      throw err
    }
  } catch (error) {
    console.error(
      'Error occurred:',
      error.message,
      error.stack,
      error.response?.data
    )
    return new Response(
      JSON.stringify({ error: error.message || 'An unknown error occurred' }),
      { status: 500 }
    )
  }
}
