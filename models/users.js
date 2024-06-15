const mongoose=require("mongoose")
const schema=mongoose.Schema({
    "name":{type:String,require:true},
    "email":{type:String,require:true},
    "pno":{type:String,require:true},
    "gender":{type:String,require:true},
    "pass":{type:String,require:true},
    "cpass":{type:String,require:true}
})

let usermodel=mongoose.model("users",schema)
module.exports={usermodel}