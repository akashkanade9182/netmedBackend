const express=require("express");




const Todomodel=require("../models/Todo.model")





const TodoRouter=express.Router();


TodoRouter.get("/",async(req,res)=>{
    let query=req.query;
    let sortorder;
    if(req.query._order){
        if(req.query._order==="asc"){
            sortorder=1
        }else{
            sortorder=-1
        }
    }else{
        sortorder
    }
    let filter={};
    query.category && (filter.category=query.category);
    query.brand && (filter.brand={ $in: query.brand});
    query.price_lte && (filter.price={ $gt: 0, $lt: query.price_lte })

    let todos
    if(query._sort){
        todos=await Todomodel.find(filter).sort({price:sortorder});
    }else{
        todos=await Todomodel.find(filter);
    }
    res.send(todos)

})

TodoRouter.post("/",async(req,res)=>{
    let data=req.body;
    let todos=new Todomodel(data);
    await todos.save();
    res("product added successfully")
})

TodoRouter.get("/:id",async(req,res)=>{
    const id=req.params.id;
    let todos=await Todomodel.findOne({id});
    res.send(todos)

})


TodoRouter.patch("/:id",async(req,res)=>{
    const id=req.params.id;
    let payload=req.body;
  
    await Todomodel.findOneAndUpdate({id},payload)
    const note = await Todomodel.findOne({id:id})
    res.send(note)
})

exports.module=TodoRouter
















module.exports=TodoRouter