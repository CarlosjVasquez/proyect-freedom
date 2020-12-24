import React, { useState } from "react"
import {
  personCircleOutline,
  mailOutline,
  alertCircle,
  checkmarkCircleOutline,
} from "ionicons/icons"
import {
  IonRow,
  IonCol,
  IonToast,
  IonLoading,
  IonPage,
} from "@ionic/react"

import { useMutation } from "@apollo/client"

import LayoutFirst from "../../components/LayoutFirst/LayoutFirst"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import InputPassword from "../../components/InputPassword/InputPassword"
import InputPrimary from "../../components/InputPrimary/InputPrimary"
import BtnBack from "../../components/BtnBack/BtnBack"
import {Query} from "../../server/querys"
import Footer from '../../components/Footer/Footer'
import Title from '../../components/Title/Title'

import "./RegisterStyles.scss"

const create = Query.mutation.create;

const Register: React.FC = (props: any) => {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [emailValidate, setEmailValidate] = useState<boolean>()
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [passwordValidate, setPasswordValidate] = useState<boolean>(false)
  const [errorCreate, setErrorCreate] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>("")
  const [confirmCreate, setConfirmCreate] = useState<boolean>(false)
  const [messageConfirm, setMessageConfirm] = useState<string>("")

  const [createUser, { loading }] = useMutation<{ createUser: any }>(
    create,
    {
      variables: {
        username : username,
        password : password,
        email: email,
      },
    }
  )

  const onRegister = () => {
    if (email === "") {
      setMessageError("Please, email is required")
      setErrorCreate(true)
      return
    }

    if (!emailValidate) {
      setMessageError("Please, email invalid")
      setErrorCreate(true)
      return
    }

    if (username === "") {
      setMessageError("Please, username is required")
      setErrorCreate(true)
      return
    }

    if (password === "") {
      setMessageError("Please, password is required")
      setErrorCreate(true)
      return
    }

    if (confirmPassword === "") {
      setMessageError("Please, Confirm password is required")
      setErrorCreate(true)
      return
    }

    if (!passwordValidate) {
      setMessageError("Please, Password not invalid")
      setErrorCreate(true)
      return
    }

    createUser()
      .then(() => {
        setMessageConfirm("Register successful")
        setConfirmCreate(true)
      })
      .catch((e) => {
        e.message.includes(
          'duplicate key value violates unique constraint "auth_user_username_key"'
        ) && setMessageError("Username already exists")

        setMessageError(e)
        setErrorCreate(true)
      })
  }

  const onBackHandle = () => {
    props.history.push("/init")
  }

  const onLogin = () => {
    props.history.push('/login')
  }

  const onPasswordHandle = (props: any) => {
    setPassword(props)
    setPasswordValidate(false)
    if (confirmPassword === props) {
      setPasswordValidate(true)
    }
  }

  const onConfirmPasswordHandle = (props: any) => {
    setConfirmPassword(props)
    setPasswordValidate(false)
    if (password === props) {
      setPasswordValidate(true)
    }
  }

  const onValidateEmail = (props: any) => {
    setEmail(props)
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    regex.test(props) ? setEmailValidate(true) : setEmailValidate(false)
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
      <Title title="Register" color="transparent" />
      <IonRow className="card-page">
        <IonCol>
          <IonRow>
            <IonCol>
              <InputPrimary
                setValue={email}
                setPlaceholder="Email"
                setType="email"
                setIcon={mailOutline}
                onChangeValue={onValidateEmail}
                validate={emailValidate}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <InputPrimary
                setValue={username}
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
                onChangeValue={onPasswordHandle}
                validate={passwordValidate}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <InputPassword
                setPlaceholder="Confirm password"
                setValue={confirmPassword}
                onChangeValue={onConfirmPasswordHandle}
                validate={passwordValidate}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <BtnPrimary name="Register" onClickHandle={onRegister} />
            </IonCol>
          </IonRow>
        </IonCol>
        <IonToast
          cssClass="message-custom"
          isOpen={errorCreate}
          onDidDismiss={() => setErrorCreate(false)}
          message={messageError}
          duration={1500}
          buttons={[
            {
              side: "end",
              icon: alertCircle,
            },
          ]}
        />
        <IonToast
          cssClass="message-custom-confirm"
          isOpen={confirmCreate}
          onDidDismiss={() => props.history.push("/login")}
          message={messageConfirm}
          duration={1500}
          buttons={[
            {
              side: "end",
              icon: checkmarkCircleOutline,
            },
          ]}
        />
      </IonRow>
    </LayoutFirst>
    <Footer title="A verify have an account?" btn="Login" link={onLogin} />
    </IonPage>
    
  )
}

export default Register
