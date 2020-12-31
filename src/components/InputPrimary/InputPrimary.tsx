import React from "react"
import { IonItem, IonIcon, IonInput, IonSelect, IonSelectOption } from "@ionic/react"
import "./InputPrimaryStyles.scss"

const InputPrimary: React.FC<{
  setValue?: string
  setIcon?: any
  setPlaceholder?: string
  setType?: "text" | "number" | "email"
  select?: boolean | undefined
  options?: any
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
          props.setType === "email" || props.validate !== undefined
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
      {
        !props.select ? (
          <IonInput
        onIonChange={changeValue}
        className="custom-input"
        placeholder={props.setPlaceholder}
        type={props.setType}
        value={props.setValue}
      />
        ) :
        ( 
          <IonSelect value={props.setValue} 
          placeholder={props.setPlaceholder}   
          onIonChange={changeValue}
          className="custom-input">
            {
              props.options.map((user: any, key: any) => (
                <IonSelectOption key={key} value={user.option.toLowerCase()}>{user.option}</IonSelectOption>
              ))
            }
          </IonSelect>
        )
      }
      
    </IonItem>
  )
}

export default InputPrimary
