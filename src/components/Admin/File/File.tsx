import React, { useState, useEffect } from "react"
import styled from "styled-components"

import {
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
} from "@ionic/react"
import { settings, trash, save } from "ionicons/icons"

import documentopdf from "../../Icons/documentopdf.svg"
import InputConfig from "../InputConfig/InputConfig"

const File: React.FC<{ file: any; onDelete: any; onSavedConfig: any }> = ({
  file,
  onDelete,
  onSavedConfig,
}) => {
  const [active, setActive] = useState(false)
  const [orientacion, setOrientacion] = useState()
  const [printTypes, setPrintTypes] = useState()
  const [pageByPlane, setPageByPlane] = useState()
  const [copies, setCopies] = useState()
  const [interval, setInterval] = useState()

  useEffect(() => {
    setOrientacion(file.node.orientacion)
    setPrintTypes(file.node.printTypes)
    setPageByPlane(file.node.pageByPlane)
    setCopies(file.node.copies)
    setInterval(file.node.interval)
  }, [
    file.node.orientacion,
    file.node.printTypes,
    file.node.pageByPlane,
    file.node.copies,
    file.node.interval,
  ])

  return (
    <CardStyled>
      <ItemStyled>
        <IonIcon
          color="primary"
          slot="start"
          size="large"
          icon={documentopdf}
        />
        <IonLabel>
          <TitleStyled>{file.node.nombre}</TitleStyled>
          <CreateStyled>
            Created: {new Date(file.node.created).toLocaleString()}
          </CreateStyled>
        </IonLabel>
        <IonButtons slot="end">
          <IonButton
            fill="clear"
            className="btn-eye"
            slot="start"
            shape="round"
            onClick={() => setActive(!active)}
            size="small"
          >
            <IonIcon slot="icon-only" icon={settings} color="primary" />
          </IonButton>
          <IonButton
            fill="clear"
            className="btn-eye"
            slot="start"
            shape="round"
            onClick={() => onDelete(file.node.pk)}
            size="small"
          >
            <IonIcon slot="icon-only" icon={trash} color="secondary" />
          </IonButton>
        </IonButtons>
      </ItemStyled>
      <CardContentStyled active={active}>
        <ContCardCont>
          <ToolbarStyled>
            <IonTitle size="small">Print Settings</IonTitle>
            <IonIcon
              slot="start"
              color="primary"
              icon={settings}
              size="small"
            />
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
                    orientacion,
                    printTypes,
                    pageByPlane,
                    copies,
                    interval
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
    </CardStyled>
  )
}

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

const ItemStyled = styled(IonItem)`
  --inner-border-width: 0px;
  border-bottom: solid 1px #3b3b3b23;
`

const TitleStyled = styled.h2`
  text-transform: capitalize;
`
const CreateStyled = styled.p`
  font-size: 0.7rem !important;
`

const CardStyled = styled(IonCard)`
  margin: 0;
  margin-bottom: 15px;
`

export default File
