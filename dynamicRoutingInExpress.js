const express=require("express");

const app=express();

app.get("/home",(req,res)=>{
    res.send("this is home page");
})

const fs=require("fs");

app.get("/read",(req,res)=>{
    fs.readFile("./data2.txt","utf-8",(err,data)=>{
        res.send(data);
    })
})

app.listen(3000,()=>{
    console.log("server is runnning....")
})
 
