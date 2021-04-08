const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let database = null

async function connect() {
    try {
      await client.connect();
      const db = client.db('entertainme');
      database = db

      return database

    } catch(err) {
      // Ensures that the client will close when you finish/error
      console.log(err);
    }
}

module.exports = { 
  connect, 
  getDatabase(){
    return database
  }
}