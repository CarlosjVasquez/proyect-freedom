import React, { useState, useEffect } from 'react'

import { useMutation } from "@apollo/client"

import {Query} from '../../server/querys'
import { RouteComponentProps } from 'react-router-dom';
import Toast from '../../components/Toast/Toast'
import LayoutFirst from '../../components/LayoutFirst/LayoutFirst'
import HeaderLogo from '../../components/HeaderLogo/HeaderLogo'
import { IonPage } from '@ionic/react'

const verify = Query.mutation.verifyAccount

interface UserDetailPageProps extends RouteComponentProps<{
    id: string;
  }> {}

const ConfirmEmail: React.FC<UserDetailPageProps> = ({match}) => {
    const [active, setActive] = useState<boolean>(true)

    const [verifyEmail] = useMutation<{ verifyAccount: any }>(
        verify,
        {
            variables: {
                token: match.params.id
            },
            onCompleted: ({verifyAccount}) => {
                console.log(verifyAccount)
            }
        }
      ) 
      
      useEffect(() => {
          
        verifyEmail()
         
      }, [verifyEmail])
    return(
        <IonPage>
            <LayoutFirst>
                <HeaderLogo />
                <Toast active={active} message="Email confirm" confirm={true} position="middle" />
            </LayoutFirst>
        </IonPage>
    )
}

export default ConfirmEmail