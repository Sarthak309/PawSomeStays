const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
       name:{
        type:String,
        required:true,
        min:3,
        max:15
       },
       email:{
        type:String,
        required:true,
        unique:true,
        min:10,
        max:30
       },
       phnumber:{
        type:String,
        required:true,
        max:10
       },
       spassword:{
        type:String,
        required:true,
        min:8
       },
       pname:{
        type:String,
        required:true
       },
       ptype:{
        type:String,
        required:true
       },
       pbreed:{
        type:String,
        required:true
       }
    }
)

module.exports = mongoose.model("insaan",userSchema)