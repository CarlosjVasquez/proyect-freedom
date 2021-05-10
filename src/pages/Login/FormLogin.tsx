import React, { useState } from "react"
import { IonCol, IonRow } from "@ionic/react"

import { personCircleOutline, lockClosedOutline } from "ionicons/icons"

import { useQuery, useMutation } from "@apollo/client"
import { Query } from "../../server/querys"

import AuthLayout from "../../Layouts/AuthLayout/AuthLayout"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import BtnBack from "../../components/BtnBack/BtnBack"
import BtnSecondary from "../../components/BtnSecondary/BtnSecondary"
import InputPrimary from "../../components/InputPrimary/InputPrimary"
import Footer from "../../components/Auth/Footer/Footer"
import Title from "../../components/Title/Title"
import Loading from "../../components/Loading/Loading"
import Toast from "../../components/Toast/Toast"
import { FirstRowStyled } from "../../components/ContainerForm/ContainerForm"

interface Token {
  token: string | undefined
  refreshToken: string | undefined
}

const login = Query.query.login
const CONTROLUSER = Query.mutation.controlUser

const FormLogin: React.FC = (props: any) => {
  const [userName, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>("")

  const [skipQuery, setSkipQuery] = useState(true)

  const [ControlUser] = useMutation(CONTROLUSER)

  const { loading } = useQuery<{
    tokenAuth: Token
  }>(login, {
    variables: {
      username: userName,
      password: password,
    },
    skip: skipQuery,
    fetchPolicy: "network-only",
    onCompleted: ({ tokenAuth }: any) => {
      ControlUser({
        variables: {
          idUser: tokenAuth.user.id,
          tokenNW: tokenAuth.token,
        },
      })
        .then(({ data }: any) => {
          if (data.createControlUserData.success) {
            if (!!tokenAuth) {
              localStorage.setItem("token", tokenAuth.token!)
              localStorage.setItem("refreshToken", tokenAuth.refreshToken!)

              setPassword("")
              setUsername("")
              setSkipQuery(true)
              props.history.push("/home")
            }
          }
        })
        .catch((e: any) => {
          setSkipQuery(true)
          setMessageError("Please, enter valid credentials")
          setError(true)
          console.log(e)
        })
    },
    onError: (e: any) => {
      setSkipQuery(true)
      setMessageError("Please, enter valid credentials")
      setError(true)
      console.log(e)
    },
  })

  // useEffect(() => {
  //   if (!skipQuery) {
  //     const onCompleted = ({ tokenAuth }: any) => {}

  //     const onError = (e: any) => {
  //       setMessageError("Please, enter valid credentials")
  //       setError(true)
  //       console.log(e)
  //     }

  //     if (onError || onCompleted) {
  //       if (onCompleted && !loading && !errorData) {
  //         //SuccessFunctionHere
  //         setSkipQuery(true)
  //         onCompleted(fileData)
  //       } else if (onError && !loading && errorData) {
  //         //ErrorFunctionHere
  //         setSkipQuery(true)
  //         console.log("error login")
  //         onError(errorData)
  //       }
  //     }
  //   }
  // }, [loading, fileData, errorData, skipQuery, props.history])

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
    <>
      <AuthLayout
        back={<BtnBack onBack={onBackHandle} />}
        footer={
          <Footer
            title="Dont have account?"
            btn="Register"
            onClickHandle={onRegister}
          />
        }
      >
        <Loading active={loading} />
        <Title title="Login" color="transparent" />
        <FirstRowStyled>
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
                <InputPrimary
                  setPlaceholder="Password"
                  setValue={password}
                  onChangeValue={(props: any) => setPassword(props)}
                  setType="password"
                  setIcon={lockClosedOutline}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <BtnPrimary name="Login" onClickHandle={() => loginUser()} />
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
          <Toast
            duration={1500}
            active={error}
            message={messageError}
            onDidDismiss={() => setError(false)}
          />
        </FirstRowStyled>
      </AuthLayout>
    </>
  )
}

export default FormLogin
