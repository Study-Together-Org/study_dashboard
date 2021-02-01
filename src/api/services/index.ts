import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4001/study_api',
});

export const StoreService = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
});
