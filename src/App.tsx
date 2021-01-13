import React from "react"
import { Redirect, Route } from "react-router-dom"
import { IonApp, IonRouterOutlet } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"

import Home from "./pages/Home/Home"
import Login from "./pages/Login/FormLogin"
import Init from "./pages/Init/Initial"
import Register from "./pages/Register/Register"
import UserData from "./pages/UserData/UserData"
import Registerdata from "./pages/RegisterData/RegisterData"
import ConfirmEmail from './pages/ConfirmEmail/ConfirmEmail'
import ResetPasswordEmail from './pages/ResetPassword/ResetPasswordEmail'
import ResetPassword from './pages/ResetPassword/ResetPassword'

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

/* Theme variables */
import "./theme/variables.css"
import client from "./server/client"

import { ApolloProvider } from "@apollo/client"

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/resetpassword/:id" component={ResetPassword} />
            <Route path="/resetpasswordemail" component={ResetPasswordEmail} />
            <Route path="/confirmemail/:id" component={ConfirmEmail} />
            <Route path="/registerdata" component={Registerdata} />
            <Route path="/register" component={Register} />
            <Route path="/userdata" component={UserData} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/init" component={Init} />
            <Route exact path="/" render={() => <Redirect to="/init" />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </ApolloProvider>
  )
}

export default App
