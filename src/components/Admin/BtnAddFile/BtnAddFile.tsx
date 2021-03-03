import React, { useState } from "react"
import { useMutation } from "@apollo/client"

import BtnIcon from "../../BtnIcon/BtnIcon"
import documentadd from "../../Icons/documentadd.svg"
import { Query } from "../../../server/querys"

import "./BtnAddFileStyles.scss"

const up = Query.mutation.upload

const BtnAddFile: React.FC<{
  color?: any
  idUser: any
  onSuccess: any
  fill: any
  size: any
}> = ({ color, onSuccess, idUser, fill, size }) => {
  const [thefile, setThefile] = useState<string>("")
  const [nombre, setNombre] = useState<string>("")
  const [create, setCreate] = useState<string>("")

  const [uplo] = useMutation<{ myUpload: any }>(up, {
    variables: {
      nombre: nombre,
      idUserId: idUser,
      thefile: thefile,
      created: create,
    },
    onCompleted: (e) => {
      onSuccess(false)
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
      console.log(resultEvent)
      setThefile(resultEvent.info.secure_url)
      setNombre(resultEvent.info.original_filename)
      setCreate(resultEvent.info.created_at)
      uplo()
    }
  }

  const showWidget = () => {
    widget.open()
  }

  return (
    <BtnIcon
      color={color}
      icon={documentadd}
      onClickHandle={showWidget}
      fill={fill}
      size={size}
    />
  )
}

export default BtnAddFile
