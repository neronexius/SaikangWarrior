const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new Schema({
    service:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    accepter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    requester:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    fields:[{
      type: Object
    }],
    completed:{
      type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date:{
      type: String,
      required: true
    },
    time:{
      type: String,
      required: true
    },


})
const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
