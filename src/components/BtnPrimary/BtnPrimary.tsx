import React from "react"
import { IonButton, IonCol, IonLabel } from "@ionic/react"
import styled from "styled-components"

const BtnPrimary: React.FC<{
  color?: string
  name: String
  onClickHandle: () => void
  disabled?: boolean | undefined
}> = (props) => {
  return (
    <ColStyled>
      <ButtonStyled
        expand="block"
        shape="round"
        color={props.color}
        onClick={props.onClickHandle}
        disabled={props.disabled === undefined ? false : props.disabled}
      >
        <IonLabel>{props.name}</IonLabel>
      </ButtonStyled>
    </ColStyled>
  )
}

const ColStyled = styled(IonCol)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonStyled = styled(IonButton)`
  --background: rgb(223, 56, 56);
  --background: linear-gradient(
    30deg,
    rgb(231, 106, 106) 0%,
    rgba(223, 56, 56, 1) 50%,
    rgb(231, 106, 106) 100%
  );
  width: 50% !important;
  min-width: 50% !important;
  margin: 0;
`

export default BtnPrimary
