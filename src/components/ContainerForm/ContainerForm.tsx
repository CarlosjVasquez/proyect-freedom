import { IonRow } from "@ionic/react"
import styled from "styled-components"

export const FirstRowStyled = styled(IonRow)<{ marginTop?: number }>`
  width: 100%;
  padding: 0 10px;
  padding-left: unset;
  padding-right: unset;
  padding-inline: 10px;
  margin-top: ${(props) => props.marginTop}px;
`
