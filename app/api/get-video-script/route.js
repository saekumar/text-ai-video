import { chatSession } from '../../../config/AIModel'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { prompt } = await req.json()

    const result = await chatSession.sendMessage(prompt)

    if (
      result &&
      result.response &&
      result.response.candidates &&
      result.response.candidates[0] &&
      result.response.candidates[0].content &&
      result.response.candidates[0].content.parts &&
      result.response.candidates[0].content.parts[0].text
    ) {
      const responseText = result.response.candidates[0].content.parts[0].text

      // Parse responseText safely
      let parsedResponse
      try {
        parsedResponse = JSON.parse(responseText)
      } catch (parseError) {
        console.error('Error parsing responseText:', parseError)
        return NextResponse.json(
          { error: 'Failed to parse responseText' },
          { status: 500 }
        )
      }

      return NextResponse.json(parsedResponse) // Return parsed JSON
    } else {
      console.error('Unexpected response structure:', result)
      return NextResponse.json(
        { error: 'Unexpected response structure' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error during API call:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
