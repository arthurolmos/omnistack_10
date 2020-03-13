const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const mongoose = require('mongoose')

const app = express()

mongoose.connect("mongodb+srv://admin:admin@omnistack10-l0lcx.mongodb.net/omnistack10", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}))
app.use(routes)

app.listen(3333)