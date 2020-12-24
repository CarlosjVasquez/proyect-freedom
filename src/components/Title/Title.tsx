import React from "react"
import { IonToolbar, IonTitle } from "@ionic/react"
import "./Title.scss"

const Title: React.FC<{
  color?: string
  title: String
}> = ({title, color}) => {
  return (
    <IonToolbar className="ion-no-border" color={color} >
    <IonTitle className="title-page" >{title}</IonTitle>
  </IonToolbar>
  )
}

export default Title
