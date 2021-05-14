const Series = require('../models/series')

class SeriesController {

    static async find(req, res, next) {
        try {
            const series = await Series.find()
            res.status(200).json(series)
        } catch(err) {
            console.log(err);
        }
    }

    static async create(req, res, next) {
        try {
            const { title, overview, poster_path, popularity, tags } = req.body;
            const newSeries = await Series.create({ title, overview, poster_path, popularity, tags })
            res.status(201).json(newSeries)
        } catch(err) {
            console.log(err);
        }
    }

    static async update(req, res, next) {
        try {
            const { title, overview, poster_path, popularity, tags } = req.body;
            const id = req.params.id
            const updatedSeries = await Series.update(id, { title, overview, poster_path, popularity, tags })
            res.status(200).json(updatedSeries, {message: "Update Success"})
        } catch(err) {
            console.log(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const id = req.params.id
            const deletedSeries = await Series.deleteSeries(id)
            res.status(200).json(deletedSeries, {message: "Delete Success"})
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = SeriesController