import React, { useState, useEffect } from "react"
import { Query } from "../server/querys"
import { useMutation, useQuery } from "@apollo/client"

const up = Query.mutation.upload
const user = Query.query.userdata

const Prueba: React.FC = (props: any) => {
  const [url, setUrl] = useState<string>("")
  const [id, setId] = useState<string>("")
  const [nombre, setNombre] = useState<string>("")
  const token = localStorage.getItem("token")

  const { data } = useQuery<{ userslogs: any }>(user, {
    variables: {
      token: token,
    },
    onCompleted: ({ userslogs }) => {
      setId(userslogs.id)
    },
    onError: (e) => {
      console.log(e)
      props.history.push("/login")
    },
  })

  const [uplo] = useMutation<{ uploadSignature: any }>(up, {
    variables: {
      nombre,
      id,
      url,
    },
    onCompleted: (e) => {
      console.log(e)
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const widget = (window as any).cloudinary.createUploadWidget(
    {
      cloudName: "dhdjnyxht",
      uploadPreset: "iqspxphc",
    },
    (error: any, result: any) => checkUploadResult(result)
  )

  const checkUploadResult = (resultEvent: any) => {
    if (resultEvent.event === "success") {
      console.log(resultEvent.success)
      setUrl(resultEvent.info.url)
      setNombre(resultEvent.info.original_filename)
    }
  }

  useEffect(() => {}, [data])

  useEffect(() => {
    uplo()
  }, [url, nombre, uplo])

  const showWidget = () => {
    widget.open()
  }

  return (
    <>
      <button onClick={() => showWidget()}> Upload </button>
    </>
  )
}

export default Prueba
