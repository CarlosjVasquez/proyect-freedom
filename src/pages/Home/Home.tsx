import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  IonButton,
  IonIcon,
  IonCol,
  IonList,
  IonCard,
  IonCardContent,
  IonSpinner,
} from "@ionic/react"
import { useQuery, useMutation } from "@apollo/client"

import { refresh } from "ionicons/icons"

import { Query } from "../../server/querys"
import BtnAddFile from "../../components/Admin/BtnAddFile/BtnAddFile"
import File from "../../components/Admin/File/File"
import AdminLayout from "../../Layouts/AdminLayout/AdminLayout"
import { FirstRowStyled } from "../../components/ContainerForm/ContainerForm"

const user = Query.query.user
const { allfiles: FILES } = Query.query
const { delete: FDELETE } = Query.mutation

const Home: React.FC = (props: any) => {
  const [id, setId] = useState<number>()
  const [filesList, setFilesList] = useState<any>()
  const [idUser, setIdUser] = useState<string>("")
  const [skipQuery, setSkipQuery] = useState(true)

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
  )

  useEffect(() => {
    if (!skipQuery) {
      const onCompleted = ({ allUploads }: any) => {
        setFilesList(allUploads.edges)
      }

      const onError = (e: any) => {
        console.log(e)
      }

      if (onError || onCompleted) {
        if (onCompleted && !loadFile && !errorData) {
          //SuccessFunctionHere
          setSkipQuery(true)
          onCompleted(fileData)
        } else if (onError && !loadFile && errorData) {
          //ErrorFunctionHere
          setSkipQuery(true)
          console.log("error login")
          onError(errorData)
        }
      }
    }
  }, [loadFile, fileData, errorData, skipQuery])

  const [idFile, setIdFile] = useState("")

  const [fileDelete] = useMutation(FDELETE, {
    variables: {
      id: idFile,
    },
    onCompleted: () => {
      setSkipQuery(false)
    },
    onError: (e) => {
      console.log(e)
    },
  })

  useEffect(() => {
    if (idFile !== "") {
      fileDelete()
    }
  }, [idFile, fileDelete])

  const menubuttons = (
    <>
      <IonButton onClick={() => setSkipQuery(false)}>
        <IonIcon slot="icon-only" icon={refresh} />
      </IonButton>
      <BtnAddFile idUser={id} onSuccess={() => setSkipQuery(false)} />
    </>
  )

  return (
    <>
      <AdminLayout
        history={(e: any) => props.history.push(e)}
        loading={loading}
        username={data?.userslogs.username}
        menuButtons={menubuttons}
      >
        <FirstRowStyled>
          <IonCol>
            <ListStyled>
              {loadFile ? (
                <CardSpinnerStyled>
                  <IonSpinner />
                </CardSpinnerStyled>
              ) : filesList && filesList.length > 0 ? (
                filesList.map((file: any, key: any) => (
                  <File
                    key={key}
                    file={file}
                    onDelete={(e: any) => setIdFile(e)}
                  />
                ))
              ) : (
                <CardStyled>
                  <IonCardContent>+ Add Files</IonCardContent>
                  <BtnAddFile
                    idUser={id}
                    onSuccess={() => setSkipQuery(false)}
                    color="primary"
                  />
                </CardStyled>
              )}
            </ListStyled>
          </IonCol>
        </FirstRowStyled>
      </AdminLayout>
    </>
  )
}

const ListStyled = styled(IonList)`
  background: transparent !important;
`

const CardStyled = styled(IonCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  margin: 0;
`

const CardSpinnerStyled = styled(IonCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  box-shadow: none !important;
  background: transparent !important;
  margin: 0;
`

export default Home
