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
import { useQuery, useMutation } from "@apollo/client"

import { personCircle, settings, trash } from "ionicons/icons"
import "./HomeStyles.scss"
import { Query } from "../../server/querys"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"

const up = Query.mutation.upload
const user = Query.query.user
const {allfiles: FILES} = Query.query
const { delete: FDELETE } = Query.mutation;

const Home: React.FC = (props: any) => {
  const [thefile, setThefile] = useState<string>("")
  const [id, setId] = useState<number>()
  const [nombre, setNombre] = useState<string>("")
  const [create, setCreate] = useState<string>("")
  const [filesList, setFilesList] = useState<any>()
  const [name, setName] = useState<string>("")
  const [idUser, setIdUser] = useState<string>("")

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
      setSkipQuery(false)
    },
    onError: (e) => {
      console.log(e)
      props.history.push("/login")
    },
  })

  const [skipQuery, setSkipQuery] = useState(true);

  const { loading: loadFile, data: fileData, error: errorData } = useQuery(
    FILES,
    {
      variables: {
        id: idUser,
        name: "",
      },
      skip: skipQuery,
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (!skipQuery) {
      const onCompleted = ({allUploads}: any) => {
        setFilesList(allUploads.edges)
      };

      const onError = (e: any) => {
        console.log(e);
      };

      if (onError || onCompleted) {
        if (onCompleted && !loadFile && !errorData) {
          //SuccessFunctionHere
          setSkipQuery(true);
          onCompleted(fileData)
        } else if (onError && !loadFile && errorData) {
          //ErrorFunctionHere
          setSkipQuery(true);
          console.log("error login");
          onError(errorData);
        }
      }
    }
  }, [loadFile, fileData, errorData, skipQuery]);


  const [uplo] = useMutation<{ myUpload: any }>(up, {
    variables: {
      nombre: nombre,
      idUserId: id,
      thefile: thefile,
      created: create,
    },
    onCompleted: (e) => {
      setSkipQuery(false);
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const [idFile, setIdFile] = useState("");

  const [fileDelete] = useMutation(FDELETE, {
    variables: {
      id: idFile,
    },
    onCompleted: () => {
      setSkipQuery(false);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    if (idFile !== "") {
      fileDelete();
    }
  }, [idFile, fileDelete]);

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
      setThefile(resultEvent.info.secure_url)
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
                        onClick={() => setIdFile(file.node.pk)}
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
