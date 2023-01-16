const express=require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const Todomodel=require("../models/Todo.model")
const { send } = require("process");


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

TodoRouter.post("/",async(req,res)=>{
   const payload=req.body;

try{
   const todo=new Todomodel(payload);
   await todo.save();
   res.send("todo added successfully")
}
catch(err){
    console.log(err);
    res.send("error in getting todos")
}

})


TodoRouter.patch("/update/:userId",async(req,res)=>{
    const payload=req.body;
    const Id=req.params.userId;
 
    const id=await Todomodel.findOne({_id:Id})

 
 try{

        await Todomodel.findByIdAndUpdate({_id:Id},payload)
    
        res.send("todo update successfully")
   

 }
 catch(err){
     console.log(err);
     res.send("error in getting todos")
 }
 
 })




TodoRouter.put("/update/:userId",async(req,res)=>{
    const payload=req.body;
    const Id=req.params.userId;
    const userId=req.body.userId;
    const id=await Todomodel.findOne({_id:Id})

 
 try{
   
        await Todomodel.findByIdAndUpdate({_id:Id},payload)
    
        res.send("todo replace successfully")
   

 }
 catch(err){
     console.log(err);
     res.send("error in getting todos")
 }
 
 })



 TodoRouter.delete("/:userId",async(req,res)=>{
   
    
    const Id=req.params.userId;
    const userId=req.body.userId;
    const id=await Todomodel.findOne({_id:Id})
 
 try{
  
        await Todomodel.findByIdAndDelete({_id:Id})
    
        res.send("todo deleted successfully")
    

   
 }
 catch(err){
     console.log(err);
     res.send("error in getting todos")
 }
 
 })

module.exports=TodoRouter