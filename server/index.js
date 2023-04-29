const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRouts = require('./routs/userRouts')
const serviceRouts = require('./routs/serviceRouts')

const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true }))
require("dotenv").config()


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("Gaadi start krrr...")
}).catch((err)=>{
    console.log(err.message)
})

app.listen(process.env.PORT,()=>{
    console.log(`Server started \n http://localhost:${process.env.PORT}`)
})


app.use('/api/auth',userRouts)
app.use('/api/auth',serviceRouts)


