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
import Toast from "../../components/Toast/Toast"

import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import InputPrimary from "../../components/InputPrimary/InputPrimary"

const { user, listRazon, allfiles: FILES } = Query.query

const {
  delete: FDELETE,
  updateConfig: UPCONFIG,
  solictAbono,
  updateAbono,
  verify,
  refreshToken,
} = Query.mutation

const Home: React.FC = (props: any) => {
  const [id, setId] = useState<number>()
  const [filesList, setFilesList] = useState<any>()
  const [idUser, setIdUser] = useState<string>("")
  const [skipQuery, setSkipQuery] = useState(true)
  const [saldo, setSaldo] = useState("0")
  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState<string>("3000")
  const [error, setError] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>("")
  const [idAbono, setIdAbono] = useState<number>(0)
  const [dte, setDte] = useState<string>("boleta")
  const [rsId, setRsId] = useState<number>(0)
  const [listRs, setListRs] = useState<any>()
  const [rs, setRs] = useState<boolean>(false)
  const [skipList, setSkipList] = useState(true)

  const token = localStorage.getItem("token")

  const date = new Date()

  const [RefreshToken] = useMutation(refreshToken, {
    onCompleted: ({ refreshToken }) => {
      localStorage.setItem("token", refreshToken.token)
    },
    onError: (e) => {
      console.log(e)
      props.history.push("/login")
    },
  })

  const [Verify] = useMutation(verify, {
    onError: () => {
      RefreshToken({
        variables: {
          refresh: localStorage.getItem("refreshToken"),
        },
      })
    },
  })

  const { loading: listload } = useQuery(listRazon, {
    variables: {
      idUser: id,
    },

    skip: skipList,
    onCompleted: ({ razonSocial2 }) => {
      let list: object[] = []

      razonSocial2.edges.map((item: any) => {
        list.push({ option: item.node.razonsocial, value: item.node.pk })
      })

      setListRs(list)
      setSkipList(true)
      setRs(true)
    },
    onError: (e) => {
      console.log(e)
    },
  })

  useEffect(() => {
    const verifyTokenUser = setInterval(() => {
      Verify({
        variables: {
          token:
            localStorage.getItem("token") === null
              ? ""
              : localStorage.getItem("token"),
        },
      })
    }, 1000)

    return () => {
      clearInterval(verifyTokenUser)
    }
  })

  useEffect(() => {
    if (dte === "boleta") {
      setRs(false)
      setSkipList(true)
    } else {
      if (!listRs) {
        setSkipList(false)
      } else {
        setRs(true)
      }
    }
  }, [dte])

  const { loading, data } = useQuery<{ userslogs: any }>(user, {
    variables: {
      token: token,
    },
    onCompleted: ({ userslogs }) => {
      if (!userslogs.activar) {
        props.history.push("/registerdata")
      }
      setId(userslogs.pk)
      setIdUser(userslogs.id)
      setSaldo(
        userslogs.saldoSet[0] === undefined ? "0" : userslogs.saldoSet[0].saldo
      )
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
    onCompleted: ({ UpdateImpresionConfig }: any) => {
      console.log(UpdateImpresionConfig)
      if (UpdateImpresionConfig.success) {
        setSkipQuery(false)
      } else {
        setMessageError(UpdateImpresionConfig.error)
        setError(true)
      }
    },
    onError: (e) => {
      console.log(e)
      setMessageError(e.message)
      setError(true)
    },
  })

  const saveConfig = (
    id: any,
    idConfig: any,
    printTypes: any,
    pageByPlane: any,
    copies: any,
    interval: any,
    nhojas: any
  ) => {
    console.log(id, idConfig, printTypes, pageByPlane, copies, interval, nhojas)
    upConfig({
      variables: {
        id,
        orientacion: idConfig,
        printTypes,
        pageByPlane,
        copies,
        interval,
        nhojas,
      },
    })
  }

  const rechargeAmount = () => {
    const url = `https://hyhlibertad2.herokuapp.com/webpay/webpay-plus-create/${idAbono}`
    setShowModal(false)
    setAmount("3000")
    setDte("boleta")
    setIdAbono(0)
    window.open(url, "_blank")
  }

  const [SolictAbono] = useMutation(solictAbono, {
    onCompleted: ({ idAbono }) => {
      if (idAbono.success) {
        setShowModal(true)
        setIdAbono(idAbono.success)
      }
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const Abono = () => {
    SolictAbono({
      variables: {
        idUser: id,
      },
    })
  }

  const [UpdateAbono] = useMutation(updateAbono, {
    onCompleted: ({ updateAbono }) => {
      if (updateAbono.success) {
        rechargeAmount()
      }
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const UpAbono = () => {
    console.log(idAbono, amount, dte === "boleta" ? 39 : 33, rs ? rsId : 0)
    UpdateAbono({
      variables: {
        idAbono,
        amount,
        dte: dte === "boleta" ? 39 : 33,
        idRazon: rs ? rsId : 0,
      },
    })
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
                onClick={Abono}
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
                            select={true}
                            options={[
                              { option: "3000" },
                              { option: "5000" },
                              { option: "10000" },
                              { option: "15000" },
                              { option: "20000" },
                              { option: "30000" },
                              { option: "40000" },
                              { option: "50000" },
                              { option: "60000" },
                              { option: "70000" },
                              { option: "80000" },
                              { option: "90000" },
                              { option: "100000" },
                            ]}
                            color="admin"
                            space={85}
                          />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <InputPrimary
                            onChangeValue={(props: any) => setDte(props)}
                            setIcon={cash}
                            setValue={dte}
                            setPlaceholder="D.T.E"
                            select={true}
                            options={[
                              { option: "boleta" },
                              { option: "factura" },
                            ]}
                            color="admin"
                            space={70}
                          />
                        </IonCol>
                      </IonRow>
                      {rs && !listload ? (
                        <>
                          <IonRow>
                            <IonCol>
                              <InputPrimary
                                onChangeValue={(props: any) => setRsId(props)}
                                setIcon={cash}
                                setValue={rsId}
                                setPlaceholder="Razon Social"
                                select={true}
                                options={listRs}
                                color="admin"
                                space={120}
                              />
                            </IonCol>
                          </IonRow>
                        </>
                      ) : null}

                      <IonRow>
                        <BtnPrimary name="Send" onClickHandle={UpAbono} />
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
                      idConfig: any,
                      printTypes: any,
                      pageByPlane: any,
                      copies: any,
                      interval: any,
                      nhojas: any
                    ) =>
                      saveConfig(
                        id,
                        idConfig,
                        printTypes,
                        pageByPlane,
                        copies,
                        interval,
                        nhojas
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
          <Toast
            duration={1500}
            active={error}
            message={messageError}
            onDidDismiss={() => setError(false)}
          />
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
