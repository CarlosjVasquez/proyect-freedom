import { IonCol, IonRow } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { Query } from "../../server/querys"
import { useMutation } from "@apollo/client"
import { RouteComponentProps } from "react-router-dom"

import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import AuthLayout from "../../Layouts/AuthLayout/AuthLayout"
import InputPassword from "../../components/InputPassword/InputPassword"
import Toast from "../../components/Toast/Toast"
import Title from "../../components/Title/Title"
import Loading from "../../components/Loading/Loading"

const sendPasswordChange = Query.mutation.PasswordReset

interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string
  }> {}

const ResetPassword: React.FC<UserDetailPageProps> = ({ match, history }) => {
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [passwordValidate, setPasswordValidate] = useState<boolean>(false)
  const [confirmChangePassword, setConfirmChangePassword] =
    useState<boolean>(false)
  const [errorConfirmPassword, setErrorConfirmPassword] =
    useState<boolean>(false)

  const [errorTokenExpired, setErrorTokenExpired] = useState<boolean>(false)
  const [errorPasswordSimilar, setErrorPasswordSimilar] =
    useState<boolean>(false)

  const [errorUpperCase, setErrorUpperCase] = useState<boolean>(false)
  const [errorLowerCase, setErrorLowerCase] = useState<boolean>(false)
  const [errorNumbers, setErrorNumbers] = useState<boolean>(false)
  const [errorMinMax, setErrorMinMax] = useState<boolean>(false)

  const [changePassword, { loading }] = useMutation<{ passwordReset: any }>(
    sendPasswordChange,
    {
      variables: {
        token: match.params.id,
        newPassword1: newPassword,
        newPassword2: confirmPassword,
      },
      onCompleted: ({ passwordReset }) => {
        console.log(passwordReset)
        if (passwordReset.success) {
          setConfirmChangePassword(true)
          history.push("https://freedom-totem.herokuapp.com/xirux")
        } else {
          if (passwordReset.errors?.nonFieldErrors) {
            const error = passwordReset.errors.nonFieldErrors[0].code
            if (error === "expired_token") setErrorTokenExpired(true)
          } else if (passwordReset.errors?.newPassword1) {
            const error = passwordReset.errors.newPassword1[0].code

            if (error === "password_too_similar") setErrorPasswordSimilar(true)
          } else if (passwordReset.errors?.newPassword2) {
            const error = passwordReset.errors.newPassword2[0].code
            if (error === "password_too_similar") setErrorPasswordSimilar(true)
          }
        }
      },
      onError: (e) => {
        console.log(e)
      },
    }
  )

  useEffect(() => {
    if (confirmPassword !== "" || newPassword !== "") {
      if (confirmPassword !== newPassword) {
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
  }, [confirmPassword, newPassword])

  useEffect(() => {
    const regexUpper = /[A-Z]/
    const regexLower = /[a-z]/
    const regexNum = /[0-9]/
    const regex = /^[0-9a-zA-Z*.]{8,16}$/

    if (newPassword !== "") {
      if (!regexUpper.test(newPassword)) {
        setPasswordValidate(false)
        setErrorLowerCase(false)
        setErrorNumbers(false)
        setErrorMinMax(false)
        setErrorUpperCase(true)
      } else if (!regexLower.test(newPassword)) {
        setPasswordValidate(false)
        setErrorUpperCase(false)
        setErrorNumbers(false)
        setErrorMinMax(false)
        setErrorLowerCase(true)
      } else if (!regexNum.test(newPassword)) {
        setPasswordValidate(false)
        setErrorUpperCase(false)
        setErrorLowerCase(false)
        setErrorMinMax(false)
        setErrorNumbers(true)
      } else if (!regex.test(newPassword)) {
        setPasswordValidate(false)
        setErrorUpperCase(false)
        setErrorLowerCase(false)
        setErrorNumbers(false)
        setErrorMinMax(true)
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
  }, [newPassword, confirmPassword])

  return (
    <>
      <AuthLayout>
        <Loading active={loading} />
        <Title title="Recover Password" color="transparent" />
        <IonRow>
          <IonCol>
            <IonRow>
              <IonCol>
                <InputPassword
                  setPlaceholder="Password"
                  setValue={newPassword}
                  onChangeValue={(props) => setNewPassword(props)}
                  validate={passwordValidate}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPassword
                  setPlaceholder="Confirm password"
                  setValue={confirmPassword}
                  onChangeValue={(props) => setConfirmPassword(props)}
                  validate={passwordValidate}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <BtnPrimary
                  disabled={!passwordValidate}
                  name="Send"
                  onClickHandle={() => passwordValidate && changePassword()}
                />
              </IonCol>
            </IonRow>
          </IonCol>
          <Toast
            active={confirmChangePassword}
            duration={1500}
            confirm={true}
            message="Change Succesfull Return app"
          />
          <Toast
            active={errorTokenExpired}
            duration={1500}
            message="This Token Expired"
          />
          <Toast
            active={errorPasswordSimilar}
            duration={1500}
            message="The password is too similar to the first name"
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
          <Toast active={errorConfirmPassword} message="Confirm Password" />
        </IonRow>
      </AuthLayout>
    </>
  )
}

export default ResetPassword
