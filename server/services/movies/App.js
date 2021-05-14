const express = require('express')
const { run } = require('./config/mongodb')
const app = express()
const port = 4001
const movieRouter = require('./routes/movie')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

run().then(async (database) => {
    console.log('Mongo udah connect');
    
    app.use('/movies', movieRouter)

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
})
