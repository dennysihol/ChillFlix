const Movie = require('../models/movie')
const redis = require('../redis')

class MovieController {

    static async find(req, res, next) {
        try {
            const cache = await redis.get("movies");
            if(cache) {
                res.json(JSON.parse(cache));
            } else {
                const movies = await Movie.find()
                res.status(200).json(movies)
                await redis.set("movies", JSON.stringify(movies));
            }
        } catch(err) {
            console.log(err);
        }
    }

    static async findOne(req, res, next) {
        try {
            const id = req.params.id;
            const cache = await redis.get("movies");
            const movieCache = JSON.parse(cache)
            if(!movieCache){           
                const movies = await Movie.findOne(id);
                res.status(200).json(movies);
            } else {
                const filteredCache = movieCache.filter((movie) => movie._id === id)[0]
                res.status(200).json(filteredCache)
            }
        } catch(err) {
            console.log(err);
        }
    }

    static async create(req, res, next) {
        try {
            const { title, overview, poster_path, popularity, tags } = req.body;
            const newMovie = await Movie.create({ title, overview, poster_path, popularity, tags })
            res.status(201).json(newMovie)
            await redis.del('movies')
        } catch(err) {
            console.log(err);
        }
    }

    static async update(req, res, next) {
        try {
            const { title, overview, poster_path, popularity, tags } = req.body;
            const id = req.params.id
            const updatedMovie = await Movie.update(id, { title, overview, poster_path, popularity, tags })
            res.status(200).json({message: "Update Success"})
            await redis.del('movies')
        } catch(err) {
            console.log(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const id = req.params.id
            const deletedMovie = await Movie.deleteMovie(id)
            res.status(200).json({message: "Delete Success"})
            await redis.del('movies')
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = MovieController