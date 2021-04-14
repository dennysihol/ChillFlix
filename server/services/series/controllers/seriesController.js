const Series = require('../models/series')
const redis = require('../redis')

class SeriesController {

    static async find(req, res, next) {
        try {
            const cache = await redis.get("tv-series");
            if(cache){
                res.json(JSON.parse(cache));
            } else {
                const series = await Series.find()
                res.status(200).json(series)
                await redis.set("tv-series", JSON.stringify(series))
            }
        } catch(err) {
            console.log(err);
        }
    }

    static async findOne(req, res, next) {
        try {
            const id = req.params.id
            const cache = await redis.get("tv-series")
            const seriesCache = JSON.parse(cache)
            if(!seriesCache){
                const series = await Series.findOne(id)
                res.status(200).json(series)
            } else {
                const filteredCache = seriesCache.filter((series) => series._id ===id)[0]   
                res.status(200).json(filteredCache)
            }
        } catch(err) {
            console.log(err);
        }
    }

    static async create(req, res, next) {
        try {
            const { title, overview, poster_path, popularity, tags } = req.body;
            const newSeries = await Series.create({ title, overview, poster_path, popularity, tags })
            res.status(201).json(newSeries)
            await redis.del('tv-series')
        } catch(err) {
            console.log(err);
        }
    }

    static async update(req, res, next) {
        try {
            const { title, overview, poster_path, popularity, tags } = req.body;
            const id = req.params.id
            const updatedSeries = await Series.update(id, { title, overview, poster_path, popularity, tags })
            res.status(200).json({message: "Update Success"})
            await redis.del('tv-series')
        } catch(err) {
            console.log(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const id = req.params.id
            const deletedSeries = await Series.deleteSeries(id)
            res.status(200).json({message: "Delete Success"})
            await redis.del('tv-series')
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = SeriesController