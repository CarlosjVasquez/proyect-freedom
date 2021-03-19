import { gql } from "@apollo/client"

export const Query = {
  query: {
    user: gql`
      query($token: String!) {
        userslogs(token: $token) {
          username
          email
          activar
          pk
          id
          saldoSet {
            saldo
          }
        }
      }
    `,
    userdata: gql`
      query($token: String!) {
        userslogs(token: $token) {
          id
          email
          username
          firstName
          lastName
          rut
          tlf
          sexo
          fechaNacimiento
          pk
        }
      }
    `,
    allfiles: gql`
      query($name: String!, $id: ID!) {
        allUploads(nombre_Icontains: $name, idUser: $id) {
          edges {
            node {
              id
              nombre
              archivo
              created
              pk
              orientacion
              printTypes
              pageByPlane
              copies
              interval
              configEstado
              idConfig
              nhojas
              price
            }
          }
        }
      }
    `,
    login: gql`
      query($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
          refreshToken
          token
          user {
            idTipoUserId
            idTipoUser
            id
          }
        }
      }
    `,
  },
  mutation: {
    create: gql`
      mutation(
        $username: String!
        $password1: String!
        $password2: String!
        $email: String!
      ) {
        register(
          username: $username
          password1: $password1
          password2: $password2
          email: $email
          firstName: ""
          lastName: ""
          rut: ""
          tlf: ""
          sexo: ""
          fechaNacimiento: ""
        ) {
          success
          token
          refreshToken
          errors
        }
      }
    `,
    verifyAccount: gql`
      mutation($token: String!) {
        verifyAccount(token: $token) {
          success
          errors
        }
      }
    `,
    update: gql`
      mutation(
        $email: String!
        $firstName: String!
        $lastName: String!
        $rut: String!
        $tlf: String!
        $sexo: String!
        $fechaNacimiento: String!
        $id: ID!
      ) {
        UpdateUserData(
          email: $email
          firstName: $firstName
          lastName: $lastName
          rut: $rut
          tlf: $tlf
          sexo: $sexo
          fechaNacimiento: $fechaNacimiento
          activar: "true"
        ) {
          success
          errors
        }
        UserFilaSaldo(id: $id) {
          userprofiles {
            pk
          }
        }
      }
    `,
    upload: gql`
      mutation(
        $nombre: String!
        $idUserId: Int!
        $thefile: String!
        $created: String!
      ) {
        myUpload(
          nombre: $nombre
          idUserId: $idUserId
          thefile: $thefile
          created: $created
        ) {
          success
        }
      }
    `,
    sendPasswordReset: gql`
      mutation($email: String!) {
        sendPasswordResetEmail(email: $email) {
          success
          errors
        }
      }
    `,
    PasswordReset: gql`
      mutation(
        $token: String!
        $newPassword1: String!
        $newPassword2: String!
      ) {
        passwordReset(
          token: $token
          newPassword1: $newPassword1
          newPassword2: $newPassword2
        ) {
          success
          errors
        }
      }
    `,
    delete: gql`
      mutation($id: ID!) {
        deleteUser(id: $id) {
          ok
        }
      }
    `,
    updateConfig: gql`
      mutation(
        $id: ID!
        $orientacion: String!
        $printTypes: String!
        $pageByPlane: String!
        $copies: Int!
        $interval: String!
        $nhojas: Int!
      ) {
        UpdateImpresionConfig(
          id: $id
          orientacion: $orientacion
          printTypes: $printTypes
          pageByPlane: $pageByPlane
          copies: $copies
          interval: $interval
          nhojas: $nhojas
          configEstado: true
          tipoLoginU: "2"
        ) {
          success
          error
        }
      }
    `,
    controlUser: gql`
      mutation($idUser: ID!, $tokenNW: String!) {
        createControlUserData(
          id: $idUser
          idtotemUsado: 0
          tipoLoginU: "2"
          tokenNW: $tokenNW
        ) {
          success
          error
        }
      }
    `,
  },
}
