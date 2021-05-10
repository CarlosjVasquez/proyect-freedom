import React, { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { IonRow, IonCol, IonToast } from "@ionic/react"
import {
  alertCircle,
  personCircleOutline,
  cardOutline,
  call,
  calendarOutline,
  checkmarkCircleOutline,
} from "ionicons/icons"

import InputPrimary from "../../components/InputPrimary/InputPrimary"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import { Query } from "../../server/querys"
import AdminLayout from "../../Layouts/AdminLayout/AdminLayout"
import { FirstRowStyled } from "../../components/ContainerForm/ContainerForm"
import BtnBack from "../../components/BtnBack/BtnBack"

const update = Query.mutation.update
const user = Query.query.userdata

const UserData: React.FC = (props: any) => {
  const [firstname, setFirstname] = useState<string>("")
  const [lastname, setLastname] = useState<string>("")
  const [rut, setRut] = useState<string>("")
  const [rutValidate, setRutValidate] = useState(false)
  const [tlf, setTlf] = useState<string>("")
  const [tlfValidate, setTlfValidate] = useState(false)
  const [sexo, setSexo] = useState<string>("")
  const [fechaNacimiento, setFechaNacimiento] = useState<string>()
  const [errorCreate, setErrorCreate] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>("")
  const [confirmCreate, setConfirmCreate] = useState<boolean>(false)
  const [messageConfirm, setMessageConfirm] = useState<string>("")
  const [pk, setPk] = useState()
  const [email, setEmail] = useState<string>("")
  const token = localStorage.getItem("token")

  const { loading, data } = useQuery<{ userslogs: any }>(user, {
    variables: {
      token: token,
    },
    onCompleted: ({ userslogs }) => {
      setFirstname(userslogs.firstName)
      setLastname(userslogs.lastName)
      setRut(userslogs.rut)
      setSexo(userslogs.sexo)
      setTlf(userslogs.tlf)
      setFechaNacimiento(userslogs.fechaNacimiento)
      setEmail(userslogs.email)
      setPk(userslogs.pk)
    },
  })

  const [updateData] = useMutation<{ UpdateUserData: any }>(update, {
    variables: {
      email: email,
      firstName: firstname,
      lastName: lastname,
      rut: rut,
      tlf: tlf,
      sexo: sexo,
      fechaNacimiento: fechaNacimiento,
      id: pk,
    },
    onCompleted: ({ UpdateUserData }) => {
      if (UpdateUserData.success) {
        setMessageConfirm("Successful Update")
        setConfirmCreate(true)
      }
    },
    onError: (e) => {
      setMessageError("Error")
      setErrorCreate(true)
      console.log(e)
    },
  })

  const registerData = () => {
    if (firstname === "") {
      setMessageError("Please, firstname is required")
      setErrorCreate(true)
      return
    }
    if (rut === "") {
      setMessageError("Please, Rut is required")
      setErrorCreate(true)
      return
    }
    if (!rutValidate) {
      setMessageError("Rut invalid")
      setErrorCreate(true)
      return
    }
    if (tlf === "") {
      setMessageError("Please, Mobile is required")
      setErrorCreate(true)
      return
    }
    if (!tlfValidate) {
      setMessageError("Mobile invalid")
      setErrorCreate(true)
      return
    }
    if (sexo === "") {
      setMessageError("Please, Gender is required")
      setErrorCreate(true)
      return
    }
    if (fechaNacimiento === undefined) {
      setMessageError("Please, Birthdate is required")
      setErrorCreate(true)
      return
    }

    updateData()
  }

  useEffect(() => {
    tlf.length < 10 ? setTlfValidate(false) : setTlfValidate(true)
  }, [tlf])

  const telFormat = (prop: any) => {
    const numberOnly = new RegExp(/^\d{0,10}$/)

    if (numberOnly.test(prop) || prop === "") {
      setTlf(prop)
    }
  }

  const rutFormat = (prop: any) => {
    const numberOnly = new RegExp(/^\d{0,10}$/)

    if (numberOnly.test(prop) || prop === "") {
      setRut(prop)
    }
  }

  const nameFormat = (prop: any) => {
    const letterOnly = new RegExp(/^[a-zA-Z]{0,16}$/)

    if (letterOnly.test(prop) || prop === "") {
      setFirstname(prop)
    }
  }

  const lastNameFormat = (prop: any) => {
    const letterOnly = new RegExp(/^[a-zA-Z]{0,16}$/)

    if (letterOnly.test(prop) || prop === "") {
      setLastname(prop)
    }
  }

  useEffect(() => {
    if (rut !== "") {
      let tmpstr = ""
      let intlargo = rut
      if (intlargo.length > 0) {
        let crut = intlargo
        let largo = crut.length
        if (largo < 2) {
          setRutValidate(false)
          return
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
          setRutValidate(false)
          return
        }
        setRutValidate(true)
      }
    }
  }, [rut])

  const onBackHandle = () => {
    props.history.push("/home")
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
                  setValue={firstname}
                  setPlaceholder="First Name"
                  color="admin"
                  disabled={true}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => lastNameFormat(props)}
                  setIcon={personCircleOutline}
                  setValue={lastname}
                  setPlaceholder="Last Name"
                  color="admin"
                  disabled={true}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => rutFormat(props)}
                  setIcon={cardOutline}
                  setValue={rut}
                  setPlaceholder="RUT"
                  setType="number"
                  color="admin"
                  disabled={true}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => telFormat(props)}
                  setIcon={call}
                  setValue={tlf}
                  setPlaceholder="Mobile"
                  color="admin"
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => setSexo(props)}
                  setIcon={personCircleOutline}
                  setValue={sexo}
                  setPlaceholder="Gender"
                  select={true}
                  options={[{ option: "Male" }, { option: "Female" }]}
                  color="admin"
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => setFechaNacimiento(props)}
                  setIcon={calendarOutline}
                  setValue={fechaNacimiento}
                  setPlaceholder="Birthdate"
                  date={true}
                  color="admin"
                  disabled={true}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <BtnPrimary name="upload" onClickHandle={registerData} />
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
