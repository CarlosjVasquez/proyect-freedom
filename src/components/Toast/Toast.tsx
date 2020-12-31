import React from 'react'

import {
    IonToast,
} from "@ionic/react"

import {
    alertCircle,
    checkmarkCircleOutline,
} from "ionicons/icons"

const Toast: React.FC<{
    active: boolean,
    message: string,
    confirm?: boolean | undefined,
    duration?: number | undefined,
    position?: "top" | "bottom" | "middle" | undefined,
}> = ({active, message, duration, confirm, position})   => {
    return(
        <IonToast
            cssClass={confirm ? "message-custom-confirm" : "message-custom"}
            isOpen={active}
            message={message}
            duration={duration}
            position={position}
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