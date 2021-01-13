import React, { useEffect, useState } from "react"
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
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
} from "@ionic/react"
import { useQuery, useMutation, useLazyQuery } from "@apollo/client"

import { personCircle, settings, trash } from "ionicons/icons"
import "./HomeStyles.scss"
import { Query } from "../../server/querys"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"

const up = Query.mutation.upload
const user = Query.query.user
const listFiles = Query.query.allfiles
const fileDelete = Query.mutation.DeleteFile

const Home: React.FC = (props: any) => {
  const [thefile, setThefile] = useState<string>("")
  const [id, setId] = useState<number>()
  const [nombre, setNombre] = useState<string>("")
  const [create, setCreate] = useState<string>("")
  const [filesList, setFilesList] = useState<any>()
  const [name, setName] = useState<string>("")
  const [idUser, setIdUser] = useState<string>("")
  const [idDelete, setIdDelete] = useState<number>()

  const token = localStorage.getItem("token")

  const { loading, data } = useQuery<{ userslogs: any }>(user, {
    variables: {
      token: token,
    },
    onCompleted: ({ userslogs }) => {
      if (!userslogs.activar) {
        props.history.push("/registerdata")
      }
      setId(userslogs.pk)
      setIdUser(userslogs.id)
      files()
    },
    onError: (e) => {
      console.log(e)
      props.history.push("/login")
    },
  })

  const [files] = useLazyQuery<{ allUploads: any }>(listFiles, {
    variables: {
      nombre: name,
      id: idUser,
    },
    onCompleted: ({ allUploads }) => {
      setFilesList(allUploads.edges)
    },
    onError: (e) => {
      console.log(e)
    },
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
      props.history.go(0)
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const [deleteFile] = useMutation<{ deleteUser: any }>(fileDelete, {
    variables: {
      id: idDelete,
    },
    onCompleted: ({ deleteUser }) => {
      console.log(deleteUser)
      props.history.go(0)
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const deleteHandle = (e: any) => {
    setIdDelete(e)
    console.log(e)
  }

  useEffect(() => {
    deleteFile()
  }, [idDelete, deleteFile])

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

  const userData = () => {
    props.history.push("/userdata")
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
            <IonButton onClick={userData}>
              <IonIcon slot="icon-only" icon={personCircle} />
            </IonButton>
            <IonButton>
              <IonIcon slot="icon-only" icon={settings} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol>
            <IonList>
              {filesList &&
                filesList.map((file: any, key: any) => (
                  <IonItem key={key}>
                    <IonThumbnail slot="start">
                      <img
                        src="https://res.cloudinary.com/dhdjnyxht/image/upload/v1610127483/1490200250-20_82287_lmdtlr.png"
                        alt=""
                      />
                    </IonThumbnail>
                    <IonLabel>
                      <h2>{file.node.nombre}</h2>
                      <h6>
                        Created: {new Date(file.node.created).toLocaleString()}
                      </h6>
                    </IonLabel>
                    <IonButtons slot="end">
                      <IonButton
                        color=""
                        fill="clear"
                        className="btn-eye"
                        slot="start"
                        shape="round"
                        onClick={() => deleteHandle(file.node.pk)}
                      >
                        <IonIcon
                          slot="icon-only"
                          icon={trash}
                          color="#ff0000"
                        />
                      </IonButton>
                    </IonButtons>
                  </IonItem>
                ))}
            </IonList>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <BtnPrimary name="File Upload" onClickHandle={() => showWidget()} />
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  )
}

export default Home
