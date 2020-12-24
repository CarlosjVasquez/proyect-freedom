import React from "react"
import { IonItem, IonIcon, IonInput } from "@ionic/react"
import "./InputPrimaryStyles.scss"

const InputPrimary: React.FC<{
  setValue?: string
  setIcon?: any
  setPlaceholder?: string
  setType?: "text" | "number" | "email"
  onChangeValue?: (value: any) => void
  validate?: boolean
}> = (props) => {
  const changeValue = (e: CustomEvent) => {
    props.onChangeValue && props.onChangeValue(e.detail.value)
  }

  return (
    <IonItem color="login" lines="none" className="custom-item">
      <IonIcon
        color={
          props.setType === "email"
            ? props.setValue
              ? props.validate
                ? "success"
                : "warning"
              : "light"
            : props.setValue
            ? "success"
            : "light"
        }
        slot="start"
        icon={props.setIcon}
        className="custom-icon"
      ></IonIcon>
      <IonInput
        onIonChange={changeValue}
        className="custom-input"
        placeholder={props.setPlaceholder}
        type={props.setType}
        value={props.setValue}
      ></IonInput>
    </IonItem>
  )
}

export default InputPrimary
