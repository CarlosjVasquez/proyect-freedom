import React from "react"
import styled from "styled-components"

import "./HeaderStyles.scss"

import { IonHeader, IonToolbar, IonTitle, IonButtons } from "@ionic/react"

const Header: React.FC<{
  title: any
}> = ({ title, children }) => {
  const date = new Date()

  return (
    <HeaderStyled className="header">
      <IonToolbar color="transparent">
        <IonTitle color="primary">
          <SubtitleStyled>{date.toLocaleDateString()}</SubtitleStyled> <br />{" "}
          Hi, {title}
        </IonTitle>
        <IonButtons slot="end">{children}</IonButtons>
      </IonToolbar>
    </HeaderStyled>
  )
}

const HeaderStyled = styled(IonHeader)`
  padding: 10px 0 0 0;
  &::after {
    display: none !important;
  }
`

const SubtitleStyled = styled.span`
  color: #555555;
  font-size: 0.7rem;
`

export default Header
