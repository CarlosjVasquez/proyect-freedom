import React from "react"
import "./HeaderLogoStyles.scss"
import { IonRow, IonCol, IonImg } from "@ionic/react"

const HeaderLogo: React.FC = () => {
  return (
    <IonRow className="">
      <IonCol className="custom-logo">
        <IonImg className=".img-logo" src="./assets/img/logoPP.svg" />
      </IonCol>
    </IonRow>
  )
}

export default HeaderLogo
