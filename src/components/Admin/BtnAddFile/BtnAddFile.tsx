import React, { useState, useRef } from "react"
import { useMutation } from "@apollo/client"
import styled from "styled-components"
import { Document, pdfjs, Page } from "react-pdf"

import {
  IonButton,
  IonIcon,
  IonCol,
  IonRow,
  IonModal,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
} from "@ionic/react"
import { FirstRowStyled } from "../../ContainerForm/ContainerForm"
import BtnPrimary from "../../BtnPrimary/BtnPrimary"

import { caretBack, caretForward, closeCircle, search } from "ionicons/icons"

import BtnIcon from "../../BtnIcon/BtnIcon"
import documentadd from "../../Icons/documentadd.svg"
import { Query } from "../../../server/querys"

import "./BtnAddFileStyles.scss"

const up = Query.mutation.upload

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const BtnAddFile: React.FC<{
  color?: any
  idUser: any
  onSuccess: any
  fill: any
  size: any
}> = ({ color, onSuccess, idUser, fill, size }) => {
  const [thefile, setThefile] = useState<any>(null)
  const [nombre, setNombre] = useState<string>("")
  const [showModal, setShowModal] = useState(false)
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)

  const fileInput = useRef<any>(null)

  const date = new Date()

  const onDocumentLoadSuccess = (data: any) => {
    setPageNumber(1)
    setNumPages(data.numPages)
  }

  const [uplo] = useMutation<{ myUpload: any }>(up, {
    variables: {
      file: thefile,
      nombre: nombre,
      id: idUser,
    },
    onCompleted: () => {
      setShowModal(false)
      onSuccess(false)
    },
    onError: (e) => {
      console.log(e)
    },
  })

  return (
    <>
      <BtnIcon
        color={color}
        icon={documentadd}
        onClickHandle={() => setShowModal(true)}
        fill={fill}
        size={size}
      />
      <IonModal isOpen={showModal} cssClass="my-custom-class">
        <IonToolbar>
          <IonTitle>
            <SubtitleStyled>{date.toLocaleDateString()}</SubtitleStyled> <br />{" "}
            Add File
          </IonTitle>
          <IonButton
            slot="end"
            shape="round"
            fill="clear"
            onClick={() => setShowModal(false)}
          >
            <IonIcon size="large" icon={closeCircle} />
          </IonButton>
        </IonToolbar>
        <IonContent>
          <FirstRowStyled>
            <IonCol>
              <IonRow>
                <IonCol>
                  <CardStyled>
                    <IonCardContent>
                      <DocumentStyled
                        file={thefile ? thefile : null}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <PageStyled pageNumber={pageNumber} />
                      </DocumentStyled>
                      {thefile && (
                        <PaginateStyled>
                          <p>
                            {pageNumber > 1 && pageNumber <= numPages && (
                              <ArrowStyled
                                icon={caretBack}
                                onClick={() => setPageNumber(pageNumber - 1)}
                              />
                            )}
                            Page {pageNumber} of {numPages}
                            {pageNumber !== numPages && (
                              <ArrowStyled
                                icon={caretForward}
                                onClick={() => setPageNumber(pageNumber + 1)}
                              />
                            )}
                          </p>
                        </PaginateStyled>
                      )}
                    </IonCardContent>
                  </CardStyled>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <input
                    ref={fileInput}
                    hidden
                    type="file"
                    onChange={({
                      target: {
                        validity,
                        files: [file],
                      },
                    }: any) => {
                      if (validity.valid) {
                        setNombre(file.name)
                        setThefile(file)
                      }
                    }}
                    multiple={false}
                    accept="application/pdf"
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                {thefile ? (
                  <ButtonsStyled>
                    <IonButton
                      color="primary"
                      shape="round"
                      fill="solid"
                      onClick={() => fileInput?.current?.click()}
                    >
                      <IonIcon size="large" icon={search} />
                    </IonButton>
                    <IonButton
                      color="secondary"
                      shape="round"
                      fill="solid"
                      onClick={() => uplo()}
                    >
                      Upload
                    </IonButton>
                  </ButtonsStyled>
                ) : (
                  <BtnPrimary
                    name="Select File"
                    onClickHandle={() => fileInput?.current?.click()}
                  />
                )}
              </IonRow>
            </IonCol>
          </FirstRowStyled>
        </IonContent>
      </IonModal>
    </>
  )
}

const ButtonsStyled = styled(IonCol)`
  display: flex;
  justify-content: space-between;
`

const ArrowStyled = styled(IonIcon)`
  padding: 0 10px;
`

const PaginateStyled = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-top: 10px;
  text-align: center;
`

const CardStyled = styled(IonCard)`
  background-color: #cacaca;
`

const PageStyled = styled(Page)`
  canvas {
    width: 100% !important;
    height: auto !important;
  }
`

const DocumentStyled = styled(Document)`
  width: 100%;
`

const SubtitleStyled = styled.span`
  color: #555555;
  font-size: 0.7rem;
`

export default BtnAddFile
