import React, { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { IonRow, IonCol, IonToast } from "@ionic/react"
import {
  alertCircle,
  personCircleOutline,
  checkmarkCircleOutline,
} from "ionicons/icons"

import InputPrimary from "../../components/InputPrimary/InputPrimary"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import { Query } from "../../server/querys"
import AdminLayout from "../../Layouts/AdminLayout/AdminLayout"
import { FirstRowStyled } from "../../components/ContainerForm/ContainerForm"
import { RouteComponentProps } from "react-router-dom"

const { updateRazon } = Query.mutation
const { userdata, consultaRazon } = Query.query

interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string
  }> {}

const UserData: React.FC<UserDetailPageProps> = (props: any) => {
  const [socialRazon, setSocialRazon] = useState<string>("")
  const [rutRazon, setRutRazon] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [municipio, setMunicipio] = useState<string>("")
  const [direccion, setDireccion] = useState<string>("")
  const [giro, setGiro] = useState<string>("")
  const [errorCreate, setErrorCreate] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>("")
  const [confirmCreate, setConfirmCreate] = useState<boolean>(false)
  const [messageConfirm, setMessageConfirm] = useState<string>("")
  const [idUser, setIdUser] = useState<number>(0)
  const [id, setId] = useState<string>("")
  const token = localStorage.getItem("token")

  const [skipQuery, setSkipQuery] = useState(true)

  const { loading, data } = useQuery<{ userslogs: any }>(userdata, {
    variables: {
      token: token,
    },
    onCompleted: ({ userslogs }) => {
      setIdUser(userslogs.pk)
      setSkipQuery(false)
    },
    onError: (e) => {
      console.log(e)
      props.history.push("/login")
    },
  })

  const { loading: loadingRazon } = useQuery(consultaRazon, {
    variables: {
      id: props.match.params.id,
    },
    onCompleted: ({ consultaRazonSocial }) => {
      setId(consultaRazonSocial.pk)
      setSocialRazon(consultaRazonSocial.razonsocial)
      setRutRazon(consultaRazonSocial.rutRazon)
      setEmail(consultaRazonSocial.email)
      setCity(consultaRazonSocial.city)
      setMunicipio(consultaRazonSocial.municipio)
      setDireccion(consultaRazonSocial.direccion)
      setGiro(consultaRazonSocial.giro)
    },
    onError: (e) => {
      console.log(e)
    },
    skip: skipQuery,
  })

  const [RegisterRazon] = useMutation(updateRazon, {
    variables: {
      id,
      city,
      municipio,
      rutRazon,
      socialRazon,
      idUser,
      giro,
      direccion,
      email,
    },
    onCompleted: ({ actualizarRazon }) => {
      console.log(actualizarRazon)
      if (actualizarRazon.success) {
        setMessageConfirm("Business name updated")
        setConfirmCreate(true)
      }
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const registerData = () => {
    if (socialRazon === "") {
      setMessageError("Please, Razon Social is required")
      setErrorCreate(true)
      return
    }
    if (rutRazon === "") {
      setMessageError("Please, Rut is required")
      setErrorCreate(true)
      return
    }
    if (email === "") {
      setMessageError("Please, Email is required")
      setErrorCreate(true)
      return
    }
    if (city === "") {
      setMessageError("Please, Ciudad is required")
      setErrorCreate(true)
      return
    }
    if (municipio === "") {
      setMessageError("Please, Municipio is required")
      setErrorCreate(true)
      return
    }
    if (direccion === "") {
      setMessageError("Please, Direccion is required")
      setErrorCreate(true)
      return
    }
    if (giro === "") {
      setMessageError("Please, Giro is required")
      setErrorCreate(true)
      return
    }

    RegisterRazon()
  }

  return (
    <>
      <AdminLayout
        history={(e: any) => props.history.push(e)}
        loading={loading}
        username={data?.userslogs.username}
      >
        <FirstRowStyled marginTop={25}>
          <IonCol>
            {loadingRazon ? (
              <>Loading...</>
            ) : (
              <>
                <IonRow>
                  <IonCol>
                    <InputPrimary
                      onChangeValue={(props: any) => setSocialRazon(props)}
                      setIcon={personCircleOutline}
                      setValue={socialRazon}
                      setPlaceholder="Razon Social"
                      color="admin"
                      space={120}
                      disabled={true}
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <InputPrimary
                      onChangeValue={(props: any) => setRutRazon(props)}
                      setIcon={personCircleOutline}
                      setValue={rutRazon}
                      setPlaceholder="Rut"
                      color="admin"
                      space={55}
                      disabled={true}
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <InputPrimary
                      onChangeValue={(props: any) => setEmail(props)}
                      setValue={email}
                      setPlaceholder="Email"
                      color="admin"
                      setType="email"
                      space={70}
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <InputPrimary
                      onChangeValue={(props: any) => setCity(props)}
                      setIcon={personCircleOutline}
                      setValue={city}
                      setPlaceholder="Ciudad"
                      color="admin"
                      space={80}
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <InputPrimary
                      onChangeValue={(props: any) => setMunicipio(props)}
                      setIcon={personCircleOutline}
                      setValue={municipio}
                      setPlaceholder="Municipio"
                      color="admin"
                      space={95}
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <InputPrimary
                      onChangeValue={(props: any) => setDireccion(props)}
                      setIcon={personCircleOutline}
                      setValue={direccion}
                      setPlaceholder="Dirección"
                      color="admin"
                      space={95}
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <InputPrimary
                      onChangeValue={(props: any) => setGiro(props)}
                      setIcon={personCircleOutline}
                      setValue={giro}
                      setPlaceholder="Giro"
                      color="admin"
                      space={60}
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <BtnPrimary name="upload" onClickHandle={registerData} />
                  </IonCol>
                </IonRow>
              </>
            )}

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
              onDidDismiss={() => setConfirmCreate(false)}
              message={messageConfirm}
              duration={1500}
              buttons={[
                {
                  side: "end",
                  icon: checkmarkCircleOutline,
                },
              ]}
            />
          </IonCol>
        </FirstRowStyled>
      </AdminLayout>
    </>
  )
}

export default UserData
