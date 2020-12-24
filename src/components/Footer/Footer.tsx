import React from "react"
import { IonFooter, IonTitle, IonToolbar } from "@ionic/react"
import BtnSecondary from "../../components/BtnSecondary/BtnSecondary" 
import "./Footer.scss"

const Footer: React.FC<{
  title: String
  btn: String
  link: () => void
}> = ({title, btn, link}) => {
  return (
    <IonFooter >
      <IonToolbar className="custom-toolbar ion-no-border" color="transparent">
        <IonTitle className="title-footer" size="small" >
            {title}
          </IonTitle>
          <BtnSecondary name={btn} onClickHandle={link} />
      </IonToolbar>
    </IonFooter>
  )
}

export default Footer