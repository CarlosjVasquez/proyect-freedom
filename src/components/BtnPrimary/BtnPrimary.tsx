import React from "react"
import { IonButton, IonLabel } from "@ionic/react"
import "./BtnPrimaryStyles.scss"

const BtnPrimary: React.FC<{
  color?: string
  name: String
  onClickHandle: () => void
}> = (props) => {
  return (
    <IonButton
      color={props.color}
      className="btn-custom"
      onClick={props.onClickHandle}
    >
      <IonLabel >{props.name}</IonLabel>
    </IonButton>
  )
}

export default BtnPrimary
