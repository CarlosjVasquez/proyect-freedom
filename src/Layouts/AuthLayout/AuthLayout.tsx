import React from "react"
import { IonContent, IonGrid, IonPage } from "@ionic/react"
import styled from "styled-components"
import BackgroundVideo from "../../components/Auth/BackgroundVideo/BackgroundVideo"

const AuthLayout: React.FC<{
  footer?: any
  back?: any
}> = ({ children, footer, back }) => {
  return (
    <IonPage>
      {back}
      <IonContent slot="fixed" fullscreen>
        <GridStyle>
          <BackgroundVideo url="https://res.cloudinary.com/carlosvv18/video/upload/v1609195818/tnblfxamojpzfeymkh5u.mp4" />
          {children}
        </GridStyle>
      </IonContent>
      {footer}
    </IonPage>
  )
}

const GridStyle = styled(IonGrid)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2.5rem 0 1.5rem 0;
`

export default AuthLayout
