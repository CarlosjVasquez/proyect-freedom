import React from "react"
import "./LayoutFirstStyles.scss"
import { IonPage, IonContent, IonGrid } from "@ionic/react"

const LayoutFirst: React.FC = ({ children }) => {
  return (
    <IonPage>
      <IonContent className="content">
        <IonGrid className="layout-first">
          <video
            className="background-video"
            src="./assets/video/backgroundVideo.mp4"
            autoPlay={true}
            loop={true}
            muted={true}
          ></video>
          {children}
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default LayoutFirst
