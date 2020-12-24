import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
  concat,
} from "@apollo/client"

const httpLink = new HttpLink({
  uri: "http://hyhlibertad2.herokuapp.com/graphql/",
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  const token = localStorage.getItem('token')

  operation.setContext({
    headers: {
      authorization: token ? `JWT ${token}` : "",
    }
  });

  return forward(operation);
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
})

export default client
