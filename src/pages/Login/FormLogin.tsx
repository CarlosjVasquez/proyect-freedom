import React, { useState } from "react"
import "./LoginStyles.scss"
import { IonCol, IonRow, IonToast } from "@ionic/react"

import { personCircleOutline, alertCircle } from "ionicons/icons"

import { gql, useMutation } from "@apollo/client"

import HeaderLogo from "../../components/HeaderLogo/HeaderLogo"
import LayoutFirst from "../../components/LayoutFirst/LayoutFirst"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import BtnBack from "../../components/BtnBack/BtnBack"
import BtnSecondary from "../../components/BtnSecondary/BtnSecondary"
import InputPassword from "../../components/InputPassword/InputPassword"
import InputPrimary from "../../components/InputPrimary/InputPrimary"

interface Token {
  token: string | undefined
}

const all_Query = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

const FormLogin: React.FC = (props: any) => {
  const [userName, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>("")

  const [tokenAuth] = useMutation<{ tokenAuth: Token }>(all_Query, {
    variables: {
      username: userName,
      password: password,
    },
  })

  const onBackHandle = () => {
    props.history.push("/init")
  }

  const loginUser = () => {
    if (userName === "") {
      setMessageError("Please, username is required")
      setError(true)
      return
    }
    if (password === "") {
      setMessageError("Please, password is required")
      setError(true)
      return
    }
    tokenAuth()
      .then((user) => {
        localStorage.setItem("token", user.data?.tokenAuth.token!)
        setPassword("")
        setUsername("")
        props.history.push("/home")
      })
      .catch((e) => {
        setMessageError("Please, enter valid credentials")
        setError(true)
        console.log(e)
      })
  }

  return (
    <LayoutFirst>
      <BtnBack onBack={onBackHandle} />
      <HeaderLogo />
      <IonRow>
        <IonCol>
          <IonRow>
            <IonCol>
              <InputPrimary
                setValue={userName}
                setPlaceholder="Username"
                setIcon={personCircleOutline}
                onChangeValue={(props: any) => setUsername(props)}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <InputPassword
                setPlaceholder="Password"
                setValue={password}
                onChangeValue={(props: any) => setPassword(props)}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <BtnPrimary name="Login" onClickHandle={loginUser} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <BtnSecondary name="forgot password?" />
            </IonCol>
          </IonRow>
        </IonCol>
        <IonToast
          cssClass="message-custom"
          isOpen={error}
          onDidDismiss={() => setError(false)}
          message={messageError}
          duration={1500}
          buttons={[
            {
              side: "end",
              icon: alertCircle,
            },
          ]}
        />
      </IonRow>
    </LayoutFirst>
  )
}

export default FormLogin
