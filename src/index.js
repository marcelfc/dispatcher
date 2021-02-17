const app = require('express')()
const consign = require('consign')
const dotenv = require('dotenv')
dotenv.config();
const db = require('./config/db')

app.db = db

consign().include('./src/config/redis.js')
    .then('./src/data/queue.js')
    .then('./src/services/queue.js')
    .then('./src/services/job.js')
    .into(app)

app.src.services.queue.init().then(() => {
    app.src.services.job.init()
})


app.listen(3000, () => {
    console.log('Dispatcher Running...')
})