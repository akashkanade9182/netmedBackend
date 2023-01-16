const express=require("express");
const cors = require('cors')


const connection=require("./Config/db")
const TodoRouter=require("./routes/Todo.Route")


const PORT=process.env || 7000;

const app=express();
app.use(express.json());
app.use(cors({
    origin : "*"
}))





app.use("/products",TodoRouter)


app.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
});




