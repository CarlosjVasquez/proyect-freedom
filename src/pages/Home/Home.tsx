import React, {useEffect} from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonButton,
  IonIcon,
  IonLoading,
} from "@ionic/react";
import { useQuery } from "@apollo/client"

import { personCircle, settings } from 'ionicons/icons';
import "./HomeStyles.scss"
import {Query} from "../../server/querys"

  
const user = Query.query.user;

const Home: React.FC = (props: any) => {

  const token = localStorage.getItem('token')

  const {loading, data} = useQuery<{ userslogs: any }>(user, {
    variables: {
      token: token
    },
    onCompleted: data => {
      if (data.userslogs.particularActivar === false ){
        props.history.push('/registerdata')
      }
    }
  })

  const userData = () =>{
    props.history.push('/userdata');
  }


  return (
    <IonPage>
      <IonLoading
        cssClass="loading-custom"
        isOpen={loading}
        message="loading"
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Hi, {data?.userslogs.username}</IonTitle>
          <IonButtons slot="secondary">
            <IonButton onClick={userData} >
              <IonIcon slot="icon-only" icon={personCircle} />
            </IonButton>
            <IonButton>
              <IonIcon slot="icon-only" icon={settings} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
