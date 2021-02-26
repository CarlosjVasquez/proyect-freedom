import React from "react"
import { IonButton, IonIcon } from "@ionic/react"
import styled from "styled-components"

const BtnIcon: React.FC<{
  color?: undefined | "primary" | "transparent"
  icon: any
  onClickHandle?: () => void
  disabled?: boolean | undefined
}> = ({ onClickHandle, disabled, icon, color }) => {
  return (
    <ButtonStyled
      colorback={color}
      onClick={onClickHandle}
      disabled={disabled === undefined ? false : disabled}
    >
      <IonIcon slot="icon-only" icon={icon} />
    </ButtonStyled>
  )
}

const back =
  "linear-gradient(30deg,rgb(231, 106, 106) 0%, rgba(223, 56, 56, 1) 50%, rgb(231, 106, 106) 100%)"

const ButtonStyled = styled(IonButton)<{ colorback: any }>`
  --background: #df3838;
  --background: ${({ colorback }) =>
    colorback === "primary" ? back : ""} !important;
  --border-radius: 9999px !important;
  width: 50px !important;
  height: 50px !important;
`

export default BtnIcon
