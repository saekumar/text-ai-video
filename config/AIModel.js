const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai')

const apiKey = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
}

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: 'user',
      parts: [
        {
          text: "Create a script to generate a 30-second video on the topic of an interesting historical story. Provide a JSON response with two fields: 'imagePrompt' for detailed, realistic AI-generated image descriptions corresponding to each scene, and 'contentText' for the scene's narrative content.\n\n",
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: '```json\n{\n  "scenes": [\n    {\n      "imagePrompt": "A highly detailed, photorealistic image of a bustling 1920s Parisian street scene at night.  Cobblestone streets, Art Deco architecture, glowing neon signs advertising champagne and jazz clubs, people in flapper dresses and zoot suits walking and laughing, a vintage car passing by, rain glistening on the wet pavement. Focus on a specific couple, a young woman in a shimmering emerald green flapper dress and a man in a tailored suit, their faces slightly blurred but clearly showing happiness and excitement.  The overall atmosphere should be vibrant, lively, and romantic.",\n      "contentText": "Paris, 1925. The city of lights, humming with the energy of the roaring twenties.  Our story begins with a young woman named Antoinette, a talented but struggling artist, and Jean-Luc, a charming musician with a secret."\n    },\n    {\n      "imagePrompt": "A dimly lit, intimate jazz club interior. Photorealistic rendering.  Smoke curling from cigarettes, low lighting highlighting a small stage where a jazz band plays, people dancing closely in the foreground,  Antoinette and Jean-Luc seated at a small table, a single, partially empty glass of champagne between them.  Focus on their faces, showing a mix of longing and unspoken tension. The atmosphere should be smoky, romantic, and slightly mysterious.",\n      "contentText": "They met at \'Le Chat Noir\', a hidden gem where jazz melodies blended with whispered secrets.  Jean-Luc, captivated by Antoinette\'s spirit, revealed his true identity: a renowned art collector, secretly purchasing her work under an alias."\n    },\n    {\n      "imagePrompt": "A close-up, photorealistic image of an antique wooden box, intricately carved, slightly ajar, revealing glimpses of priceless artwork – sketches, paintings in various stages of completion, and a single, dazzling emerald necklace. The background is blurred but suggests a luxurious, art-filled apartment.",\n      "contentText": "He confessed his admiration, revealing his carefully curated collection of her art, a hidden treasure only he knew existed.  Amongst the masterpieces, he presented her with a dazzling emerald necklace – a symbol of his love and admiration."\n    },\n    {\n      "imagePrompt": "A photorealistic image of Antoinette, now dressed in a beautiful gown, wearing the emerald necklace, smiling radiantly as she stands in front of a large canvas featuring one of her completed artworks.  The background should depict a well-lit art gallery, with other paintings hanging on the walls and people observing the artwork in admiration.",\n      "contentText": "Antoinette, no longer struggling, found success and recognition.  Jean-Luc\'s act of love launched her career, transforming her life forever."\n    },\n    {\n      "imagePrompt": "A photorealistic image of Antoinette and Jean-Luc, older but still clearly in love, walking hand-in-hand along the Seine River at sunset, the Eiffel Tower shimmering in the distance. The image should convey a sense of peace, contentment, and enduring love.",\n      "contentText": "Their love story, born in the vibrant heart of Paris, blossomed into a tale of enduring passion and artistic triumph. A testament to the power of love, hidden identities, and the transformative magic of art."\n    }\n  ]\n}\n```\n\nThis JSON provides a detailed script outlining five scenes, each with an image prompt for AI generation and corresponding narrative text.  To create the 30-second video, you would need to use a video editing software, generate images using an AI art generator based on the prompts, and then combine the images with voice-over narration of the "contentText" and appropriate music.  Each scene should be roughly 6 seconds long to fit within the 30-second timeframe.  Adjust the image prompts as needed to fit the style and capabilities of your chosen AI art generator.',
        },
      ],
    },
  ],
})
