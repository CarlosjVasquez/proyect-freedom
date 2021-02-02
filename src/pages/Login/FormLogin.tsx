import React, { useState, useEffect } from "react"
import "./LoginStyles.scss"
import { IonCol, IonRow, IonToast, IonLoading, IonPage } from "@ionic/react"

import { personCircleOutline, alertCircle } from "ionicons/icons"

import { useQuery } from "@apollo/client"

import LayoutFirst from "../../components/LayoutFirst/LayoutFirst"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import BtnBack from "../../components/BtnBack/BtnBack"
import BtnSecondary from "../../components/BtnSecondary/BtnSecondary"
import InputPassword from "../../components/InputPassword/InputPassword"
import InputPrimary from "../../components/InputPrimary/InputPrimary"
import { Query } from "../../server/querys"
import Footer from "../../components/Footer/Footer"
import Title from "../../components/Title/Title"

interface Token {
  token: string | undefined
  refreshToken: string | undefined
}

const login = Query.query.login

const FormLogin: React.FC = (props: any) => {
  const [userName, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>("")

  const [skipQuery, setSkipQuery] = useState(true);

  const { loading, data: fileData, error: errorData } = useQuery<{ tokenAuth: Token }>(
    login, {
    variables: {
      username: userName,
      password: password,
    },
    skip: skipQuery,
    fetchPolicy: "network-only",
  })

  useEffect(() => {
    if (!skipQuery) {
      const onCompleted = ({tokenAuth}: any) => {
        if (!!tokenAuth) {
          localStorage.setItem("token", tokenAuth.token!)
          localStorage.setItem("refreshToken", tokenAuth.refreshToken!)
  
          setPassword("")
          setUsername("")
          props.history.push("/home")
        }
      };

      const onError = (e: any) => {
        setMessageError("Please, enter valid credentials")
          setError(true)
          console.log(e)
      };

      if (onError || onCompleted) {
        if (onCompleted && !loading && !errorData) {
          //SuccessFunctionHere
          setSkipQuery(true);
          onCompleted(fileData)
        } else if (onError && !loading && errorData) {
          //ErrorFunctionHere
          setSkipQuery(true);
          console.log("error login");
          onError(errorData);
        }

      }
    }
  }, [loading, fileData, errorData, skipQuery, props.history]);


  const onBackHandle = () => {
    props.history.push("/init")
  }

  const forgotPassword = () => {
    props.history.push("/resetpasswordemail")
  }

  const onRegister = () => {
    props.history.push("/register")
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
    setSkipQuery(false)
  }

  return (
    <IonPage>
      <BtnBack onBack={onBackHandle} />
      <LayoutFirst>
        <IonLoading
          cssClass="loading-custom"
          isOpen={loading}
          message="loading"
        />
        <Title title="Login" color="transparent" />
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
                <BtnPrimary name="Login" onClickHandle={() => loginUser()} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <BtnSecondary
                  name="forgot password?"
                  onClickHandle={() => forgotPassword()}
                />
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
      <Footer title="Dont have account?" btn="Register" link={onRegister} />
    </IonPage>
  )
}

export default FormLogin
