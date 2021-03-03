import React from "react"
import { IonButton, IonIcon } from "@ionic/react"

const BtnIcon: React.FC<{
  color?: string
  icon: any
  onClickHandle?: () => void
  disabled?: boolean | undefined
  fill?: "clear" | "solid" | undefined
  size?: "small" | "med" | "large" | undefined
}> = ({ onClickHandle, disabled, icon, color, fill, size }) => {
  return (
    <IonButton
      onClick={onClickHandle}
      disabled={disabled === undefined ? false : disabled}
      shape="round"
      color={color}
      fill={fill}
    >
      <IonIcon slot="icon-only" icon={icon} size={size} />
    </IonButton>
  )
}

export default BtnIcon
