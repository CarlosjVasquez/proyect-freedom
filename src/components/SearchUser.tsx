import {
  IonRow,
  IonModal,
  IonGrid,
  IonCol,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
} from "@ionic/react";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import FormUser from "./FormUser";

interface Node {
  edges: [
    {
      node: {
        nombre: string;
        apellido: string;
        fechaNacimiento: Date;
        correo: string;
        id: number;
      };
    }
  ];
}

interface UserData {
  QueryRut: Node;
}

interface UserVars {
  rut: number | undefined;
}

const SearchUser: React.FC<{
  selectShowModalValue: true | false;
  onSelectShowModalValue: (value: true | false) => void;
  selectRut: number | undefined;
}> = (props) => {
  const inputChangeHandler = () => {
    props.onSelectShowModalValue(false);
  };

  const allQuery = gql`
  query QueryRut {
    QueryRut(rut_Icontains: ${props.selectRut}) {
      edges {
        node {
          nombre
          apellido
          fechaNacimiento
          correo
          id
        }
      }
    }
  }
`;

  const { data } = useQuery<UserData>(allQuery);

  return (
    <IonModal isOpen={props.selectShowModalValue}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Form Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <FormUser
                rutExist={true}
                selectUserValue={undefined}
                onSelectUserValue={() => {}}
                selectRut={props.selectRut}
              />
              {data &&
                data.QueryRut.edges.map((user) => (
                  <IonItem key={user.node.id}>
                    <p>{user.node.nombre}</p>
                    <p>{user.node.apellido}</p>
                    <p>{user.node.fechaNacimiento}</p>
                    <p>{user.node.correo}</p>
                  </IonItem>
                ))}
              <IonButton onClick={inputChangeHandler}>Close</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default SearchUser;
