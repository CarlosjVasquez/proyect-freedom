import React, { useState } from "react"
import { card, person, calendar, mail } from "ionicons/icons"
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonIcon,
  IonInput,
  IonDatetime,
} from "@ionic/react"

const FormUser: React.FC<{
  rutExist: boolean
  selectUserValue: number | undefined
  onSelectUserValue: (value: number | undefined) => void
  selectRut: number | undefined
}> = (props) => {
  const [nombre, setNombre] = useState<string>()
  const [apellido, setApellido] = useState<string>()
  const [fechaN, setFechaN] = useState<Date>()
  const [email, setEmail] = useState<string>()

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem className="ion-justify-content-center ion-align-items-center">
            <IonLabel position="floating">RUT</IonLabel>
            <IonIcon
              color={props.selectUserValue ? "primary" : ""}
              className="ion-no-margin"
              slot="end"
              icon={card}
            ></IonIcon>
            <IonInput
              onIonChange={(e: CustomEvent) =>
                props.onSelectUserValue(e.detail.value)
              }
              type="number"
              value={props.selectRut}
              readonly={props.rutExist}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem className="ion-justify-content-center ion-align-items-center">
            <IonLabel position="floating">Nombre</IonLabel>
            <IonIcon
              color={nombre ? "primary" : ""}
              className="ion-no-margin"
              slot="end"
              icon={person}
            ></IonIcon>
            <IonInput
              onIonChange={(e: CustomEvent) => setNombre(e.detail.value)}
              type="text"
              value={nombre}
            ></IonInput>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem className="ion-justify-content-center ion-align-items-center">
            <IonLabel position="floating">Apellido</IonLabel>
            <IonIcon
              color={apellido ? "primary" : ""}
              className="ion-no-margin"
              slot="end"
              icon={person}
            ></IonIcon>
            <IonInput
              onIonChange={(e: CustomEvent) => setApellido(e.detail.value)}
              type="text"
              value={apellido}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem className="ion-justify-content-center ion-align-items-center">
            <IonLabel position="floating">Fecha de Nacimiento</IonLabel>
            <IonIcon
              color={fechaN ? "primary" : ""}
              className="ion-no-margin"
              slot="end"
              icon={calendar}
            ></IonIcon>
            <IonDatetime
              onIonChange={(e: CustomEvent) => setFechaN(e.detail.value)}
              displayFormat="DD MM YYYY"
              min="1980"
            ></IonDatetime>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem className="ion-justify-content-center ion-align-items-center">
            <IonLabel position="floating">Correo</IonLabel>
            <IonIcon
              color={email ? "primary" : ""}
              className="ion-no-margin"
              slot="end"
              icon={mail}
            ></IonIcon>
            <IonInput
              onIonChange={(e: CustomEvent) => setEmail(e.detail.value)}
              type="email"
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default FormUser
