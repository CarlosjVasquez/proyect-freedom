import React, {useEffect, useState} from 'react'
import InputPrimary from '../../components/InputPrimary/InputPrimary'
import BtnPrimary from '../../components/BtnPrimary/BtnPrimary'
import BtnSecondary from '../../components/BtnSecondary/BtnSecondary'
import BtnBack from "../../components/BtnBack/BtnBack"

import { useQuery } from "@apollo/client"

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
} from '@ionic/react'
import {personCircle, search, alertCircle, personCircleOutline, mailOutline} from 'ionicons/icons'

import {Query} from "../../server/querys"

  
const user = Query.query.user;

const UserData: React.FC = (props:any) => {
  const [userName, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [isError, setIsError] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>("")
  const token = localStorage.getItem('token')

  const {loading, error, data} = useQuery<{ viewer: any }>(user, {
    variables: {
      token: token
    },
  })

  const onBackHandle = () => {
    props.history.goBack()
  }

  useEffect(() => {
    if(data){
      setEmail(data.viewer.email)
      setUsername(data.viewer.username)
    }
  }, [data])  


    return(
        <IonPage>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>User Data</IonTitle>
              <IonButtons slot="secondary">
                <IonButton >
                  <IonIcon slot="icon-only" icon={personCircle} />
                </IonButton>
                <IonButton>
                  <IonIcon slot="icon-only" icon={search} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent color="light">
          <IonRow>
          <IonCol>
          <IonLoading
        cssClass="loading-custom"
        isOpen={loading}
        message="loading"
      />
      <BtnBack color="primary" onBack={onBackHandle} />
          </IonCol>
            </IonRow> 
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
            <InputPrimary
                setValue={email}
                setPlaceholder="Email"
                setIcon={mailOutline}
                onChangeValue={(props: any) => setEmail(props)}
              />
            </IonCol>
          </IonRow>
        </IonCol>
        <IonToast
          cssClass="message-custom"
          isOpen={isError}
          onDidDismiss={() => setIsError(false)}
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
          </IonContent>
        </IonPage>
    )
}

export default UserData