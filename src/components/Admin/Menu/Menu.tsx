import React from 'react'

import {IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonButtons, IonButton, IonLabel} from '@ionic/react'
import {settings, personCircleOutline, home} from 'ionicons/icons'

const Menu: React.FC<{history: any}> = ({history}) => {
    return(
        <IonMenu side="end" contentId="first" >
      <IonHeader>
        <IonToolbar color="primary">
            <IonButtons slot="end">
                <IonButton disabled={true}>
                    <IonIcon icon={settings} />
                </IonButton>
            </IonButtons>
          <IonTitle slot="start" >Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem button onClick={() => history("/home") } >
            <IonLabel>
              <h2>Home</h2>
            </IonLabel>
            <IonButtons slot="end">
              <IonButton
                fill="clear"
                className="btn-eye"
                shape="round"
                disabled
              >
                  
                <IonIcon
                  slot="icon-only"
                  icon={home}
                  color="primary"
                />
              </IonButton>
            </IonButtons>
          </IonItem>
          <IonItem button onClick={() => history("/userdata") } >
            <IonLabel>
              <h2>User Data</h2>
            </IonLabel>
            <IonButtons slot="end">
              <IonButton
                fill="clear"
                className="btn-eye"
                shape="round"
                disabled
              >
                  
                <IonIcon
                  slot="icon-only"
                  icon={personCircleOutline}
                  color="primary"
                />
              </IonButton>
            </IonButtons>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
    )
}

export default Menu