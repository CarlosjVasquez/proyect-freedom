import React from "react"
import "./LayoutFirstStyles.scss"
import { IonContent, IonGrid } from "@ionic/react"

const LayoutFirst: React.FC = ({ children }) => {
  return (
      <IonContent slot="fixed" fullscreen>
        <IonGrid className="layout-first">
          <video
            className="background-video"
            src="./assets/video/backgroundVideo.mp4"
            autoPlay
            loop
            muted
          />
          {children}
        </IonGrid>
      </IonContent>
  )
}

export default LayoutFirst
