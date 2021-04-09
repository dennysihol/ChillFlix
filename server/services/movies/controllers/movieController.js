const Movie = require('../models/movie')

class MovieController {

    static async find(req, res, next) {
        try {
            const movies = await Movie.find()
            res.status(200).json(movies)
        } catch(err) {
            console.log(err);
        }
    }

    static async findOne(req, res, next) {
        try {
            const id = req.params.id
            const movies = await Movie.findOne(id)
            res.status(200).json(movies)
        } catch(err) {
            console.log(err);
        }
    }

    static async create(req, res, next) {
        try {
            const { title, overview, poster_path, popularity, tags } = req.body;
            const newMovie = await Movie.create({ title, overview, poster_path, popularity, tags })
            res.status(201).json(newMovie)
        } catch(err) {
            console.log(err);
        }
    }

    static async update(req, res, next) {
        try {
            const { title, overview, poster_path, popularity, tags } = req.body;
            const id = req.params.id
            const updatedMovie = await Movie.update(id, { title, overview, poster_path, popularity, tags })
            res.status(200).json(updatedMovie, {message: "Update Success"})
        } catch(err) {
            console.log(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const id = req.params.id
            const deletedMovie = await Movie.deleteMovie(id)
            res.status(200).json(deletedMovie, {message: "Delete Success"})
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = MovieController