import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  NormalizedCacheObject,
  concat,
} from "@apollo/client"

import { createUploadLink } from "apollo-upload-client"

const httpLink = createUploadLink({
  uri: "http://hyhlibertad2.herokuapp.com/graphql/",
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  const token = localStorage.getItem("token")

  operation.setContext({
    headers: {
      authorization: token ? `JWT ${token}` : "",
    },
  })

  return forward(operation)
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
})

export default client
