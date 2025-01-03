import { NextResponse } from 'next/server'
import axios from 'axios'
import { uploadAudioToCloudinary } from '../../../lib/cloudinaryConfig'

export async function POST(req) {
  try {
    const { script } = await req.json()
    let data = JSON.stringify({
      voiceId: 'en-US-clint',
      style: 'Narration',
      text: script,
      rate: -8,
      pitch: 0,
      sampleRate: 48000,
      format: 'MP3',
      channelType: 'MONO',
      pronunciationDictionary: {},
      encodeAsBase64: false,
      variation: 1,
      audioDuration: 0,
      modelVersion: 'GEN2',
      multiNativeLocale: 'en-US',
    })

    const config = {
      method: 'post',
      url: 'https://api.murf.ai/v1/speech/generate',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': 'ap2_54e20177-cd0d-410b-b09e-5967cbd2e6c6', // Replace with environment variable for security
      },
      data: data,
    }

    const response = await axios(config)
    // Log the actual response data

    const audioUrl = response.data.audioFile // Assuming response contains the URL of the generated audio file

    if (audioUrl) {
      const cloudinaryAudioUrl = await uploadAudioToCloudinary(audioUrl)

      return NextResponse.json({ status: 200, url: cloudinaryAudioUrl })
    } else {
      return NextResponse.json({
        status: 404,
        message: 'No audio file URL found',
      })
    }
  } catch (error) {
    console.error('Error generating audio file:', error)
    return NextResponse.json({ status: 500, message: 'Something went wrong' })
  }
}
