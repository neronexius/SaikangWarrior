const mongoose = require("mongoose")
const {Schema} = mongoose

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    fieldsneeded: [{
        type: Object
    }],
    approved:{
        type: Boolean,
        default: false,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type: Number,
        required: true,
    }
})

const Service = mongoose.model("Service",serviceSchema)

module.exports = Service