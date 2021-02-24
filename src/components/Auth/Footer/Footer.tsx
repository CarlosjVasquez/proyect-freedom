import React from 'react'
import {IonFooter, IonToolbar, IonTitle} from '@ionic/react'
import BtnSecondary from "../../BtnSecondary/BtnSecondary" 
import Styled from 'styled-components'

const Footer: React.FC<{
    title: string
    btn?: string
    onClickHandle?: () => void
}> = ({title, btn, onClickHandle}) => {
    return(
      <FooterStyled>
        <ToolbarStyled color="transparent">
          <TitleStyled size="small" >{title}</TitleStyled>
          {
            !!btn && (
              <BtnSecondary name={btn} onClickHandle={onClickHandle} />
            )
          }
        </ToolbarStyled>
      </FooterStyled>
    )
}

const ToolbarStyled = Styled(IonToolbar)`
  box-shadow: none;
`
const TitleStyled = Styled(IonTitle)`
  text-align: center;
  font-size: 0.8rem;
`
const FooterStyled = Styled(IonFooter)`
  &::before{
    display: none;
  }
`

export default Footer

