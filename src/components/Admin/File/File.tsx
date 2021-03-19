import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Document, pdfjs } from "react-pdf"

import {
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonNote,
} from "@ionic/react"
import { settings, trash, save } from "ionicons/icons"

import documentopdf from "../../Icons/documentopdf.svg"
import InputConfig from "../InputConfig/InputConfig"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const File: React.FC<{
  file: any
  onDelete: any
  onSavedConfig: any
  saldo: any
}> = ({ file, onDelete, onSavedConfig, saldo }) => {
  const [active, setActive] = useState(false)
  const [orientacion, setOrientacion] = useState("")
  const [printTypes, setPrintTypes] = useState()
  const [pageByPlane, setPageByPlane] = useState()
  const [copies, setCopies] = useState()
  const [interval, setInterval] = useState()
  const [configState, setConfigState] = useState()
  const [archivo, setArchivo] = useState()
  const [price, setPrice] = useState(0)
  const [idConfig, setIdConfig] = useState("")

  const [numPages, setNumPages] = useState(null)

  useEffect(() => {
    if (
      file.node.orientacion === "Vertical" ||
      file.node.orientacion === "Vertical horizontal" ||
      file.node.orientacion === "Vertical 2" ||
      file.node.orientacion === "Vertical vertical 2" ||
      file.node.orientacion === "Vertical 3" ||
      file.node.orientacion === "Vertical horizontal 3"
    ) {
      setOrientacion("Vertical")
    } else {
      setOrientacion("Horizontal")
    }

    setPrintTypes(file.node.printTypes)
    setPageByPlane(file.node.pageByPlane)
    setCopies(file.node.copies)
    setInterval(file.node.interval)
    setConfigState(file.node.configEstado)
    setArchivo(file.node.archivo)
    setPrice(file.node.price)
  }, [file])

  useEffect(() => {
    if (configState) {
    }
  }, [configState])

  const onDocumentLoadSuccess = (data: any) => {
    setNumPages(data.numPages)
  }

  useEffect(() => {
    if (pageByPlane === "One page by plane") {
      printTypes === "Simple"
        ? orientacion === "Vertical"
          ? setIdConfig("Vertical")
          : setIdConfig("Horizontal")
        : orientacion === "Vertical"
        ? setIdConfig("Vertical horizontal")
        : setIdConfig("Horizontal vertical")
    } else if (pageByPlane === "Two page by plane") {
      printTypes === "Simple"
        ? orientacion === "Vertical"
          ? setIdConfig("Vertical 2")
          : setIdConfig("Horizontal 2")
        : orientacion === "Vertical"
        ? setIdConfig("Vertical vertical 2")
        : setIdConfig("Horizontal horizontal 2")
    } else if (pageByPlane === "Four page by plane") {
      printTypes === "Simple"
        ? orientacion === "Vertical"
          ? setIdConfig("Vertical 3")
          : setIdConfig("Horizontal 3")
        : orientacion === "Vertical"
        ? setIdConfig("Vertical horizontal 3")
        : setIdConfig("Horizontal horizontal 3")
    }
  }, [orientacion, printTypes, pageByPlane])

  return (
    <CardStyled>
      <ItemStyled button onClick={() => setActive(!active)}>
        <IonIcon color="primary" slot="start" size="med" icon={documentopdf} />
        <IonLabel>
          <TitleStyled>{file.node.nombre}</TitleStyled>
          <CreateStyled>
            Created: {new Date(file.node.created).toLocaleString()}
          </CreateStyled>
        </IonLabel>
        <NoteStyled slot="end" color={price < saldo ? "success" : "danger"}>
          {!configState ? <>----</> : <>${price}</>}
        </NoteStyled>
      </ItemStyled>
      <CardContentStyled active={active}>
        <ContCardCont>
          <ToolbarStyled>
            <IonIcon
              slot="start"
              color="primary"
              icon={settings}
              size="small"
            />
            <IonTitle size="small">Print Settings</IonTitle>
            <IonButton
              fill="clear"
              slot="end"
              shape="round"
              onClick={() => onDelete(file.node.pk)}
            >
              <IonIcon
                slot="icon-only"
                size="small"
                icon={trash}
                color="danger"
              />
            </IonButton>
          </ToolbarStyled>
          <IonRow>
            <IonCol size="6">
              <InputConfig
                icon={documentopdf}
                options={[{ name: "Vertical" }, { name: "Horizontal" }]}
                title="Orientation"
                type="select"
                onChange={(e: any) => setOrientacion(e)}
                value={orientacion}
              />
            </IonCol>
            <IonCol size="6">
              <InputConfig
                type="select"
                icon={documentopdf}
                options={[{ name: "Simple" }, { name: "Duplex" }]}
                title="Print Types"
                value={printTypes}
                onChange={(e: any) => setPrintTypes(e)}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <InputConfig
                type="select"
                icon={documentopdf}
                options={[
                  { name: "One page by plane" },
                  { name: "Two page by plane" },
                  { name: "Four page by plane" },
                ]}
                title="Page by Plane"
                value={pageByPlane}
                onChange={(e: any) => setPageByPlane(e)}
              />
            </IonCol>
            <IonCol size="6">
              <InputConfig
                type="text"
                icon={documentopdf}
                title="Copies"
                placeholder="1"
                value={copies}
                onChange={(e: any) => setCopies(e)}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <InputConfig
                type="text"
                icon={documentopdf}
                title="Interval"
                placeholder="# - #"
                value={interval}
                onChange={(e: any) => setInterval(e)}
              />
            </IonCol>
            <ColRightStyled size="6">
              <IonButton
                color="secondary"
                onClick={() =>
                  onSavedConfig(
                    file.node.pk,
                    idConfig,
                    printTypes,
                    pageByPlane,
                    copies,
                    interval,
                    numPages
                  )
                }
              >
                <IonIcon slot="end" icon={save} />
                Saved
              </IonButton>
            </ColRightStyled>
          </IonRow>
        </ContCardCont>
      </CardContentStyled>
      <DocumentStyled file={archivo} onLoadSuccess={onDocumentLoadSuccess} />
    </CardStyled>
  )
}

const DocumentStyled = styled(Document)`
  display: none !important;
  opacity: 0 !important;
`

const ColRightStyled = styled(IonCol)`
  display: flex;
  justify-content: flex-end !important;
`

const ToolbarStyled = styled(IonToolbar)`
  --min-height: 30px !important;
  --padding-top: 20px !important;
`

const ContCardCont = styled.div`
  padding: 0 20px;
`

const CardContentStyled = styled(IonCardContent)<{ active: boolean }>`
  max-height: ${(props) => (props.active ? "600px" : "0px")} !important;
  margin: 0 !important;
  padding: 0 !important;
  transition: all 1s cubic-bezier(0.34, 0, 0.67, 0.99);
  p {
    display: block;
    width: 100%;
    height: 100%;
  }
`

const NoteStyled = styled(IonNote)`
  align-self: center !important;
  font-size: 0.9rem;
  font-weight: 700;
`

const ItemStyled = styled(IonItem)`
  --inner-border-width: 0px;
  border-bottom: solid 1px #3b3b3b23;
`

const TitleStyled = styled.h2`
  text-transform: capitalize;
  font-weight: 700 !important;
  font-size: 0.8rem !important;
  color: #2a4150;
`
const CreateStyled = styled.p`
  font-size: 0.6rem !important;
`

const CardStyled = styled(IonCard)`
  margin: 0;
  margin-bottom: 15px;
`

export default File
