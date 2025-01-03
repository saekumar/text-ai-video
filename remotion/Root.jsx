import React from 'react'
import { Composition } from 'remotion'

import RemotionVideoComponent from '@/app/dashboard/_components/RemotionVideoComponent'

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Empty"
        component={RemotionVideoComponent}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  )
}
