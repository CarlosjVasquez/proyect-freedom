import React, { useState, useEffect } from 'react'
import { calendarOutline, call, cardOutline, personCircleOutline, alertCircle, personCircle, settings, checkmarkCircleOutline } from 'ionicons/icons'
import { IonCol, IonContent, IonHeader, IonIcon, IonItem, IonLoading, IonPage, IonRow, IonTitle, IonToolbar, IonDatetime, IonGrid, IonToast, IonButtons, IonButton } from "@ionic/react"

import { useMutation, useQuery } from "@apollo/client"
import {Query} from "../../server/querys"

import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import InputPrimary from "../../components/InputPrimary/InputPrimary"
import Title from '../../components/Title/Title'
import Toast from '../../components/Toast/Toast'
import './RegisterDataStyles.scss'

const update = Query.mutation.update
const user = Query.query.user

const RegisterData: React.FC = (props: any) => {
    const [username, setUsername] = useState<string>("")
    const [firstname, setFirstname] = useState<string>("")
    const [lastname, setLastname] = useState<string>("")
    const [rut, setRut] = useState<string>("")
    const [tlf, setTlf] = useState<string>("")
    const [sexo, setSexo] = useState<string>("")
    const [fechaNacimiento, setFechaNacimiento] = useState<Date>()
    const token = localStorage.getItem('token')
    const [email, setEmail] = useState<string>("")
    const [confirmEmail, setconfirmEmail] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>("")
    const [confirmCreate, setConfirmCreate] = useState<boolean>(false)
    const [messageConfirm, setMessageConfirm] = useState<string>("")

      
    const {data} = useQuery<{ userslogs: any }>(user, {
        variables: {
          token: token
        },
        onCompleted: ({userslogs}) => {
            setEmail(userslogs.email)
            setUsername(userslogs.username)
            setconfirmEmail(true)    
        },
        onError: (e) => {
          console.log(e)
          props.history.push('/login')
        },
      })
    

      useEffect(() => {

      }, [data])


    const [updateData, {loading}] = useMutation<{ UpdateUserData: any }>(update, {
      variables: {
        email: email,
        firstName: firstname,
        lastName: lastname,
        rut: rut,
        tlf: tlf,
        sexo: sexo,
        fechaNacimiento: fechaNacimiento,
      },
      onCompleted: ({UpdateUserData}) => {
        if(UpdateUserData.success){
          setMessageConfirm("Register successful")
          setConfirmCreate(true)
        }
        console.log(UpdateUserData)
      },
      onError: (e) => {
        setMessageError("Error")
          setError(true)
          console.log(e)
      }
    })

    const registerData = () => {
      if(firstname === ""){
        setMessageError("Please, firstname is required")
        setError(true)
        return
      }
      if(rut === ""){
        setMessageError("Please, Rut is required")
        setError(true)
        return
      }
      if(tlf === ""){
        setMessageError("Please, Mobile is required")
        setError(true)
        return
      }
      if(sexo === ""){
        setMessageError("Please, Gender is required")
        setError(true)
        return
      }
      if(fechaNacimiento === undefined){
        setMessageError("Please, Birthdate is required")
        setError(true)
        return
      }
      updateData()
    }

    return (
        <IonPage>
            <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Hi, {username}</IonTitle>
          <IonButtons slot="secondary">
            <IonButton >
              <IonIcon slot="icon-only" icon={personCircle} />
            </IonButton>
            <IonButton>
              <IonIcon slot="icon-only" icon={settings} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
            <IonLoading isOpen={loading} message="loading" />
            <IonContent className="content" color="light">

                <IonGrid className="custom-grid">
            <Title title="Register Data" color="transparent" />
            <IonRow>
            <IonCol>
              <InputPrimary
              onChangeValue={(props: any)=> setFirstname(props)}
              setIcon={personCircleOutline}
              setValue={firstname}
              setPlaceholder="First Name"
              />
            </IonCol>          
          </IonRow>
          <IonRow>
            <IonCol>
              <InputPrimary
              onChangeValue={(props: any)=> setLastname(props)}
              setIcon={personCircleOutline}
              setValue={lastname}
              setPlaceholder="Last Name"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <InputPrimary
              onChangeValue={(props: any)=> setRut(props)}
              setIcon={cardOutline}
              setValue={rut}
              setPlaceholder="RUT"
              setType="number"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <InputPrimary
              onChangeValue={(props: any)=> setTlf(props)}
              setIcon={call}
              setValue={tlf}
              setPlaceholder="Mobile"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <InputPrimary
              onChangeValue={(props: any)=> setSexo(props)}
              setIcon={personCircleOutline}
              setValue={sexo}
              setPlaceholder="Gender"
              select={true}
              options={[
                  {option: 'Male'},
                  {option: 'Female'},
                ]
              }
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem color="login" lines="none" className="custom-date-item" >
                <IonIcon
                color={fechaNacimiento ? "success" : "light"}
                slot="start"
                icon={calendarOutline}
                className="custom-icon"
                />
                <IonDatetime 
                onIonChange={(e: CustomEvent) => setFechaNacimiento(e.detail.value)}
                displayFormat="DD MM YYYY"
                min="1980"
                placeholder="Birthdate"
                className="custom-date"
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
              <IonCol>
                <BtnPrimary name="Register" onClickHandle={registerData} />
              </IonCol>
            </IonRow>
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
          <IonToast
          cssClass="message-custom-confirm"
          isOpen={confirmCreate}
          onDidDismiss={() => props.history.push("/home")}
          message={messageConfirm}
          duration={1500}
          buttons={[
            {
              side: "end",
              icon: checkmarkCircleOutline,
            },
          ]}
        />
                </IonGrid>
            </IonContent>
            <Toast active={confirmEmail} duration={2000} confirm={true} message="Email Confirm" />
        </IonPage>
    )
}

export default RegisterData