import React from 'react'
import {IonLoading} from '@ionic/react'
import './LoadingStyles.scss'

const Loading: React.FC<{active: boolean}> = ({active}) => {
    return(
        <IonLoading
          cssClass="loading-custom"
          isOpen={active}
          message="loading"
        />
    )
}

export default Loading