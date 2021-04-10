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
    movies: [Movie]
    movie(_id: String): Movie
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
    removeMovie(id: String): removeMessage
    editMovie(id: String, movie: editMovie): editMessage
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
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
    movie: async (_, args) => {
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
    addMovie: async (parent, args, context, info) => {
        await redis.del("movies")
        const { title, overview, popularity, poster_path, tags } = args.movie;
        try {
            const { data } = await axios({
            url: "http://localhost:4001/movies",
            method: "post",
            data: {
                title,
                overview,
                popularity,
                poster_path,
                tags,
            },
            });
            const { oldData } = await axios.get("http://localhost:4001/movies");
            await redis.set("movies", JSON.stringify(oldData));
            return data[0];
        } catch (error) {
            console.log(error);
        }
    },
    removeMovie: async (parent, args, context, info) => {
        await redis.del("movies")
        const { _id } = args
        try {
            const { data } = await axios({
            url: `http://localhost:4001/movies/${_id}`,
            method: "delete",
            });
            const { oldData } = await axios.get("http://localhost:4001/movies");
            await redis.set("movies", JSON.stringify(oldData));
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    editMovie: async (parent, args, context, info) => {
        await redis.del("movies")
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
            const { oldData } = await axios.get("http://localhost:4001/movies");
            await redis.set("movies", JSON.stringify(oldData));
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