import React, { useEffect, useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { IonRow, IonCol, IonToast } from "@ionic/react"
import {
  alertCircle,
  personCircleOutline,
  checkmarkCircleOutline,
  navigate,
  map,
  business,
  mail,
} from "ionicons/icons"

import InputPrimary from "../../components/InputPrimary/InputPrimary"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import { Query } from "../../server/querys"
import AdminLayout from "../../Layouts/AdminLayout/AdminLayout"
import { FirstRowStyled } from "../../components/ContainerForm/ContainerForm"
import BtnBack from "../../components/BtnBack/BtnBack"

const { createRazon } = Query.mutation
const { listRazon } = Query.query

const user = Query.query.userdata

const UserData: React.FC = (props: any) => {
  const [socialRazon, setSocialRazon] = useState<string>("")
  const [rutRazon, setRutRazon] = useState<string>("")
  const [rutValidate, setRutValidate] = useState(false)
  const [email, setEmail] = useState<string>("")
  const [emailValidate, setEmailValidate] = useState<boolean>(false)
  const [city, setCity] = useState<string>("")
  const [municipio, setMunicipio] = useState<string>("")
  const [direccion, setDireccion] = useState<string>("")
  const [giro, setGiro] = useState<string>("")
  const [errorCreate, setErrorCreate] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>("")
  const [confirmCreate, setConfirmCreate] = useState<boolean>(false)
  const [messageConfirm, setMessageConfirm] = useState<string>("")
  const [idUser, setIdUser] = useState<number>(0)
  const token = localStorage.getItem("token")

  const { loading, data } = useQuery<{ userslogs: any }>(user, {
    variables: {
      token: token,
    },
    onCompleted: ({ userslogs }) => {
      setIdUser(userslogs.pk)
    },
    onError: (e) => {
      console.log(e)
      props.history.push("/login")
    },
  })

  const [RegisterRazon] = useMutation(createRazon, {
    refetchQueries: [
      {
        query: listRazon,
        variables: { idUser },
      },
    ],
    variables: {
      city,
      municipio,
      rutRazon,
      socialRazon,
      idUser,
      giro,
      direccion,
      email,
    },
    onCompleted: ({ crearRazon }) => {
      console.log(crearRazon)
      if (crearRazon.success) {
        setMessageConfirm("Business name created")
        setConfirmCreate(true)
        props.history.push("/business")
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
    if (!rutValidate) {
      setMessageError("Rut invalid")
      setErrorCreate(true)
      return
    }
    if (email === "") {
      setMessageError("Please, Email is required")
      setErrorCreate(true)
      return
    }
    if (!emailValidate) {
      setMessageError("Email invalid")
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

  useEffect(() => {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    regex.test(email) ? setEmailValidate(true) : setEmailValidate(false)
  }, [email])

  useEffect(() => {
    if (rutRazon !== "") {
      let tmpstr = ""
      let intlargo = rutRazon
      if (intlargo.length > 0) {
        let crut = rutRazon
        let largo = crut.length
        if (largo <= 2) {
          return setRutValidate(false)
        }
        for (let i = 0; i < crut.length; i++)
          if (
            crut.charAt(i) !== " " &&
            crut.charAt(i) !== "." &&
            crut.charAt(i) !== "-"
          ) {
            tmpstr = tmpstr + crut.charAt(i)
          }
        let rut = tmpstr
        crut = tmpstr
        largo = crut.length

        if (largo > 2) rut = crut.substring(0, largo - 1)
        else rut = crut.charAt(0)

        let dv = crut.charAt(largo - 1)

        if (rut === null || dv === null) console.log(0)

        let dvr = "0"
        let suma = 0
        let mul = 2

        for (let j = rut.length - 1; j >= 0; j--) {
          suma = suma + parseFloat(rut.charAt(j)) * mul
          if (mul === 7) mul = 2
          else mul++
        }

        let res = suma % 11
        if (res === 1) dvr = "k"
        else if (res === 0) dvr = "0"
        else {
          let dvi = 11 - res
          dvr = dvi + ""
        }

        if (dvr !== dv.toLowerCase()) {
          return setRutValidate(false)
        }
        setRutValidate(true)
      }
    }
  }, [rutRazon])

  const nameFormat = (prop: any) => {
    const letterOnly = new RegExp(/^[a-zA-Z]{0,30}$/)

    if (letterOnly.test(prop) || prop === "") {
      setSocialRazon(prop)
    }
  }

  const rutFormat = (prop: any) => {
    const numberOnly = new RegExp(/^\d{0,10}$/)

    if (numberOnly.test(prop) || prop === "") {
      setRutRazon(prop)
    }
  }

  const onBackHandle = () => {
    props.history.push("/business")
  }

  return (
    <>
      <AdminLayout
        history={(e: any) => props.history.push(e)}
        loading={loading}
        username={data?.userslogs.username}
      >
        <FirstRowStyled>
          <BtnBack onBack={onBackHandle} color="primary" />
          <IonCol>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => nameFormat(props)}
                  setIcon={personCircleOutline}
                  setValue={socialRazon}
                  setPlaceholder="Razon Social"
                  color="admin"
                  space={120}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => rutFormat(props)}
                  setIcon={personCircleOutline}
                  setValue={rutRazon}
                  setPlaceholder="Rut"
                  color="admin"
                  space={55}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => setEmail(props)}
                  setIcon={mail}
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
                  onChangeValue={(props: any) => setMunicipio(props)}
                  setIcon={business}
                  setValue={municipio}
                  setPlaceholder="Región"
                  color="admin"
                  space={95}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => setCity(props)}
                  setIcon={business}
                  setValue={city}
                  setPlaceholder="Comuna"
                  color="admin"
                  space={80}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => setDireccion(props)}
                  setIcon={map}
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
                  setIcon={navigate}
                  setValue={giro}
                  setPlaceholder="Giro"
                  color="admin"
                  space={60}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <BtnPrimary
                  disabled={
                    socialRazon !== "" &&
                    rutRazon !== "" &&
                    email !== "" &&
                    city !== "" &&
                    municipio !== "" &&
                    direccion !== "" &&
                    giro !== ""
                      ? false
                      : true
                  }
                  name="Register"
                  onClickHandle={registerData}
                />
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
