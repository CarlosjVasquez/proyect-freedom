import React, { useEffect, useState } from "react"
import {
  IonItem,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonButtons,
  IonButton,
  IonDatetime,
} from "@ionic/react"
import styled from "styled-components"

import { eyeOutline, eyeOffOutline } from "ionicons/icons"

const InputPrimary: React.FC<{
  setValue?: any
  setIcon?: any
  setPlaceholder?: string
  setType?: "text" | "number" | "email" | "password"
  select?: boolean | undefined
  date?: boolean | undefined
  options?: any
  onChangeValue?: (value: any) => void
  validate?: boolean
  space?: number
  color?: "admin" | undefined
  disabled?: boolean | undefined
}> = (props) => {
  const [focus, setFocus] = useState<boolean>(false)
  const [capture, setCapture] = useState<string>(props.setValue)
  const [viewValue, setViewValue] = useState<boolean>(false)
  const [typeValue, setTypeValue] = useState<boolean>(false)

  useEffect(() => {
    if (props.setValue !== "") setFocus(true)
  }, [props.setValue])

  const changeValue = (e: CustomEvent) => {
    props.onChangeValue && props.onChangeValue(e.detail.value)
    setCapture(e.detail.value)
  }

  const onViewValueHandle = () => {
    viewValue ? setViewValue(false) : setViewValue(true)
    viewValue ? setTypeValue(false) : setTypeValue(true)
  }

  const borderUrl = `"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23${
    props.color === "admin" ? "2a4150" : "ffffff"
  } ' stroke-width='5' stroke-dasharray='700%2c ${
    !props.space ? 100 : props.space
  }' stroke-dashoffset='670' stroke-linecap='round'/%3e%3c/svg%3e"`

  return (
    <ItemStyled
      color="transparent"
      lines="none"
      focus={focus}
      space={borderUrl}
      colorBack={props.color}
    >
      <IconStyled
        color={
          props.setType === "email" || props.validate !== undefined
            ? props.setValue
              ? props.color === "admin"
                ? "primary"
                : props.validate
                ? "success"
                : "warning"
              : ""
            : props.color === "admin"
            ? "primary"
            : props.setValue
            ? "success"
            : ""
        }
        slot="start"
        icon={props.setIcon}
      />
      {props.date ? (
        <>
          <InputCustomStyled>
            <DateStyled
              value={props.setValue}
              onIonChange={changeValue}
              displayFormat="DD MM YYYY"
              min="1980"
              color={props.color === "admin" ? "primary" : ""}
              onFocus={() => setFocus(true)}
              onBlur={() => capture === "" && setFocus(false)}
            />
            <LabelStyled
              color={props.color === "admin" ? "primary" : ""}
              focus={focus}
            >
              {props.setPlaceholder}
            </LabelStyled>
          </InputCustomStyled>
        </>
      ) : !props.select ? (
        <>
          <InputCustomStyled>
            <LabelStyled
              color={props.color === "admin" ? "primary" : ""}
              focus={focus}
            >
              {props.setPlaceholder}
            </LabelStyled>
            <IonInput
              onFocus={() => setFocus(true)}
              onBlur={() => capture === "" && setFocus(false)}
              onIonChange={changeValue}
              color={props.color === "admin" ? "primary" : ""}
              className="custom-input"
              type={
                props.setType === "password"
                  ? typeValue
                    ? "text"
                    : "password"
                  : props.setType
              }
              value={props.setValue}
              disabled={props.disabled ? props.disabled : false}
            />
          </InputCustomStyled>
          {props.setType === "password" && (
            <IonButtons>
              <IonButton
                fill="clear"
                className="btn-eye"
                slot="start"
                shape="round"
                onClick={onViewValueHandle}
              >
                <IonIcon
                  slot="icon-only"
                  icon={viewValue ? eyeOutline : eyeOffOutline}
                />
              </IonButton>
            </IonButtons>
          )}
        </>
      ) : (
        <>
          <InputCustomStyled>
            <SelectStyled
              onFocus={() => setFocus(true)}
              onBlur={() => capture === "" && setFocus(false)}
              value={props.setValue}
              onIonChange={changeValue}
              color={props.color === "admin" ? "primary" : ""}
            >
              {props.options.map((user: any, key: any) => (
                <IonSelectOption
                  key={key}
                  value={user.value ? user.value : user.option.toLowerCase()}
                >
                  {user.option}
                </IonSelectOption>
              ))}
            </SelectStyled>
            <LabelStyled
              color={props.color === "admin" ? "primary" : ""}
              focus={focus}
            >
              {props.setPlaceholder}
            </LabelStyled>
          </InputCustomStyled>
        </>
      )}
    </ItemStyled>
  )
}

const ItemStyled = styled(IonItem)<{
  focus: boolean
  space: string
  colorBack: string | undefined
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: visible !important;
  margin-bottom: 10px;
  width: 100%;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${(props) =>
      props.colorBack === "admin" ? "#fff" : "#252525cb"};
    background-image: url(${(props) => props.space});
    background-size: ${(props) => (props.focus ? "100% 100%" : "103% 115%")};
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 3px;
    transition: background-size 0.25s cubic-bezier(0.5, -0.5, 0.5, 1.5);
    overflow: visible;
    box-shadow: ${(props) =>
      props.colorBack === "admin"
        ? "0px 1px 5px #29292932"
        : "0px 1px 5px #ffffff12"};
  }
`

const InputCustomStyled = styled.div`
  position: relative;
  width: 100% !important;
`

const IconStyled = styled(IonIcon)`
  margin-right: 10px !important;
`

const LabelStyled = styled(IonLabel)<{
  focus: boolean
}>`
  position: absolute;
  top: 50%;
  transform-origin: left;
  transform: ${(props) =>
    props.focus
      ? "translateY(-180%) scale(0.95)"
      : "translateY(-50%) scale(1)"};
  transition: transform cubic-bezier(0.5, -0.5, 0.5, 1.5) 0.25s;
  opacity: 1 !important;
`

const SelectStyled = styled(IonSelect)`
  color: ${(props) => (props.color === "primary" ? "#2a4150" : "")};
  --placeholder-color: ${(props) =>
    props.color === "primary" ? "#2a4150" : ""};
  --placeholder-opacity: 1;
  width: 100% !important;
  margin: 0;
  max-width: 100% !important;
`

const DateStyled = styled(IonDatetime)`
  color: ${(props) => (props.color === "primary" ? "#2a4150" : "")};
  --placeholder-color: ${(props) =>
    props.color === "primary" ? "#2a4150" : ""};
  --placeholder-opacity: 1;
  padding: 0;
`

export default InputPrimary
