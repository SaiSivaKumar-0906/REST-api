const http = require("node:http");
const mongoose = require("mongoose");
const db = require("./db/db").db;
const post  = require("./methods/methods").Post
const get  = require("./methods/methods").Get
const atalsconnection = "mongodb+srv://crud_with_http:wwWN7bio7p9yNNAZ@cluster0.gutwfdo.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(atalsconnection).then(()=>{
    console.log("connected!!");
})
.catch((err)=>{
    throw err;
})

const app = http.createServer(async(req, res)=>{
    if(req.url === "/new/guy" && req.method === "POST"){
        post(req, res, db);
    }
    if(await db.findOne({url:req.url})){
        get(req, res, db);
    }
})

app.listen(80, ()=>{
    console.log(80)
})

//wwWN7bio7p9yNNAZ