import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export const GET_FAV_FILM = gql`
  query {
    favFilms @client {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

client.writeQuery({
  query: GET_FAV_FILM,
  data: {
    favFilms: [],
  },
});

export default client;