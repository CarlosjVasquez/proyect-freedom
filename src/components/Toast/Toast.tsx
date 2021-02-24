import React from 'react'

import {
    IonToast,
} from "@ionic/react"

import {
    alertCircle,
    checkmarkCircleOutline,
} from "ionicons/icons"

import './ToastStyles.scss'

const Toast: React.FC<{
    active: boolean,
    message: string,
    confirm?: boolean | undefined,
    duration?: number | undefined,
    position?: "top" | "bottom" | "middle" | undefined,
    onDidDismiss?: () => void
}> = ({active, message, duration, confirm, position, onDidDismiss})   => {
    return(
        <IonToast
            cssClass={confirm ? "message-custom-confirm" : "message-custom"}
            isOpen={active}
            message={message}
            duration={duration}
            position={position}
            onDidDismiss={onDidDismiss}
            buttons={[
                {
                    side: "end",
                    icon: confirm ? checkmarkCircleOutline : alertCircle,
                },
            ]}
        />
    )
}

export default Toast