import React from "react"
import { IonRow, IonCol, IonButton, IonToolbar, IonButtons } from "@ionic/react"
import "./BtnBackStyles.scss"

const BtnBack: React.FC<{
  name?: String
  color?: string
  onBack: () => void
}> = (props) => {
  return (
    <IonToolbar color="transparent" className="custom-toolbar ion-no-border">
      <IonButtons slot="start">
        <IonRow className="row-btn-back">
          <IonCol>
            <IonButton
              color={props.color ? props.color : ""}
              fill="clear"
              className="btn-back"
              onClick={props.onBack}
            >
              {props.name ? props.name : "Back"}
            </IonButton>
          </IonCol>
        </IonRow>
      </IonButtons>
    </IonToolbar>
  )
}

export default BtnBack
