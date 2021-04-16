import React, { useEffect } from "react"

import { IonCol } from "@ionic/react"

// import { AppUpdate } from "@ionic-native/app-update"
// import { AppVersion } from "@ionic-native/app-version"

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

  // const updateCheck = async () => {
  //   // const updateUrl = "http://localhost:3000/version.xml"
  //   // const data = await AppUpdate.checkAppUpdate(updateUrl)

  //   // data().then(() => {
  //   //   console.log("Update available")
  //   // })

  //   AppVersion.getVersionNumber().then(function (version: any) {
  //     console.log(version)
  //   })
  // }

  // useEffect(() => {
  //   updateCheck()
  // })

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
