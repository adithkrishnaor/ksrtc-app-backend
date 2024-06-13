const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())



app.listen(8080, () => {
    console.log("Server started on port 8080")
})