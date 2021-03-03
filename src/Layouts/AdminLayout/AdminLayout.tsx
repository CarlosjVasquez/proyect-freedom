import React from "react"
import {
  IonContent,
  IonPage,
  IonMenuButton,
  IonRouterOutlet,
  IonIcon,
} from "@ionic/react"
import styled from "styled-components"

import { grid } from "ionicons/icons"

import Menu from "../../components/Admin/Menu/Menu"
import Loading from "../../components/Loading/Loading"
import Header from "../../components/Admin/Header/Header"

const AdminLayout: React.FC<{
  history: any
  loading: any
  username: any
  menuButtons?: any
}> = ({ children, loading, history, username, menuButtons }) => {
  return (
    <>
      <Menu history={history} />
      <PageStyled>
        <Loading active={loading} />
        <Header title={username}>
          {menuButtons}
          <IonMenuButton autoHide={false}>
            <IonIcon color="primary" icon={grid} />
          </IonMenuButton>
        </Header>
        <ContentStyled>{children}</ContentStyled>
      </PageStyled>
      <IonRouterOutlet id="first"></IonRouterOutlet>
    </>
  )
}

const PageStyled = styled(IonPage)`
  background: url("/assets/img/patternbackground.jpg") !important;
  background-size: cover !important;
  background-position: center !important;
  background-attachment: fixed;
  background-repeat: no-repeat;
`

const ContentStyled = styled(IonContent)`
  --background: transparent !important;
`

export default AdminLayout
