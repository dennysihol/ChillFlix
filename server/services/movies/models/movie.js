const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require("mongodb");

class Movie {
    static find() {
        return getDatabase().collection('Movies').find().toArray()
    }
    static findOne(id) {
      return getDatabase().collection('Movies').findOne({ _id: ObjectId(id)})
    }
    static create(newMovie) {
        return getDatabase().collection('Movies').insertOne(newMovie);
    }
    static update(id, updatedMovie) {
      return getDatabase().collection('Movies').updateOne(
        { _id: ObjectId(id) },
        {
          $set: updatedMovie,
        }
      );
    }
    static deleteMovie(id) {
      return getDatabase().collection('Movies').deleteOne({ _id: ObjectId(id) });
    }
}

module.exports = Movie