import React from "react"
import styled from "styled-components"

import {
  IonItem,
  IonIcon,
  IonSelectOption,
  IonSelect,
  IonLabel,
  IonInput,
} from "@ionic/react"

const InputConfig: React.FC<{
  icon: any
  options: any
  title: string
  type: "select" | "text"
  placeholder?: string
}> = ({ icon, options, title, type, placeholder }) => {
  return (
    <IntemSelect>
      <IconSelect slot="start" icon={icon} size="small" color="secondary" />
      <LabelSelectStyled position="stacked">{title}</LabelSelectStyled>
      {type === "select" ? (
        <SelectStyled
          interfaceOptions={{
            header: title,
          }}
        >
          {options.map((item: any, key: any) => (
            <IonSelectOption key={key}>{item.name}</IonSelectOption>
          ))}
        </SelectStyled>
      ) : (
        <InputStyled type="text" placeholder={placeholder} />
      )}
    </IntemSelect>
  )
}

const IntemSelect = styled(IonItem)`
  --padding-start: 0px !important;
  --min-height: 30px !important;
  --inner-padding-end: 0 !important;
  align-items: flex-end;
  justify-content: space-around;
  line-height: 1 !important;
  padding-bottom: 10px;
  --highlight-color-focused: transparent;
`

const LabelSelectStyled = styled(IonLabel)`
  margin-bottom: 10px !important;
`

const IconSelect = styled(IonIcon)`
  margin: 0 10px 5px 0;
`

const InputStyled = styled(IonInput)`
  input {
    padding: 0 !important;
  }
`

const SelectStyled = styled(IonSelect)`
  --placeholder-color: #2a4150 !important;
  --placeholder-opacity: 1;
  padding: 0 !important;
`

export default InputConfig
