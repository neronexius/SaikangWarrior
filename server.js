//importing 
const express = require("express")
const server = express()
require('dotenv').config()
require('./lib/connection')
const passport = require('./lib/auth')
const cors = require('cors')

//middleware
server.use(express.json())
server.use(cors())
//routes
server.use("/auth",require("./routes/auth.routes"))
server.use("/services",require("./routes/services.routes"))
server.use("/user",require("./routes/user.routes"))


//listen

server.listen(process.env.PORT,()=>{
    console.log(`Running server on port ${process.env.PORT}`)
})