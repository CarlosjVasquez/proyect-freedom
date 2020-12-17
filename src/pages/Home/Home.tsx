import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonButton,
  IonIcon
} from "@ionic/react";

import { personCircle, search } from 'ionicons/icons';

import "./HomeStyles.scss"

const Home: React.FC = (props: any) => {

  const userData = () =>{
    props.history.push('/userdata');
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="secondary">
            <IonButton onClick={userData} >
              <IonIcon slot="icon-only" icon={personCircle} />
            </IonButton>
            <IonButton>
              <IonIcon slot="icon-only" icon={search} />
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
