const express = require('express')
const { run } = require('./config/mongodb')
const app = express()
const port = 3000
const router = require('./routes/index')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

run().then(async (database) => {
    console.log('Mongo udah connect');
    
    app.use(router)

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
})
