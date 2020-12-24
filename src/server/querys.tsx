
import { gql } from "@apollo/client"

export const Query = {
  query: {
    user: gql`
        query($token: String!){
          userslogs(token:$token){
            id
            username
            email
            particularActivar
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
          particularRut,
          particularTlf,
          particularSexo,
          particularFechaNacimiento,
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
    refreshToken: gql`
      mutation($rToken: String!){
        refreshToken(refreshToken:$rToken){
          token
        }
      }
    `,
    create: gql`
      mutation(
        $username: String!,
        $password: String!,
        $email: String!,
      ){
        CreateUserProfiles(
          username: $username,
          password: $password,
          email: $email,
          firstName: "",
          lastName: "",
          particularRut: "",
          particularTlf: "",
          particularSexo: "",
          particularFechaNacimiento: "2019-06-11T05:48:11.023255+00:00",
        ){
          userdetalle{
            id
      username
      password
      email
      firstName
      lastName
      particularRut
      particularTlf
      particularTlf
      particularFechaNacimiento
      particularActivar
          }
        }
      }
    `,
    update:gql`
      mutation(
        $id: ID!,
        $email: String!,
        $firstName: String!,
        $lastName: String!, 
        $particularRut: String!,
        $particularTlf: String!,
        $particularSexo: String!,
      ){
        UpdateUserData(
          input:{
            id: $id,
            email: $email,
            firstName: $firstName,
            lastName: $lastName,
            particularRut: $particularRut,
            particularTlf: $particularTlf,
            particularSexo: $particularSexo,
            particularFechaNacimiento: "2019-06-11T05:48:11.023255+00:00",
            particularActivar: true,
          }
        ){
          userUpdate{
            particularActivar
          }
        }
      }
    `
  },
}
