import { IonCol, IonLoading, IonPage, IonRow } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import {
    mailOutline,
  } from "ionicons/icons"
import { Query } from '../../server/querys'
import {useMutation} from '@apollo/client'

import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import BtnBack from "../../components/BtnBack/BtnBack"
import LayoutFirst from "../../components/LayoutFirst/LayoutFirst"
import InputPrimary from "../../components/InputPrimary/InputPrimary"
import Toast from '../../components/Toast/Toast'
import Title from '../../components/Title/Title'
import Footer from '../../components/Footer/Footer'

const sendEmailPassword = Query.mutation.sendPasswordReset

const ResetPasswordEmail: React.FC = (props: any) => {
    const [email, setEmail] = useState<string>("")
    const [emailValidate, setEmailValidate] = useState<boolean>(false)
    const [confirmEmail, setConfirmEmail] = useState<boolean>(false)
    const [errorEmail, setErrorEmail] = useState<boolean>(false)

    const [emailPassword, { loading }] = useMutation<{sendPasswordResetEmail: any}>(
        sendEmailPassword,
        {
            variables: {
                email
            },
            onCompleted: ({sendPasswordResetEmail}) => {
                console.log(sendPasswordResetEmail)
                if(sendPasswordResetEmail.success){
                    setConfirmEmail(true)
                }else{
                    setErrorEmail(true)
                }
            },
            onError: (e) => {
                console.log(e)
            }
        }
    )

    useEffect(() => {
        const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        
        regex.test(email) ? setEmailValidate(true) : setEmailValidate(false)
    
      }, [email])

    const onBackHandle = () => {
        props.history.push('/login')
    }

    const onRegister = () => {
        props.history.push('/register')
    }

    return(
        <IonPage>
            <BtnBack onBack={onBackHandle} /> 
            <IonLoading 
                cssClass="loading-custom"
                isOpen={loading}
                message="loading"
            />
            <LayoutFirst>
                <Title title="Recover Password" color="transparent" />
                <IonRow>
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
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <BtnPrimary disabled={!emailValidate} name="Send" onClickHandle={() => emailPassword()} />
                          </IonCol>
                        </IonRow>
                    </IonCol>
                    <Toast active={confirmEmail} confirm={true} message="Please enter the link that has been sent to your email to change the password" />
                    <Toast active={errorEmail} duration={1500} message="Please enter a valid email" />
                </IonRow>
            </LayoutFirst>
            <Footer title="Dont have account?" btn="Register" link={onRegister}  />
        </IonPage>
    )
}

export default ResetPasswordEmail