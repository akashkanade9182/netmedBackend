const mongoose=require("mongoose")


const movieSchema=mongoose.Schema({
   
    title: {type:String,require:true},
    image: {type:String,require:true},
    category:{type:String,require:true},
    industry:{type:String,require:true},
    rating: {type:Number,require:true},
    year:{type:Number,require:true},
    link1: {type:String,require:true},
    link2: {type:String,require:true},
    link3: {type:String,require:true},
})

const Moviemodel=mongoose.model("movie",movieSchema);

module.exports=Moviemodel;