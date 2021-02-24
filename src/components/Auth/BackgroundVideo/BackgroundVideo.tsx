import React from 'react'
import styled from 'styled-components'

const BackgroundVideo: React.FC<{url: string}> = ({url}) => {
    return(
        <VideoStyle
            src={url}
            autoPlay
            loop
            muted
          />
    )
}

const VideoStyle = styled.video`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  background-size: cover;
  z-index: -2;
`

export default BackgroundVideo