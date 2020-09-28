import gpl from "graphql-tag"

export const Query = {
  query: {},
  mutation: {
    login: gpl`
            mutation(username: String!, password: String!){
                tokenAuth(username: $username, password: $password){
                    token
                }
            }
        `,
  },
}
