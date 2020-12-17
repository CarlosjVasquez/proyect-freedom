
import { gql } from "@apollo/client"

export const Query = {
  query: {
    user: gql`
        query($token: String!){
          viewer(token:$token){
            username
            email
          }
        }
      `,
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
        $username:String!,
        $password:String!,
        $email:String!,
      ){
        CreateUserProfiles(
          username: $username,
          password: $password,
          email: $email,
        ){
          userdetalle{
            id
            username
            password
            email
          }
        }
      }
    `,
  },
}
