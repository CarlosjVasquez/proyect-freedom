import React from "react"

import { IonCol } from "@ionic/react"

import AuthLayout from "../../Layouts/AuthLayout/AuthLayout"
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import Footer from "../../components/Auth/Footer/Footer"
import { FirstRowStyled } from "../../components/ContainerForm/ContainerForm"

const Init: React.FC = (props: any) => {
  const registerHandle = () => {
    props.history.push("/register")
  }
  const loginHandle = () => {
    props.history.push("/login")
  }

  return (
    <>
      <AuthLayout footer={<Footer title="Libertad 2 v1.0 " />}>
        <HeaderLogo />
        <FirstRowStyled>
          <IonCol>
            <BtnPrimary name="Login" onClickHandle={loginHandle} />
            <BtnPrimary
              color="second"
              name="Register"
              onClickHandle={registerHandle}
            />
          </IonCol>
        </FirstRowStyled>
      </AuthLayout>
    </>
  )
}

export default Init
