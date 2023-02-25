const express=require("express");




const Moviemodel=require("../models/movie.model")





const movieRouter=express.Router();


movieRouter.get("/",async(req,res)=>{
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
    query.category && (filter.category={ $in: query.category});
    query.year_lte && (filter.year={ $gt: 0, $lt: query.year_lte })

    let todos
    if(query._sort){
        todos=await Moviemodel.find(filter).sort({year:sortorder});
    }else{
        todos=await Moviemodel.find(filter);
    }
    if(todos){
        res.status(200).send(todos) 
    }else{
        res.status(400).send("somthing is error")

    }

})

movieRouter.get("/title",async(req,res)=>{
    let query=req.query;
    
   try{
 let result=await Moviemodel.find({title:{$regex:query.title,$options:'i'}})
 res.status(200).send(result)
   }
   catch(e){
    res.status(400).send({ message: 'Invalid data provided' })
   }
   



})

movieRouter.post("/",async(req,res)=>{
    let data=req.body;
    let todos=new Moviemodel(data);
    await todos.save();
    res.status(200).send("movie added successfully")
})

movieRouter.get("/:id",async(req,res)=>{
    const id=req.params.id;
  try { let todos=await Moviemodel.findById({_id:id});
    console.log(id)
    res.status(200).send(todos)}
    catch{
         res.status(400).send("error in getting movie")                     
    }

})



movieRouter.patch("/:id",async(req,res)=>{
    const id=req.params.id;
    let payload=req.body;
  
  try{  await Moviemodel.findOneAndUpdate({_id:id},payload)
    const note = await Moviemodel.findOne({_id:id})
    res.status(200).send(note)}
    catch{
      res.status(400).send("error in updating movie")
    }
})

















module.exports=movieRouter