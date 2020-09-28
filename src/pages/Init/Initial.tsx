import React from "react"

import { IonRow, IonCol } from "@ionic/react"

import LayoutFirst from "../../components/LayoutFirst/LayoutFirst"
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"

const Init: React.FC = (props: any) => {
  const registerHandle = () => {
    props.history.push("/register")
  }
  const loginHandle = () => {
    props.history.push("/login")
  }
  return (
    <LayoutFirst>
      <HeaderLogo />
      <IonRow>
        <IonCol>
          <BtnPrimary name="Login" onClickHandle={loginHandle} />
          <BtnPrimary
            color="second"
            name="Register"
            onClickHandle={registerHandle}
          />
        </IonCol>
      </IonRow>
    </LayoutFirst>
  )
}

export default Init
