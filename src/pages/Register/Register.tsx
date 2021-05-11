import React, { useEffect, useState } from "react"
import { Similarity } from "../../components/SimilarityString"
import {
  personCircleOutline,
  mailOutline,
  alertCircle,
  lockClosedOutline,
} from "ionicons/icons"
import { IonRow, IonCol, IonToast } from "@ionic/react"

import { useMutation } from "@apollo/client"

import AuthLayout from "../../Layouts/AuthLayout/AuthLayout"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import InputPrimary from "../../components/InputPrimary/InputPrimary"
import BtnBack from "../../components/BtnBack/BtnBack"
import { Query } from "../../server/querys"
import Footer from "../../components/Auth/Footer/Footer"
import Title from "../../components/Title/Title"
import Toast from "../../components/Toast/Toast"
import Loading from "../../components/Loading/Loading"
import { FirstRowStyled } from "../../components/ContainerForm/ContainerForm"

const create = Query.mutation.create

const Register: React.FC = (props: any) => {
  const [username, setUsername] = useState<string>("")
  const [usernameValidate, setUsernameValidate] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [emailValidate, setEmailValidate] = useState<boolean>()
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [passwordValidate, setPasswordValidate] = useState<boolean>(false)
  const [errorUsername, setErrorUsername] = useState<boolean>(false)
  const [errorUpperCase, setErrorUpperCase] = useState<boolean>(false)
  const [errorLowerCase, setErrorLowerCase] = useState<boolean>(false)
  const [errorNumbers, setErrorNumbers] = useState<boolean>(false)
  const [errorMinMax, setErrorMinMax] = useState<boolean>(false)
  const [errorConfirmPassword, setErrorConfirmPassword] =
    useState<boolean>(false)
  const [errorUserNameSimilarity, setErrorUserNameSimilarity] =
    useState<boolean>(false)
  const [errorCreate, setErrorCreate] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>("")
  const [confirmCreate, setConfirmCreate] = useState<boolean>(false)
  const [btnRegister, setBtnRegister] = useState<boolean>(true)

  const [createUser, { loading }] = useMutation<{ register: any }>(create, {
    variables: {
      username: username,
      password1: password,
      password2: confirmPassword,
      email: email,
    },
    onCompleted: ({ register }) => {
      if (!register.success) {
        console.log(register.errors)
        if (register.errors.email) {
          setMessageError("Error: " + register.errors.email[0].message)
          return setErrorCreate(true)
        }
        if (register.errors.username) {
          setMessageError("Error: " + register.errors.username[0].message)
          return setErrorCreate(true)
        }

        setMessageError("Error")
        setErrorCreate(true)
      } else {
        setConfirmCreate(true)
        props.history.push("/login")
      }
    },
  })

  const onRegister = () => {
    if (email === "") {
      setMessageError("Please, email is required")
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
  }

  const onBackHandle = () => {
    props.history.push("/init")
  }

  const onLogin = () => {
    props.history.push("/login")
  }

  useEffect(() => {
    usernameValidate && emailValidate && passwordValidate
      ? setBtnRegister(false)
      : setBtnRegister(true)
  }, [usernameValidate, emailValidate, passwordValidate])

  useEffect(() => {
    if (Similarity(password.toLowerCase(), username.toLowerCase()) > 0.5) {
      setErrorUserNameSimilarity(true)
      setPasswordValidate(false)
    } else {
      if (username !== "") {
        setErrorUserNameSimilarity(false)
        setPasswordValidate(true)
        setUsernameValidate(true)
      }
    }
  }, [password, username])

  useEffect(() => {
    if (confirmPassword !== "" || password !== "") {
      if (confirmPassword !== password) {
        setPasswordValidate(false)
        setErrorConfirmPassword(true)
      } else {
        setPasswordValidate(true)
        setErrorConfirmPassword(false)
      }
    } else {
      setPasswordValidate(false)
      setErrorConfirmPassword(false)
    }
  }, [confirmPassword, password])

  useEffect(() => {
    const regexUpper = /[A-Z]/
    const regexLower = /[a-z]/
    const regexNum = /[0-9]/
    const regex = /^[0-9a-zA-Z*.]{8,16}$/

    if (password !== "") {
      if (!regexUpper.test(password)) {
        setPasswordValidate(false)
        setErrorLowerCase(false)
        setErrorNumbers(false)
        setErrorMinMax(false)
        setErrorUpperCase(true)
      } else if (!regexLower.test(password)) {
        setPasswordValidate(false)
        setErrorUpperCase(false)
        setErrorNumbers(false)
        setErrorMinMax(false)
        setErrorLowerCase(true)
      } else if (!regexNum.test(password)) {
        setPasswordValidate(false)
        setErrorUpperCase(false)
        setErrorLowerCase(false)
        setErrorMinMax(false)
        setErrorNumbers(true)
      } else if (!regex.test(password)) {
        setPasswordValidate(false)
        setErrorUpperCase(false)
        setErrorLowerCase(false)
        setErrorNumbers(false)
        setErrorMinMax(true)
      } else if (errorUserNameSimilarity) {
        setErrorUpperCase(false)
        setErrorLowerCase(false)
        setErrorNumbers(false)
        setErrorMinMax(false)
        setPasswordValidate(false)
      } else {
        setErrorUpperCase(false)
        setErrorLowerCase(false)
        setErrorNumbers(false)
        setErrorMinMax(false)
      }
    } else {
      setErrorUpperCase(false)
      setErrorLowerCase(false)
      setErrorNumbers(false)
      setErrorMinMax(false)
    }
  }, [password, errorUserNameSimilarity, confirmPassword])

  useEffect(() => {
    const regex = /^[0-9a-zA-Z*.-_]{6,12}$/

    if (username !== "") {
      if (!regex.test(username)) {
        setErrorUsername(true)
        setUsernameValidate(false)
      } else {
        setErrorUsername(false)
        setUsernameValidate(true)
      }
    } else {
      setErrorUsername(false)
      setUsernameValidate(false)
    }
  }, [username])

  useEffect(() => {
    const regex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    regex.test(email) ? setEmailValidate(true) : setEmailValidate(false)
  }, [email])

  return (
    <>
      <AuthLayout
        back={<BtnBack onBack={onBackHandle} />}
        footer={
          <Footer
            title="A verify have an account?"
            btn="Login"
            onClickHandle={onLogin}
          />
        }
      >
        <Loading active={loading} />
        <Title title="Register" color="transparent" />
        <FirstRowStyled>
          <IonCol>
            <IonRow>
              <IonCol>
                <InputPrimary
                  setValue={email}
                  setPlaceholder="Email"
                  setType="email"
                  setIcon={mailOutline}
                  onChangeValue={(props) => setEmail(props)}
                  validate={emailValidate}
                  space={70}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  setValue={username}
                  setPlaceholder="Username"
                  setIcon={personCircleOutline}
                  onChangeValue={(props) => setUsername(props)}
                  validate={usernameValidate}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  setPlaceholder="Password"
                  setValue={password}
                  onChangeValue={(props) => setPassword(props)}
                  validate={passwordValidate}
                  setType="password"
                  setIcon={lockClosedOutline}
                  space={95}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  setPlaceholder="Confirm password"
                  setValue={confirmPassword}
                  onChangeValue={(props) => setConfirmPassword(props)}
                  validate={passwordValidate}
                  setType="password"
                  setIcon={lockClosedOutline}
                  space={152}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <BtnPrimary
                  disabled={btnRegister}
                  name="Register"
                  onClickHandle={onRegister}
                />
              </IonCol>
            </IonRow>
          </IonCol>

          <IonToast
            cssClass="message-custom"
            isOpen={errorCreate}
            onDidDismiss={() => setErrorCreate(false)}
            message={messageError}
            duration={5000}
            buttons={[
              {
                side: "end",
                icon: alertCircle,
              },
            ]}
          />
          <Toast active={errorConfirmPassword} message="Confirm Password" />
          <Toast
            active={errorUsername}
            message="Username must contain between 6 and 12 characters"
          />
          <Toast
            active={errorUpperCase}
            message="This password must contain uppercase"
          />
          <Toast
            active={errorLowerCase}
            message="This password must contain lowercase"
          />
          <Toast
            active={errorNumbers}
            message="This password must contain numbers"
          />
          <Toast
            active={errorMinMax}
            message="This password It must contain between 8 and 16 characters"
          />
          <Toast
            active={errorUserNameSimilarity}
            message="It should not be similar to the username."
          />
          <Toast
            active={confirmCreate}
            duration={6000}
            confirm={true}
            message="Register successful, Please confirm your email to continue with the experience"
            onDidDismiss={() => props.history.push("/login")}
          />
        </FirstRowStyled>
      </AuthLayout>
    </>
  )
}

export default Register
