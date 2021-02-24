import React from "react"
import styled from "styled-components"

const BackgroundVideo: React.FC<{ url: string }> = ({ url }) => {
  return (
    <DivStyled>
      <VideoStyle src={url} autoPlay loop muted />
    </DivStyled>
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
`

const DivStyled = styled.div`
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100vw;
    min-height: 100vh;
    background: rgba(223, 56, 56, 0.2);
    background: linear-gradient(
      0deg,
      rgba(223, 56, 56, 0.2) 0%,
      rgba(23, 36, 44, 0.7) 60%
    );
  }
`

export default BackgroundVideo
