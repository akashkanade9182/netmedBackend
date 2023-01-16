const express=require("express");
const cors = require('cors')


const connection=require("./Config/db")
const TodoRouter=require("./routes/Todo.Route")


const port=process.env || 7000;

const app=express();
app.use(express.json());
app.use(cors({
    origin : "*"
}))





app.use("/products",TodoRouter)


app.listen(port,async()=>{
    try{
        await connection;
        console.log("Connected to DB Successfully")
    }
    catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log("Listening on PORT 7000")
})





