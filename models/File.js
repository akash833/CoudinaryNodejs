const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
    },
    tags : {
        type : String
    },
    email : {
        type : String
    }
})

module.exports = mongoose.model("File",FileSchema);