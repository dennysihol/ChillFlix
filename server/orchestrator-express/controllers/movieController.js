const redis = require('../redis')
const axios = require("axios");

class MovieController {

  static async getMovie(req, res) {
    //   res.send('masuk movie controller nih')
    try {
      const cache = await redis.get("movies");
      if (!cache) {
          const { data } = await axios.get("http://localhost:4001/movies");
          await redis.set("movies", JSON.stringify(data));
          res.json(data);
        } else {
          res.json(JSON.parse(cache));
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async addMovie(req, res) {    
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const addMovie = await axios({
        method: "post",
        url: "http://localhost:4001/movies",
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        },
      });
      const { data } = await axios.get("http://localhost:4001/movies");
      res.json(data);
      await redis.del('movies')
    } catch (error) {
      console.log(error);
    }
  }

  static async updateMovie(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const editMovie = await axios({
        method: "put",
        url: `http://localhost:4001/movies/${req.params.id}`,
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        },
      });
      const { data } = await axios.get("http://localhost:4001/movies");
      await redis.set("movies", JSON.stringify(data));
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteMovie(req, res) {
    try {
      const deleteMovie = await axios({
        method: "delete",
        url: `http://localhost:4001/movies/${req.params.id}`,
      });
      const { data } = await axios.get("http://localhost:4001/movies");
      await redis.set("movies", JSON.stringify(data));
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MovieController;