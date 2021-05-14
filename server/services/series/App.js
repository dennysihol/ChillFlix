const express = require('express')
const { connect } = require('./config/mongodb')
const app = express()
const port = 4002
const seriesRouter = require('./routes/series')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

connect().then(async (database) => {
    console.log('Mongo udah connect');
    
    app.use('/series', seriesRouter)

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
})
