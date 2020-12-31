import { gql } from "@apollo/client"

export const Query = {
  query: {
    user: gql`
        query($token: String!){
          userslogs(token:$token){
            username
            email
            activar
          }
        }
      `,
    userdata:gql`
      query($token: String!){
        userslogs(token:$token){
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
        ){
          success
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
          input:{
            email: $email,
            firstName: $firstName,
            lastName: $lastName,
            rut: $rut,
            tlf: $tlf,
            sexo: $sexo,
            fechaNacimiento: $fechaNacimiento,
          }
        ){
          success
          errors
        }
      }
    `
  },
}
