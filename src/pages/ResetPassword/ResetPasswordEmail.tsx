import { IonCol, IonRow } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { mailOutline } from "ionicons/icons"
import { Query } from "../../server/querys"
import { useMutation } from "@apollo/client"

import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import BtnBack from "../../components/BtnBack/BtnBack"
import AuthLayout from "../../Layouts/AuthLayout/AuthLayout"
import InputPrimary from "../../components/InputPrimary/InputPrimary"
import Toast from "../../components/Toast/Toast"
import Title from "../../components/Title/Title"
import Footer from "../../components/Auth/Footer/Footer"
import Loading from "../../components/Loading/Loading"
import { FirstRowStyled } from "../../components/ContainerForm/ContainerForm"

const sendEmailPassword = Query.mutation.sendPasswordReset

const ResetPasswordEmail: React.FC = (props: any) => {
  const [email, setEmail] = useState<string>("")
  const [emailValidate, setEmailValidate] = useState<boolean>(false)
  const [confirmEmail, setConfirmEmail] = useState<boolean>(false)
  const [errorEmail, setErrorEmail] = useState<boolean>(false)

  const [emailPassword, { loading }] = useMutation<{
    sendPasswordResetEmail: any
  }>(sendEmailPassword, {
    variables: {
      email,
    },
    onCompleted: ({ sendPasswordResetEmail }) => {
      console.log(sendPasswordResetEmail)
      if (sendPasswordResetEmail.success) {
        setConfirmEmail(true)
      } else {
        setErrorEmail(true)
      }
    },
    onError: (e) => {
      console.log(e)
    },
  })

  useEffect(() => {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    regex.test(email) ? setEmailValidate(true) : setEmailValidate(false)
  }, [email])

  const onBackHandle = () => {
    props.history.push("/login")
  }

  const onRegister = () => {
    props.history.push("/register")
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
        <Title title="Recover" color="transparent" />
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
                <BtnPrimary
                  disabled={!emailValidate}
                  name="Send"
                  onClickHandle={() => emailPassword()}
                />
              </IonCol>
            </IonRow>
          </IonCol>
          <Toast
            active={confirmEmail}
            confirm={true}
            message="Please enter the link that has been sent to your email to change the password"
          />
          <Toast
            active={errorEmail}
            duration={1500}
            message="Please enter a valid email"
          />
        </FirstRowStyled>
      </AuthLayout>
    </>
  )
}

export default ResetPasswordEmail
