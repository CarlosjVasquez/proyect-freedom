import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  IonButton,
  IonIcon,
  IonCol,
  IonList,
  IonCard,
  IonCardContent,
  IonSpinner,
  IonRow,
  IonCardSubtitle,
  IonCardTitle,
  IonButtons,
  IonModal,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react"
import { useQuery, useMutation } from "@apollo/client"

import { addCircle, cash, closeCircle, refresh } from "ionicons/icons"

import { Query } from "../../server/querys"
import BtnAddFile from "../../components/Admin/BtnAddFile/BtnAddFile"
import File from "../../components/Admin/File/File"
import AdminLayout from "../../Layouts/AdminLayout/AdminLayout"
import { FirstRowStyled } from "../../components/ContainerForm/ContainerForm"

import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import InputPrimary from "../../components/InputPrimary/InputPrimary"

const user = Query.query.user
const { allfiles: FILES } = Query.query
const { delete: FDELETE, updateConfig: UPCONFIG } = Query.mutation

const Home: React.FC = (props: any) => {
  const [id, setId] = useState<number>()
  const [filesList, setFilesList] = useState<any>()
  const [idUser, setIdUser] = useState<string>("")
  const [skipQuery, setSkipQuery] = useState(true)
  const [saldo, setSaldo] = useState("0")
  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState("3000")

  const token = localStorage.getItem("token")

  const date = new Date()

  const { loading, data } = useQuery<{ userslogs: any }>(user, {
    variables: {
      token: token,
    },
    onCompleted: ({ userslogs }) => {
      if (!userslogs.activar) {
        props.history.push("/registerdata")
      }
      console.log(userslogs)
      setId(userslogs.pk)
      setIdUser(userslogs.id)
      // setSaldo(!userslogs.saldoSet[0].saldo ? "0" : userslogs.saldoSet[0].saldo)
      setSkipQuery(false)
    },
    onError: (e) => {
      console.log(e)
      props.history.push("/login")
    },
  })

  const { loading: loadFile, data: fileData, error: errorData } = useQuery(
    FILES,
    {
      variables: {
        id: idUser,
        name: "",
      },
      skip: skipQuery,
      fetchPolicy: "network-only",
    }
  )

  useEffect(() => {
    if (!skipQuery) {
      const onCompleted = ({ allUploads }: any) => {
        setFilesList(allUploads.edges)
      }

      const onError = (e: any) => {
        console.log(e)
      }

      if (!loadFile && !errorData) {
        //SuccessFunctionHere
        setSkipQuery(true)
        onCompleted(fileData)
      } else if (!loadFile && errorData) {
        //ErrorFunctionHere
        setSkipQuery(true)
        console.log("error login")
        onError(errorData)
      }
    }
  }, [loadFile, fileData, errorData, skipQuery])

  const [fileDelete] = useMutation(FDELETE, {
    onCompleted: () => {
      setSkipQuery(false)
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const deleteHandle = (id: any) => {
    fileDelete({
      variables: {
        id: id,
      },
    })
  }

  const [upConfig] = useMutation(UPCONFIG, {
    onCompleted: () => {
      setSkipQuery(false)
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const saveConfig = (
    id: any,
    orientacion: any,
    printTypes: any,
    pageByPlane: any,
    copies: any,
    interval: any,
    nhojas: any,
    idConfig: any
  ) => {
    upConfig({
      variables: {
        id,
        orientacion,
        printTypes,
        pageByPlane,
        copies,
        interval,
        nhojas,
        idConfig,
      },
    })
  }

  const rechargeAmount = () => {
    const url = `https://hyhlibertad2.herokuapp.com/webpay/webpay-plus-create/${amount}/${id}`

    if (amount < "3000") {
      console.log("el monto minimo es de 3000")
      return false
    }

    window.open(url, "_blank")
  }

  return (
    <>
      <AdminLayout
        history={(e: any) => props.history.push(e)}
        loading={loading}
        username={data?.userslogs.username}
      >
        <FirstRowStyled>
          <IonCol>
            <CardStyled color="secondary" padding={50} mb={20}>
              <CardSubtitleStyled> Current Balance </CardSubtitleStyled>
              <CardTitleStyled>${saldo}</CardTitleStyled>
              <ButtonOptionPrice
                onClick={() => setShowModal(true)}
                fill="clear"
                shape="round"
                size="small"
              >
                <IonIcon icon={addCircle} size="large" />
              </ButtonOptionPrice>
              <IonModal isOpen={showModal} cssClass="my-custom-class">
                <IonToolbar>
                  <IonTitle>
                    <SubtitleStyled>{date.toLocaleDateString()}</SubtitleStyled>{" "}
                    <br /> Recharge Balance
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
                    <ColModalStyled>
                      <IonRow>
                        <IonCol>
                          <InputPrimary
                            onChangeValue={(props: any) => setAmount(props)}
                            setIcon={cash}
                            setValue={amount}
                            setPlaceholder="Amount"
                            color="admin"
                          />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <BtnPrimary
                          name="Login"
                          onClickHandle={rechargeAmount}
                        />
                      </IonRow>
                    </ColModalStyled>
                  </FirstRowStyled>
                </IonContent>
              </IonModal>
            </CardStyled>
            <IonRow>
              <ColStyled size="3">
                <CardStyled color="primary" padding={5}>
                  <IonCardTitle>Files</IonCardTitle>
                </CardStyled>
              </ColStyled>
              <ColStyled size="9" align="flex-end">
                <IonButtons>
                  <ButtonIconStyled
                    onClick={() => setSkipQuery(false)}
                    color="primary"
                    shape="round"
                    fill="solid"
                  >
                    <IonIcon slot="icon-only" icon={refresh} size="small" />
                  </ButtonIconStyled>
                  <BtnAddFile
                    idUser={id}
                    onSuccess={() => setSkipQuery(false)}
                    color="secondary"
                    fill="solid"
                    size="small"
                  />
                </IonButtons>
              </ColStyled>
            </IonRow>
            <ListStyled>
              {loadFile ? (
                <CardSpinnerStyled>
                  <IonSpinner />
                </CardSpinnerStyled>
              ) : filesList && filesList.length > 0 ? (
                filesList.map((file: any, key: any) => (
                  <File
                    key={key}
                    file={file}
                    onDelete={(e: any) => deleteHandle(e)}
                    saldo={saldo}
                    onSavedConfig={(
                      id: any,
                      orientacion: any,
                      printTypes: any,
                      pageByPlane: any,
                      copies: any,
                      interval: any,
                      nhojas: any,
                      idConfig: any
                    ) =>
                      saveConfig(
                        id,
                        orientacion,
                        printTypes,
                        pageByPlane,
                        copies,
                        interval,
                        nhojas,
                        idConfig
                      )
                    }
                  />
                ))
              ) : (
                <CardStyled padding={20}>
                  <IonCardContent>+ Add Files</IonCardContent>
                  <BtnAddFile
                    idUser={id}
                    onSuccess={() => setSkipQuery(false)}
                    color="primary"
                    fill="clear"
                    size="med"
                  />
                </CardStyled>
              )}
            </ListStyled>
          </IonCol>
        </FirstRowStyled>
      </AdminLayout>
    </>
  )
}

const ColModalStyled = styled(IonCol)`
  padding-top: 40px;
`

const SubtitleStyled = styled.span`
  color: #555555;
  font-size: 0.7rem;
`

const ButtonOptionPrice = styled(IonButton)`
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 50px;
`

const CardSubtitleStyled = styled(IonCardSubtitle)`
  font-size: 0.8rem !important;
`

const CardTitleStyled = styled(IonCardTitle)`
  font-size: 2rem !important;
  font-weight: 800;
`

const ButtonIconStyled = styled(IonButton)`
  --box-shadow: 0px 1px 3px 0px #333333 !important;
`

const ColStyled = styled(IonCol)<{ align?: any }>`
  display: flex;
  margin: 0 !important;
  padding: 0 !important;
  align-items: center;
  justify-content: ${({ align }) => align};
`

const ListStyled = styled(IonList)`
  background: transparent !important;
`

const CardStyled = styled(IonCard)<{ padding: number; mb?: number }>`
  display: flex;
  width: 100% !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ padding }) => padding}px 0;
  margin: 0;
  margin-bottom: ${({ mb }) => mb}px;
`

const CardSpinnerStyled = styled(IonCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  box-shadow: none !important;
  background: transparent !important;
  margin: 0;
`

export default Home
