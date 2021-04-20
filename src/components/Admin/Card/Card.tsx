import React from "react"
import styled from "styled-components"

import { IonItem, IonLabel, IonIcon, IonCard } from "@ionic/react"
import { businessOutline } from "ionicons/icons"

const Card: React.FC<{
  title: any
  created?: any
  onHandleCard: any
}> = ({ title, created, onHandleCard }) => {
  return (
    <CardStyled>
      <ItemStyled button onClick={onHandleCard}>
        <IonIcon
          color="primary"
          slot="start"
          size="med"
          icon={businessOutline}
        />
        <IonLabel>
          <TitleStyled>{title}</TitleStyled>
          {created && (
            <CreateStyled>
              Created: {new Date(created).toLocaleString()}
            </CreateStyled>
          )}
        </IonLabel>
      </ItemStyled>
    </CardStyled>
  )
}

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

export default Card
