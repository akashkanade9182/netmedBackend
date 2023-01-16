const express=require("express");




const Todomodel=require("../models/Todo.model")



const TodoRouter=express.Router();




TodoRouter.get("/",async(req,res)=>{
    const query=req.query;
    
   

try{
    const todos=await Todomodel.find(query);
    res.send(todos);
}
catch(err){
    console.log(err);
    res.send("error in getting todos")
}
})

TodoRouter.get("/:userId",async(req,res)=>{
  const Id=req.params.userId

try{
    const todos=await Todomodel.find({_id:Id});
    res.send(todos);
}
catch(err){
    console.log(err);
    res.send("error in getting todos")
}
})















module.exports=TodoRouter