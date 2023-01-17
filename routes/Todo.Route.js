const express=require("express");




const Todomodel=require("../models/Todo.model")





const TodoRouter=express.Router();


TodoRouter.get("/",async(req,res)=>{
    let query=req.query;
    let todos=await Todomodel.find(query);
    res.send(todos)

})


TodoRouter.patch("/:id",async(req,res)=>{
    const id=req.params.id;
    let payload=req.body;
  
    await Todomodel.findOneAndUpdate({id},payload)
    const note = await Todomodel.findOne({id:id})
    res.send(note)
})
















module.exports=TodoRouter