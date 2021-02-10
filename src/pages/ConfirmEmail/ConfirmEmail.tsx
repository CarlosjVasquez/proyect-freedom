import React, { useEffect, useState } from "react"

import { useMutation } from "@apollo/client"

import { Query } from "../../server/querys"
import { RouteComponentProps } from "react-router-dom"
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo"

const verify = Query.mutation.verifyAccount

interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string
  }> {}

const ConfirmEmail: React.FC<UserDetailPageProps> = ({ match, history }) => {
  const [confirm, setConfirm] = useState(false)
  const [err, setErr] = useState(false)

  const [verifyEmail] = useMutation<{ verifyAccount: any }>(verify, {
    variables: {
      token: match.params.id,
    },
    onCompleted: ({ verifyAccount }) => {
      if (verifyAccount.success) {
        setConfirm(true)
      } else {
        setErr(true)
      }
    },
    onError: (e: any) => {
      setErr(true)
    },
  })

  useEffect(() => {
    verifyEmail()
  }, [verifyEmail])

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient( 0deg,rgba(223, 56, 56, 0.5) 0%,rgba(23, 36, 44, 0.5) 60%)",
        flexDirection: "column",
      }}
    >
      <HeaderLogo />
      {confirm && (
        <>
          <h1>Confirm Email</h1>
          <p>Enter our app to continue with the experience</p>
        </>
      )}
      {err && (
        <>
          <h1>Error</h1>
          <p>when confirming the email please generate another link</p>
        </>
      )}
    </div>
  )
}

export default ConfirmEmail
