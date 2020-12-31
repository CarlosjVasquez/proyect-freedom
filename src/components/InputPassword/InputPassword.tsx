import React, { useState } from "react"
import { IonItem, IonInput, IonButton, IonIcon, IonButtons, IonToast } from "@ionic/react"
import { eyeOutline, eyeOffOutline, lockClosedOutline, information } from "ionicons/icons"
import './InputPasswordStyles.scss'

const InputPassword: React.FC<{
  setValue?: string
  setPlaceholder?: string
  onChangeValue?: (value: any) => void
  validate?: boolean | undefined
  infoMessage?: string
}> = (props) => {
  const [viewValue, setViewValue] = useState<boolean>(false)
  const [typeValue, setTypeValue] = useState<boolean>(false)
  const [message, setMessage] = useState<boolean>(false)

  const inputChangeValue = (e: CustomEvent) => {
    props.onChangeValue && props.onChangeValue(e.detail.value)
  }

  const onViewValueHandle = () => {
    viewValue ? setViewValue(false) : setViewValue(true)
    viewValue ? setTypeValue(false) : setTypeValue(true)
  }

  return (
    <IonItem color="login" lines="none" className="custom-item">
      <IonIcon
        color={
          props.validate === undefined
            ? props.setValue
              ? "success"
              : "light"
            : props.setValue
            ? props.validate
              ? "success"
              : "warning"
            : "light"
        }
        slot="start"
        icon={lockClosedOutline}
        className="custom-icon"
      />
      <IonInput
        className="custom-input"
        onIonChange={inputChangeValue}
        placeholder={props.setPlaceholder}
        type={typeValue ? "text" : "password"}
      ></IonInput>
      <IonButtons>
        <IonButton
          color="light"
          fill="clear"
          className="btn-eye"
          slot="start"
          shape="round"
          onClick={onViewValueHandle}
        >
          <IonIcon
            slot="icon-only"
            icon={viewValue ? eyeOutline : eyeOffOutline}
          />
        </IonButton>
        {
            !!props.infoMessage && (
        <IonButton
          color="warning"
          fill="clear"
          className="btn-eye"
          slot="end"
          shape="round"
          onClick={() => setMessage(true)}
        >
          <IonIcon
            slot="icon-only"
            icon={information}
          />
        </IonButton>
        )
      }
      </IonButtons>
      <IonToast
        cssClass="message-custom-info"
          isOpen={message} 
          message={props?.infoMessage}
          onDidDismiss={() => setMessage(false)}
          duration={5000}
          buttons={[
            {
              side: "end",
              icon: information,
            },
          ]}
        />
    </IonItem>
  )
}

export default InputPassword
