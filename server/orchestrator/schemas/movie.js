const { gql } = require("apollo-server");
const axios = require("axios");
const redis = require("../redis");

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  extend type Query {
    getMovies: [Movie]
    getMovie(_id: String): Movie
  }
  input newMovie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }
  input editMovie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }
  type removeMessage {
    msg: String
  }
  type editMessage {
    msg: String
  }
  extend type Mutation {
    addMovie(movie: newMovie): Movie
    removeMovie(_id: String): removeMessage
    editMovie(_id: String, movie: editMovie): editMessage
  }
`;

const resolvers = {
  Query: {
    getMovies: async () => {
      try {
        const cache = await redis.get("movies");
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data } = await axios({
            method: "get",
            url: "http://localhost:4001/movies",
          });
          await redis.set("movies", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getMovie: async (_, args) => {
        try {
            const { _id } = args
            const { data } = await axios({
                method: 'get',
                url: `http://localhost:4001/movies/${_id}`
            })
            return data
        } catch (err) {
            console.log(err)
        }
    }
  },
  Mutation: {
    addMovie: async (_, args, context, info) => {
        const addNewMovie = {
            title: args.movie.title,
            overview: args.movie.overview,
            popularity: args.movie.popularity,
            poster_path: args.movie.poster_path,
            tags: args.movie.tags,
        }
        try {
            const { data } = await axios({
                url: "http://localhost:4001/movies",
                method: "post",
                data: addNewMovie
            });
            await redis.del("movies")
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    removeMovie: async (_, args, context, info) => {
        const { _id } = args
        try {
            const { data } = await axios({
            url: `http://localhost:4001/movies/${_id}`,
            method: "delete",
            });
            await redis.del("movies")
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    editMovie: async (_, args, context, info) => {
        const { _id } = args
        const { title, overview, popularity, poster_path, tags } = args.movie;
        try {
            const { data } = await axios({
            url: `http://localhost:4001/movies/${_id}`,
            method: "put",
            data: {
                title,
                overview,
                popularity,
                poster_path,
                tags,
            },
            });
            await redis.del("movies")
            return data;
        } catch (error) {
            console.log(error);
        }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};