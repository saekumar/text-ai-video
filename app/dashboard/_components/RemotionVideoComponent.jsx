import React from 'react'
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

const RemotionVideoComponent = ({
  videoScript,
  audioUrl,
  images,
  captions,
  setDurationFrame,
}) => {
  console.log(images)
  console.log(audioUrl)
  const { fps } = useVideoConfig()
  const getDurationFrame = () => {
    console.log(captions)

    console.log(captions?.length)
    console.log(captions[captions?.length - 1].end)
    const lastCaptionEnd = captions[captions?.length - 1]?.end
    console.log(lastCaptionEnd)
    if (lastCaptionEnd !== undefined && fps !== undefined) {
      console.log(Math.max((lastCaptionEnd / 1000) * fps, 1))
      setDurationFrame(Math.max((lastCaptionEnd / 1000) * fps, 1)) // Ensure at least 1 frame
      return Math.max((lastCaptionEnd / 1000) * fps, 1) // Ensure at least 1 frame
    }
    return 1
  }

  const durationFrame = getDurationFrame()
  const frame = useCurrentFrame()
  const getCurrentCaption = () => {
    const currentFrame = (frame / fps) * 1000
    const currentCaption = captions.find(
      (caption) => caption.start <= currentFrame && caption.end >= currentFrame
    )
    return currentCaption?.text
  }

  return (
    videoScript && (
      <AbsoluteFill className="bg-gray-400">
        {images?.map((image, index) => {
          const startTime = (index * durationFrame) / images?.length
          const duration = getDurationFrame()
          const scale = (idx) =>
            interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration],
              idx % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            )
          return (
            <React.Fragment key={index}>
              <Sequence from={startTime} durationInFrames={durationFrame}>
                <AbsoluteFill style={{ justifyContent: 'center' }}>
                  <Img
                    src={image}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: `scale(${scale(index)})`,
                    }}
                  />
                  <AbsoluteFill
                    style={{
                      justifyContent: 'center',
                      top: undefined,
                      bottom: '0',
                      height: 150, // Adjust the height of the caption area
                      // Semi-transparent background
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '1.2rem', // Adjust font size as needed
                      padding: '0.5rem',
                      width: '100%',
                    }}
                  >
                    <h2 className="text-2xl">{getCurrentCaption()}</h2>
                  </AbsoluteFill>
                </AbsoluteFill>
              </Sequence>
            </React.Fragment>
          )
        })}
        <Audio src={audioUrl} />
      </AbsoluteFill>
    )
  )
}

export default RemotionVideoComponent
