import React, { useEffect } from 'react'

import { useMutation } from "@apollo/client"

import {Query} from '../../server/querys'
import { RouteComponentProps } from 'react-router-dom';

const verify = Query.mutation.verifyAccount

interface UserDetailPageProps extends RouteComponentProps<{
    id: string;
  }> {}

const ConfirmEmail: React.FC<UserDetailPageProps> = ({match, history}) => {

    const [verifyEmail] = useMutation<{ verifyAccount: any }>(
        verify,
        {
            variables: {
                token: match.params.id
            },
            onCompleted: ({verifyAccount}) => {
                if(verifyAccount.success){
                    history.push('/registerdata')
                }else{
                    console.log(verifyAccount)
                }
                console.log('hola')
            }
        }
      ) 
    
    useEffect(() => { verifyEmail() }, [verifyEmail])

    return(
        <>
        </>
    )
}

export default ConfirmEmail