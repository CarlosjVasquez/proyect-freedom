import React from 'react'

import './HeaderStyles.scss'

import {IonHeader, IonToolbar, IonTitle, IonButtons} from '@ionic/react'

const Header: React.FC<{
    title: any
}> = ({title, children}) => {
    return (
        <IonHeader className='header'>
        <IonToolbar color="primary">
          <IonTitle>Hi, {title}</IonTitle>
          <IonButtons slot="end">
            {children}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    )
}

export default Header