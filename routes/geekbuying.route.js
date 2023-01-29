const express=require("express");




const Geekmodel=require("../models/geekbuying.model")





const geekRouter=express.Router();


geekRouter.get("/",async(req,res)=>{
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
        todos=await Geekmodel.find(filter).sort({price:sortorder});
    }else{
        todos=await Geekmodel.find(filter);
    }
    res.send(todos)

})

geekRouter.get("/title",async(req,res)=>{
    let query=req.query;
    
   try{
 let result=await Geekmodel.find({title:{$regex:query.title,$options:'i'}})
 res.send(result)
   }
   catch(e){
    res.status(400).json({ message: 'Invalid data provided' })
   }
   



})


geekRouter.post("/",async(req,res)=>{
    let data=req.body;
    let todos=new Geekmodel(data);
    await todos.save();
    res("product added successfully")
})

geekRouter.get("/:id",async(req,res)=>{
    const id=req.params.id;
    let todos=await Geekmodel.findById({_id:id});
    console.log(id)
    res.send(todos)

})



geekRouter.patch("/:id",async(req,res)=>{
    const id=req.params.id;
    let payload=req.body;
  
    await Geekmodel.findOneAndUpdate({_id:id},payload)
    const note = await Geekmodel.findOne({_id:id})
    res.send(note)
})




module.exports=geekRouter