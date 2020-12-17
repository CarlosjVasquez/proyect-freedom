import React from "react"
import { IonRow, IonCol, IonButton } from "@ionic/react"
import "./BtnBackStyles.scss"

const BtnBack: React.FC<{
  name?: String
  color?: string
  onBack: () => void
}> = (props) => {
  return (
    <IonRow className="row-btn-back">
      <IonCol>
        <IonButton
          color={props.color ? props.color : "light"}
          fill="clear"
          className="btn-back"
          onClick={props.onBack}
        >
          {props.name ? props.name : "Back"}
        </IonButton>
      </IonCol>
    </IonRow>
  )
}

export default BtnBack
