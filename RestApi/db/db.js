const mongoose = require("mongoose");

const scheama = mongoose.Schema({
    data:{
        type: String,
        require: true
    },
    name:{
      type: String, 
      requier: true
    },
    url:{
        type: String,
        require: true
    },
})

const models = mongoose.model("CRUD", scheama);

module.exports.db = models;