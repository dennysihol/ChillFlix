const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require("mongodb");

class Series {
    static find() {
        return getDatabase().collection('TV_Series').find().toArray()
    }
    static create(newSeries) {
        return getDatabase().collection('TV_Series').insertOne(newSeries);
      }
      static update(id, updatedSeries) {
        return getDatabase().collection('TV_Series').updateOne(
          { _id: ObjectId(id) },
          {
            $set: updatedSeries,
          }
        );
      }
      static deleteSeries(id) {
        return getDatabase().collection('TV_Series').deleteOne({ _id: ObjectId(id) });
      }
}

module.exports = Series