import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client"

const httpLink = new HttpLink({
  uri: "http://hyhlibertad2.herokuapp.com/graphql/",
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default client
