import React, { useState } from "react"
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

const update = Query.mutation.update
const user = Query.query.userdata

const UserData: React.FC = (props: any) => {
  const [firstname, setFirstname] = useState<string>("")
  const [lastname, setLastname] = useState<string>("")
  const [rut, setRut] = useState<string>("")
  const [tlf, setTlf] = useState<string>("")
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
    onCompleted: (data) => {
      setFirstname(data.userslogs.firstName)
      setLastname(data.userslogs.lastName)
      setRut(data.userslogs.rut)
      setSexo(data.userslogs.sexo)
      setTlf(data.userslogs.tlf)
      setFechaNacimiento(data.userslogs.fechaNacimiento)
      setEmail(data.userslogs.email)
      setPk(data.userslogs.pk)
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
    if (tlf === "") {
      setMessageError("Please, Mobile is required")
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
      .then(() => {
        setMessageConfirm("Register successful")
        setConfirmCreate(true)
      })
      .catch((e) => {
        setMessageError("Error")
        setErrorCreate(true)
        console.log(e)
      })
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
