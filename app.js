const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcryptjs = require("bcryptjs")
const { usermodel } = require("./models/users")
const { busmodel } = require("./models/buses")
const jwt=require("jsonwebtoken")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://adith:adith@cluster0.7mlz85p.mongodb.net/ksrtc-app?retryWrites=true&w=majority&appName=Cluster0")

app.post("/addbus", (req, res) => {
    let input = req.body
    let buses = new busmodel(input)
    buses.save()
    console.log(buses)
    res.json({ "status": "success" })
})

const generateHashPswd = async (pswd) => {
    const salt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(pswd, salt)
}

app.post("/signup", async (req, res) => {
    let input = req.body
    let hashedpswd = await generateHashPswd(input.pass)
    console.log(hashedpswd)
    input.pass = hashedpswd
    let newusers = new usermodel(input)
    newusers.save()
    res.json({ "status": "signup success" })
})

app.listen(8080, () => {
    console.log("Server started on port 8080")
})