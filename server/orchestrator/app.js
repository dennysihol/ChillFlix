const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const movie = require('./schemas/movie')
const series = require('./schemas/series')

const typeDefs = gql`
  type Query
  type Mutation
`
const schema = makeExecutableSchema({
  typeDefs: [typeDefs, movie.typeDefs, series.typeDefs],
  resolvers: [movie.resolvers, series.resolvers]
})

const server = new ApolloServer({ schema })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
});