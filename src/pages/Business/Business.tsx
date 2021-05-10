import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { IonCol, IonCard, IonCardContent } from "@ionic/react"
import styled from "styled-components"

import Card from "../../components/Admin/Card/Card"

import { Query } from "../../server/querys"
import AdminLayout from "../../Layouts/AdminLayout/AdminLayout"
import { FirstRowStyled } from "../../components/ContainerForm/ContainerForm"
import BtnBack from "../../components/BtnBack/BtnBack"

const { userdata, listRazon } = Query.query

const UserData: React.FC = (props: any) => {
  const [idUser, setIdUser] = useState<number>(0)
  const token = localStorage.getItem("token")
  const [skipList, setSkipList] = useState(false)

  const { loading: listload, data: listdata } = useQuery(listRazon, {
    variables: {
      idUser,
    },
    onCompleted: () => {
      setSkipList(false)
    },
    onError: (e) => {
      console.log(e)
    },
    skip: skipList,
  })

  const { loading, data } = useQuery<{ userslogs: any }>(userdata, {
    variables: {
      token: token,
    },
    onCompleted: ({ userslogs }) => {
      setIdUser(userslogs.pk)
    },
    onError: (e) => {
      console.log(e)
      props.history.push("/login")
    },
  })

  const onBackHandle = () => {
    props.history.push("/home")
  }

  return (
    <>
      <AdminLayout
        history={(e: any) => props.history.push(e)}
        loading={loading}
        username={data?.userslogs.username}
      >
        <FirstRowStyled>
          <BtnBack onBack={onBackHandle} color="primary" />
          <IonCol>
            {listload ? (
              <>loading....</>
            ) : (
              <>
                {listdata.razonSocial2.edges.map((item: any, key: any) => (
                  <Card
                    key={key}
                    title={item.node.razonsocial}
                    onHandleCard={() =>
                      props.history.push(`/businessdetail/${item.node.pk}`)
                    }
                  ></Card>
                ))}
                {listdata.razonSocial2.edges.length < 3 && (
                  <CardStyled
                    onClick={() => props.history.push("/businessadd")}
                    padding={20}
                  >
                    <IonCardContent>+ Add</IonCardContent>
                  </CardStyled>
                )}
              </>
            )}
          </IonCol>
        </FirstRowStyled>
      </AdminLayout>
    </>
  )
}

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

export default UserData
