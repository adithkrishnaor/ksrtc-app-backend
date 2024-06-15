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

app.post("/add", (req, res) => {
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
    res.json({ "status": "success" })
})

app.post("/login",(req,res)=>{
    let input =req.body
    usermodel.find({"email":req.body.email}).then(
        (response)=>{
            if(response.length>0)
                {
                    let dbpass =response[0].pass
                    bcryptjs.compare(input.pass,dbpass,(error,isMatch)=>{
                        if (isMatch) {
                            jwt.sign({email:input.email},"ksrtc-app",{expiresIn:"1d"},
                                (error,token)=>{
                                if (error) {
                                    res.json({"status":"unable to create token"})
                                } else {
                                    res.json({"status":"success","name":response[0]._id,"token":token})
                                }
                            })
                        } else {
                            res.json({"status":"incorrect password"})
                        }
                    })
                }
            else{
                res.json({"status":"user not found"})
            }
        }
    )
    })

    app.post("/viewall",(req,res)=>{
        // let token = req.headers["token"]
        // jwt.verify(token,"ksrtc-app",(error,decoded)=>{
        //     if (error) {
        //         res.json({"status":"Unauthorized access"})
        //     } else {
        //         if(decoded)
        //             {
                        busmodel.find().then(
                            (response)=>{
                                res.json(response)
                            }
                        ).catch(
                            (error)=>{
                                res.json(error)
                            }
                        )
                    }
        //   }
        //}
    )
        
    //})

    app.post("/search",(req,res) => {
        let input =req.body
        usermodel.find(input).then(
            (data) => {
                res.json(data)
            }
        ).catch(
            (error) => {
                res.json(error)
            }
        )
    })

app.listen(8080, () => {
    console.log("Server started on port 8080")
})