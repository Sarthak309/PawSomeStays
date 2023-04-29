const mongoose = require('mongoose')
const serviceSchema = new mongoose.Schema(
    {
        userid:{
            type:String,
            required:true
        },
        services:{
            type: Array,
            required:true
        },
        from:{
            type:String,
            required:true
        },
        to:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model("services",serviceSchema)