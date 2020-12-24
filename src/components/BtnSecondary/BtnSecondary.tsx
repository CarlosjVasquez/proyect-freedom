import React from "react"
import { IonButton, IonLabel } from "@ionic/react"
import "./BtnSecondaryStyles.scss"

const BtnSecondary: React.FC<{
  name: String,
  onClickHandle: () => void
}> = ({name, onClickHandle}) => {
  return (
    <IonButton className="btn-secondary" onClick={onClickHandle} >
      <IonLabel>{name}</IonLabel>
    </IonButton>
  )
}

export default BtnSecondary
