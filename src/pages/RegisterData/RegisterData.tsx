import React, { useState, useEffect } from "react"
import {
  calendarOutline,
  call,
  cardOutline,
  personCircleOutline,
  alertCircle,
  checkmarkCircleOutline,
} from "ionicons/icons"
import { IonCol, IonRow, IonToast } from "@ionic/react"

import { useMutation, useQuery } from "@apollo/client"
import { Query } from "../../server/querys"

import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import InputPrimary from "../../components/InputPrimary/InputPrimary"
import Toast from "../../components/Toast/Toast"
import AdminLayout from "../../Layouts/AdminLayout/AdminLayout"
import { FirstRowStyled } from "../../components/ContainerForm/ContainerForm"

const update = Query.mutation.update
const user = Query.query.user

const RegisterData: React.FC = (props: any) => {
  const [firstname, setFirstname] = useState<string>("")
  const [lastname, setLastname] = useState<string>("")
  const [rut, setRut] = useState<string>("")
  const [tlf, setTlf] = useState<string>("")
  const [sexo, setSexo] = useState<string>("")
  const [fechaNacimiento, setFechaNacimiento] = useState<any>("")
  const [pk, setPk] = useState()
  const token = localStorage.getItem("token")
  const [email, setEmail] = useState<string>("")
  const [confirmEmail, setconfirmEmail] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>("")
  const [confirmCreate, setConfirmCreate] = useState<boolean>(false)
  const [messageConfirm, setMessageConfirm] = useState<string>("")

  const { data } = useQuery<{ userslogs: any }>(user, {
    variables: {
      token: token,
    },
    onCompleted: ({ userslogs }) => {
      if (!userslogs.activar) {
        setEmail(userslogs.email)
        setPk(userslogs.pk)
        console.log(userslogs)
        setconfirmEmail(true)
      } else {
        // props.history.push("/home")
      }
    },
    onError: (e) => {
      console.log(e)
      props.history.push("/login")
    },
  })

  const [updateData, { loading }] = useMutation<{ UpdateUserData: any }>(
    update,
    {
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
          setMessageConfirm("Register successful")
          setConfirmCreate(true)
        }
        console.log(UpdateUserData)
      },
      onError: (e) => {
        setMessageError("Error")
        setError(true)
        console.log(e)
      },
    }
  )

  const registerData = () => {
    if (firstname === "") {
      setMessageError("Please, firstname is required")
      setError(true)
      return
    }
    if (rut === "") {
      setMessageError("Please, Rut is required")
      setError(true)
      return
    }
    if (tlf === "") {
      setMessageError("Please, Mobile is required")
      setError(true)
      return
    }
    if (sexo === "") {
      setMessageError("Please, Gender is required")
      setError(true)
      return
    }
    if (fechaNacimiento === undefined) {
      setMessageError("Please, Birthdate is required")
      setError(true)
      return
    }
    updateData()
  }

  useEffect(() => {
    if (rut !== "") {
      let tmpstr = ""
      let intlargo = rut
      if (intlargo.length > 0) {
        let crut = intlargo
        let largo = crut.length
        if (largo < 2) {
          console.log("rut inválido")
        }
        for (let i = 0; i < crut.length; i++)
          if (
            crut.charAt(i) != " " &&
            crut.charAt(i) != "." &&
            crut.charAt(i) != "-"
          ) {
            tmpstr = tmpstr + crut.charAt(i)
          }
        let rut = tmpstr
        crut = tmpstr
        largo = crut.length

        if (largo > 2) rut = crut.substring(0, largo - 1)
        else rut = crut.charAt(0)

        let dv = crut.charAt(largo - 1)

        if (rut == null || dv == null) console.log(0)

        let dvr = "0"
        let suma = 0
        let mul = 2

        for (let j = rut.length - 1; j >= 0; j--) {
          suma = suma + parseFloat(rut.charAt(j)) * mul
          if (mul == 7) mul = 2
          else mul++
        }

        let res = suma % 11
        if (res == 1) dvr = "k"
        else if (res == 0) dvr = "0"
        else {
          let dvi = 11 - res
          dvr = dvi + ""
        }

        if (dvr != dv.toLowerCase()) {
          console.log("El Rut Ingreso es Invalido")
        }
        console.log("El Rut Ingresado es Correcto!")
      }
    }
  }, [rut])

  return (
    <>
      <AdminLayout
        history={(e: any) => props.history.push(e)}
        loading={loading}
        username={data?.userslogs.username}
      >
        <FirstRowStyled marginTop={25}>
          <IonCol>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => setFirstname(props)}
                  setIcon={personCircleOutline}
                  setValue={firstname}
                  setPlaceholder="First Name"
                  color="admin"
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => setLastname(props)}
                  setIcon={personCircleOutline}
                  setValue={lastname}
                  setPlaceholder="Last Name"
                  color="admin"
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => setRut(props)}
                  setIcon={cardOutline}
                  setValue={rut}
                  setPlaceholder="RUT"
                  setType="number"
                  color="admin"
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <InputPrimary
                  onChangeValue={(props: any) => setTlf(props)}
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
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <BtnPrimary name="Save" onClickHandle={registerData} />
              </IonCol>
            </IonRow>
            <IonToast
              cssClass="message-custom"
              isOpen={error}
              onDidDismiss={() => setError(false)}
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
              onDidDismiss={() => props.history.push("/home")}
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
        <Toast
          active={confirmEmail}
          duration={2000}
          confirm={true}
          message="Email Confirm"
        />
      </AdminLayout>
    </>
  )
}

export default RegisterData
