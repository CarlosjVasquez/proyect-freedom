import React from "react"
import { IonButton, IonLabel } from "@ionic/react"
import "./BtnSecondaryStyles.scss"

const BtnSecondary: React.FC<{
  name: String
}> = (props) => {
  return (
    <IonButton className="btn-secondary">
      <IonLabel>{props.name}</IonLabel>
    </IonButton>
  )
}

export default BtnSecondary
