import React, {useState, useEffect} from 'react'
import { IonPage,IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonLoading, IonContent, IonRow, IonCol, IonItem,IonThumbnail, IonLabel, IonList } from '@ionic/react'
import { useQuery, useMutation, useLazyQuery } from "@apollo/client"
import { personCircle, settings } from 'ionicons/icons';

import {Query} from "../../server/querys"

import BtnBack from "../../components/BtnBack/BtnBack"

const user = Query.query.user;
const listFiles = Query.query.allfiles


const ListFiles: React.FC = (props: any) => {
    const [nombre, setNombre] = useState<string>("")
    const [id, setId] = useState<string>("")
    const [filesList, setFilesList] = useState<any>()

  const token = localStorage.getItem('token')

    const { data } = useQuery<{ userslogs: any }>(user, {
        variables: {
          token: token
        },
        onCompleted:({userslogs})=>{
            setId(userslogs.id)
            files()
        }
    })

    const [ files ,{loading}] = useLazyQuery<{allUploads: any}>(listFiles,{
        variables:{
            nombre: nombre,
            id: id,
        },
        onCompleted: ({allUploads}) => {
            setFilesList(allUploads.edges)
            console.log(allUploads.edges)
        }
    })

    const onBackHandle = () =>{
        props.history.push('/home')
    }

    const userData = () =>{
        props.history.push('/userdata');
    }

    return(
        <IonPage>
            <IonLoading
        cssClass="loading-custom"
        isOpen={loading}
        message="loading"
      />
            <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton>
            <BtnBack onBack={onBackHandle} /> 
            </IonButton>
          </IonButtons>
          <IonTitle className="title-user">{data?.userslogs.username}</IonTitle>
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
              <IonList >
            {
                filesList && filesList.map((file:any, key: any)=>(
                    <IonItem key={key} color="light">
                        <IonThumbnail slot="start">
                            <img src="https://res.cloudinary.com/dhdjnyxht/image/upload/v1610127483/1490200250-20_82287_lmdtlr.png"
                            />
                        </IonThumbnail>
                        <IonLabel>
                          <h2>{file.node.nombre}</h2>
                          <h6>Created: {new Date(file.node.created).toLocaleString()}</h6> 
                        </IonLabel>
                      
                    </IonItem>
                ))
            }
            </IonList>
          </IonCol>
        </IonRow>
      </IonContent>
        </IonPage>
    )
}

export default ListFiles