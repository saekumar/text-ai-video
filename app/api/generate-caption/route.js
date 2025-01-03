import { AssemblyAI } from 'assemblyai'

const client = new AssemblyAI({
  apiKey: '227fb7529f374035a8d0383fdf7bf621',
})

export async function POST(req) {
  try {
    const body = await req.json()
    const { audioUrl } = body

    if (!audioUrl) {
      return new Response(JSON.stringify({ error: 'Audio URL is required' }), {
        status: 400,
      })
    }

    const config = {
      audio_url: audioUrl,
    }

    const transcript = await client.transcripts.transcribe(config)

    return new Response(
      JSON.stringify({ transcript: transcript.text, words: transcript.words }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error transcribing audio:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to transcribe audio' }),
      { status: 500 }
    )
  }
}
