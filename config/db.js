const mongoose=require("mongoose")
require('dotenv').config()

const connection=mongoose.connect("mongodb+srv://akashkanade:akash1995@cluster0.vycxlvl.mongodb.net/netmed?retryWrites=true&w=majority")

module.exports=connection;