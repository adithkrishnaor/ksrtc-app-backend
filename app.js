const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect("mongodb+srv://adith:adith@cluster0.7mlz85p.mongodb.net/ksrtc-app?retryWrites=true&w=majority&appName=Cluster0")

app.post("/addbus",(req,res) => {
    let input = req.body
    let buses = new busmodel(input)
    buses.save()
    console.log(buses)
    res.json({"status":"success"})
})


app.listen(8080, () => {
    console.log("Server started on port 8080")
})