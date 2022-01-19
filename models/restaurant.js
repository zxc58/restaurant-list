const mongoose = require("mongoose");


const resSchema = new mongoose.Schema({
    name : {type:String ,required:true},
    name_en : {type:String},
    category : {type:String},
    image : {type:String},
    location : {type:String},
    phone : {type:String},
    google_map : {type:String},
    rating : {type:Number},
    description : {type:String}
});
module.exports = mongoose.model("restaurant",resSchema);