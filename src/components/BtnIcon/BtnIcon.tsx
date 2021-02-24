import React from "react"
import { IonButton, IonIcon } from "@ionic/react"
import './BtnIconStyles.scss'

const BtnIcon: React.FC<{
    color?:  undefined | 'primary'
    icon: any
    onClickHandle: () => void
    disabled?: boolean | undefined
}> = ({onClickHandle, disabled, icon, color}) => {
  return (
    <IonButton
      className={color === undefined ? "" : "btn-icon"}
      onClick={onClickHandle}
      disabled={disabled === undefined ? false : disabled }
    >
      <IonIcon slot="icon-only" icon={icon} />
    </IonButton>
  )
}

export default BtnIcon
