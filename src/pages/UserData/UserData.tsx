import React, { useState } from 'react'
import InputPrimary from '../../components/InputPrimary/InputPrimary'
import BtnBack from "../../components/BtnBack/BtnBack"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"

import { useQuery, useMutation } from "@apollo/client"
import {Query} from "../../server/querys"

import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonRow,
    IonCol,
    IonToast,
    IonLoading,
    IonGrid,
    IonItem, 
    IonDatetime
} from '@ionic/react'
import {personCircle, settings, alertCircle, personCircleOutline, cardOutline,call, calendarOutline, checkmarkCircleOutline} from 'ionicons/icons'

import Title from '../../components/Title/Title'
import './UserData.scss'

const update = Query.mutation.update
const user = Query.query.userdata

const UserData: React.FC = (props:any) => {
  const [firstname, setFirstname] = useState<string>("")
    const [lastname, setLastname] = useState<string>("")
    const [rut, setRut] = useState<string>("")
    const [tlf, setTlf] = useState<string>("")
    const [sexo, setSexo] = useState<string>("")
    const [fechaNacimiento, setFechaNacimiento] = useState<string>()
    const [errorCreate, setErrorCreate] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>("")
    const [confirmCreate, setConfirmCreate] = useState<boolean>(false)
    const [messageConfirm, setMessageConfirm] = useState<string>("")
    const [iduser, setIduser] = useState<any>()
    const [email, setEmail] = useState<string>("")
  const token = localStorage.getItem('token')

  const {loading, data} = useQuery<{ userslogs: any }>(user, {
    variables: {
      token: token
    },
    onCompleted: data => {
      setFirstname(data.userslogs.firstName)
      setLastname(data.userslogs.lastName)
      setRut(data.userslogs.rut)
      setSexo(data.userslogs.sexo)
      setTlf(data.userslogs.tlf)
      setFechaNacimiento(data.userslogs.fechaNacimiento)
      setIduser(data.userslogs.id)
      setEmail(data.userslogs.email)
      console.log(data)
    }
  })

  const onBackHandle = () => {
    props.history.push('/home')
  }
  
  const [updateData] = useMutation<{ UpdateUserData: any }>(update, {
    variables: {
      id: iduser,
      email: email,
      firstName: firstname,
      lastName: lastname,
      rut: rut,
      tlf: tlf,
      sexo: sexo,
      fechaNacimiento: fechaNacimiento,
    },
  })

  const registerData = () => {
    if(firstname === ""){
      setMessageError("Please, firstname is required")
      setErrorCreate(true)
      return
    }
    if(rut === ""){
      setMessageError("Please, Rut is required")
      setErrorCreate(true)
      return
    }
    if(tlf === ""){
      setMessageError("Please, Mobile is required")
      setErrorCreate(true)
      return
    }
    if(sexo === ""){
      setMessageError("Please, Gender is required")
      setErrorCreate(true)
      return
    }
    if(fechaNacimiento === undefined){
      setMessageError("Please, Birthdate is required")
      setErrorCreate(true)
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
        setErrorCreate(true)
        console.log(e)
    })
  }

    return(
        <IonPage>
          <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton>
            <BtnBack onBack={onBackHandle} /> 
            </IonButton>
          </IonButtons>
          <IonTitle className="title-user">{data?.userslogs.username}</IonTitle>
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
          <IonContent color="light">
          <IonGrid className="custom-grid">
          <Title title="User Data" color="transparent" />
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
                value={fechaNacimiento}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
              <IonCol>
                <BtnPrimary name="upload" onClickHandle={registerData} />
              </IonCol>
            </IonRow>
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
          onDidDismiss={() => props.history.push("/userdata")}
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

export default UserData