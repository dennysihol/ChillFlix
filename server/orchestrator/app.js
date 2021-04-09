const { ApolloServer, gql } = require('apollo-server')
const axios = require("axios")
const redis = require("./redis")

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }


  type Query {
    movies: [Movie]
    series: [Series]
  }
`

const resolvers = {
    Query: {
      movies: async () => {
        try {
          const cache = await redis.get("movies")
          if (cache) {
            return JSON.parse(cache)
          } else {
            const { data } = await axios({
              method: "get",
              url: "http://localhost:4001/movies",
            })
            await redis.set("movies", JSON.stringify(data))
            return data
          }
        } catch (err) {
          console.log(err)
        }
      },
      series: async () => {
          try{
            const cache = await redis.get('tv-series')
            if (cache) {
                return JSON.parse(cache)
              } else {
                const { data } = await axios({
                  method: "get",
                  url: "http://localhost:4002/series",
                })
                await redis.set("tv-series", JSON.stringify(data))
                return data
              }
          } catch (err) {
            console.log(err);
          }
      }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
});