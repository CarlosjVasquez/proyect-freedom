import { gql } from "@apollo/client"

export const Query = {
  query: {
    user: gql`
        query($token: String!){
          userslogs(token:$token){
            username
            email
            activar
            pk
            id
          }
        }
      `,
    userdata:gql`
      query($token: String!){
        userslogs(token:$token){
          id,
          email,
          username,
          firstName,
          lastName,
          rut,
          tlf,
          sexo,
          fechaNacimiento,
        }
      }
    `,
    allfiles:gql`
    query(
      $nombre: String!,
      $id: ID!,
    ){
      allUploads(
        nombre_Icontains: $nombre,
        idUser: $id,
      ){
        edges{
          node{
            id
            nombre
            archivo
            created
          }
        }
      }
    }
  `
  },
  mutation: {
    login: gql`
        mutation($username: String!,$password: String!){
          tokenAuth(username:$username, password:$password){
            refreshToken
            token
          }
        }
      `,
    create: gql`
      mutation(
        $username: String!,
        $password1: String!,
        $password2: String!,
        $email: String!,
      ){
        register(
          username: $username,
          password1: $password1,
          password2: $password2,
          email: $email,
          firstName: "",
          lastName: "",
          rut: "",
          tlf: "",
          sexo: "",
          fechaNacimiento: "",
          idDireccion: "0",
          idTipoUser: "2",
        ){
          success
          token
          refreshToken
          errors
        }
      }
    `,
    verifyAccount: gql`
      mutation(
        $token: String!
      ){
        verifyAccount(
          token: $token
        ){
          success
          errors
        }
      }
    `,
    update:gql`
      mutation(
        $email: String!,
        $firstName: String!,
        $lastName: String!, 
        $rut: String!,
        $tlf: String!,
        $sexo: String!,
        $fechaNacimiento: String!,
      ){
        UpdateUserData(
          email: $email,
          firstName: $firstName,
          lastName: $lastName,
          rut: $rut,
          tlf: $tlf,
          sexo: $sexo,
          fechaNacimiento: $fechaNacimiento,
          idDireccion: "0",
          idTipoUser: "2",
          activar:"true",
        ){
          success
          errors
        }
      }
    `,
    upload:gql`
      mutation(
        $nombre: String!,
        $idUserId: Int!,
        $thefile: String!,
        $created: String!,
      ){
        myUpload(
          nombre: $nombre,
          idUserId: $idUserId,
          thefile: $thefile,
          created: $created,
        ){
          success
        }
      }
    `,
    sendPasswordReset:gql`
      mutation(
        $email: String!
      ){
        sendPasswordResetEmail(
          email:$email
        ){
          success
          errors
        }
      }
    `,
    PasswordReset:gql`
    mutation(
      $token: String!,
      $newPassword1: String!
      $newPassword2: String!
    ){
      passwordReset(
        token: $token,
        newPassword1: $newPassword1,
        newPassword2: $newPassword2,
      ){
        success
        errors
      }
    }
  `,
  },
}
