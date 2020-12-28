import React from "react"
import "./LayoutFirstStyles.scss"
import { IonContent, IonGrid } from "@ionic/react"

const LayoutFirst: React.FC = ({ children }) => {
  return (
      <IonContent slot="fixed" fullscreen>
        <IonGrid className="layout-first">
          <video
            className="background-video"
            src="https://res.cloudinary.com/carlosvv18/video/upload/v1609195818/tnblfxamojpzfeymkh5u.mp4"
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
