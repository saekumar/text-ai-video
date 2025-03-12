import { NextResponse } from 'next/server'
import axios from 'axios'
import { uploadAudioToCloudinary } from '../../../lib/cloudinaryConfig'

export async function POST(req) {
  try {
    const { script } = await req.json()

    // Ensure script is provided
    if (!script) {
      return NextResponse.json({
        status: 400,
        message: 'Script text is required',
      })
    }

    let data = JSON.stringify({
      voiceId: 'en-US-natalie', // Ensure this is a valid voice ID from Murf AI
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
        'api-key': process.env.MURF_AI_API_KEY, // Use environment variable
      },
      data: data,
    }

    const response = await axios(config)

    console.log('Murf AI Response:', response.data)

    if (!response.data.audioFile) {
      return NextResponse.json({
        status: 404,
        message: 'No audio file URL found in response',
      })
    }

    const cloudinaryAudioUrl = await uploadAudioToCloudinary(
      response.data.audioFile
    )

    return NextResponse.json({ status: 200, url: cloudinaryAudioUrl })
  } catch (error) {
    console.error(
      'Error generating audio file:',
      error.response?.data || error.message
    )

    return NextResponse.json({
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Something went wrong',
    })
  }
}
