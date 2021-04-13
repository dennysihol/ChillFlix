const { gql } = require("apollo-server");
const axios = require("axios");
const redis = require("../redis");

const typeDefs = gql`
  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  extend type Query {
    getSeries: [Series]
    seriesOne(_id: ID): Series
  }
  input newSeries {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }
  input editSeries {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }
  type removedMessage {
    msg: String
  }
  type editedMessage {
    msg: String
  }
  extend type Mutation {
    addSeries(series: newSeries): Series
    removeSeries(id: String): removedMessage
    editSeries(id: String, series: editSeries): editedMessage
  }
`;

const resolvers = {
  Query: {
    getSeries: async () => {
      try {
        const cache = await redis.get("tv-series");

        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data } = await axios({
            method: "get",
            url: "http://localhost:4002/series",
          });

          await redis.set("tv-series", JSON.stringify(data));

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    seriesOne: async (_, args) => {
        try {
            const { _id } = args
            const { data } = await axios({
                method: 'get',
                url: `http://localhost:4002/series/${_id}`
            })
            return data
        } catch (err) {
            console.log(err)
        }
    },
  },
  Mutation: {
    addSeries: async (parent, args, context, info) => {
        const addNewSeries = {
            title: args.series.title,
            overview: args.series.overview,
            popularity: args.series.popularity,
            poster_path: args.series.poster_path,
            tags: args.series.tags,
        }
        try {
            const { data } = await axios({
            url: "http://localhost:4002/series",
            method: "post",
            data: addNewSeries
            });
            await redis.del("tv-series")
            return data
        } catch (error) {
            console.log(error);
        }
    },
    removeSeries: async (parent, args, context, info) => {        
        const { _id } = args
        try {
            const { data } = await axios({
            url: `http://localhost:4002/series/${_id}`,
            method: "delete",
            });
            await redis.del("tv-series")
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    editSeries: async (parent, args, context, info) => {        
        const { title, overview, popularity, poster_path, tags } = args.series;
        const { _id } = args
        try {
            const { data } = await axios({
            url: `http://localhost:4002/series/${_id}`,
            method: "put",
            data: {
                title,
                overview,
                popularity,
                poster_path,
                tags,
            },
            });
            await redis.del("tv-series")
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