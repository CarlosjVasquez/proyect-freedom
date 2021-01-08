import React, { useState } from "react";
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
  IonRow,
  IonCol,
} from "@ionic/react";
import { useQuery, useMutation } from "@apollo/client"

import { personCircle, settings } from 'ionicons/icons';
import "./HomeStyles.scss"
import {Query} from "../../server/querys"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"

const up = Query.mutation.upload
const user = Query.query.user;

const Home: React.FC = (props: any) => {
  const [thefile, setThefile] = useState<string>("")
  const [id, setId] = useState<number>()
  const [nombre, setNombre] = useState<string>("")
  const [create, setCreate] = useState<string>("")

  const token = localStorage.getItem('token')

  const {loading, data} = useQuery<{ userslogs: any }>(user, {
    variables: {
      token: token
    },
    onCompleted: data => {
      if (!data.userslogs.activar ){
        props.history.push('/registerdata')
      }
      setId(data.userslogs.pk)
    }
  })

  const [uplo] = useMutation<{ myUpload: any }>(up, {
    variables: {
      nombre: nombre,
      idUserId: id,
      thefile: thefile,
      created: create,
    },
    onCompleted: (e) => {
      console.log(e)
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const widget = (window as any).cloudinary.createUploadWidget(
    {
      cloudName: "dhdjnyxht",
      uploadPreset: "iqspxphc",
    },
    (error: any, result: any) => checkUploadResult(result)
  )

  const checkUploadResult = (resultEvent: any) => {
    if (resultEvent.event === "success") {
      console.log(resultEvent)
      setThefile(resultEvent.info.url)
      setNombre(resultEvent.info.original_filename)
      setCreate(resultEvent.info.created_at)
      uplo()
    }
  }


  const userData = () =>{
    props.history.push('/userdata');
  }

  const showWidget = () => {
    widget.open()
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
        <IonRow>
          <IonCol>
            <BtnPrimary name="File Upload" onClickHandle={() => showWidget()} />
            <BtnPrimary name="View Files" onClickHandle={() => props.history.push('/listfiles')} />
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
