import React, { useState } from 'react'
import { calendarOutline, call, cardOutline, personCircleOutline, alertCircle, personCircle, settings, checkmarkCircleOutline } from 'ionicons/icons'
import { IonCol, IonContent, IonHeader, IonIcon, IonItem, IonLoading, IonPage, IonRow, IonTitle, IonToolbar, IonDatetime, IonGrid, IonToast, IonButtons, IonButton } from "@ionic/react"

import { useMutation, useQuery } from "@apollo/client"
import {Query} from "../../server/querys"

import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import InputPrimary from "../../components/InputPrimary/InputPrimary"
import Title from '../../components/Title/Title'
import './RegisterDataStyles.scss'

const update = Query.mutation.update
const user = Query.query.user

const RegisterData: React.FC = (props: any) => {
    const [firstname, setFirstname] = useState<string>("")
    const [lastname, setLastname] = useState<string>("")
    const [particularRut, setParticularRut] = useState<string>("")
    const [particularTlf, setParticularTlf] = useState<string>("")
    const [particularSexo, setParticularSexo] = useState<string>("")
    const [particularFechaNacimiento, setParticularFechaNacimiento] =     useState<Date>()
    const token = localStorage.getItem('token')
    const [iduser, setIduser] = useState<any>()
    const [email, setEmail] = useState<string>("")
    
    const [error, setError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>("")
    const [confirmCreate, setConfirmCreate] = useState<boolean>(false)
    const [messageConfirm, setMessageConfirm] = useState<string>("")

    const {data} = useQuery<{ userslogs: any }>(user, {
      variables: {
        token: token
      },
      onCompleted: data => {
        setIduser(data.userslogs.id)
        setEmail(data.userslogs.email)
      }
    })
    const [updateData, {loading}] = useMutation<{ UpdateUserData: any }>(update, {
      variables: {
        id: iduser,
        email: email,
        firstName: firstname,
        lastName: lastname,
        particularRut: particularRut,
        particularTlf: particularTlf,
        particularSexo: particularSexo,
      },
    })

    const registerData = () => {
      if(firstname === ""){
        setMessageError("Please, firstname is required")
        setError(true)
        return
      }
      if(particularRut === ""){
        setMessageError("Please, Rut is required")
        setError(true)
        return
      }
      if(particularTlf === ""){
        setMessageError("Please, Mobile is required")
        setError(true)
        return
      }
      if(particularSexo === ""){
        setMessageError("Please, Gender is required")
        setError(true)
        return
      }
      if(particularFechaNacimiento === undefined){
        setMessageError("Please, Birthdate is required")
        setError(true)
        return
      }

      updateData()
      .then(
        () => {
          setMessageConfirm("Register successful")
          setConfirmCreate(true)
        }
      )
      .catch((e)=>{
        setMessageError("Error")
          setError(true)
          console.log(e)
      })
    }

    return (
        <IonPage>
            <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Hi, {data?.userslogs.username}</IonTitle>
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
              onChangeValue={(props: any)=> setParticularRut(props)}
              setIcon={cardOutline}
              setValue={particularRut}
              setPlaceholder="RUT"
              setType="number"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <InputPrimary
              onChangeValue={(props: any)=> setParticularTlf(props)}
              setIcon={call}
              setValue={particularTlf}
              setPlaceholder="Mobile"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <InputPrimary
              onChangeValue={(props: any)=> setParticularSexo(props)}
              setIcon={personCircleOutline}
              setValue={particularSexo}
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
                color={particularFechaNacimiento ? "success" : "light"}
                slot="start"
                icon={calendarOutline}
                className="custom-icon"
                />
                <IonDatetime 
                onIonChange={(e: CustomEvent) => setParticularFechaNacimiento(e.detail.value)}
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
        </IonPage>
    )
}

export default RegisterData