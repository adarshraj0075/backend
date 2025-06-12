// //External Modules
// let isEven=require("is-even");

// console.log(isEven(0));
// console.log(isEven(1));
// console.log(isEven("3"));
// console.log(isEven("a"));

//step 1-->Install the express 
//step 2-->import the express

const { error } = require("console");
const express = require("express");

//executing express
const app=express();

//port is a number(3000,3100,8080) and also a communication channel throug which express app will get the req

app.get("/test",(req,res)=>{
    // req-->sent by the client
    //res--> sent by the app
    //how to give a response
    res.send("This is test route");
})

//this is called as route route has two part one is method(like get) another is endpoint(like /test)
// and this entire app is running on port 3000

// this res.send is sending responce to the client

//whats happening hear when client will open local host 3000 with end point /test the browser will do 
//a get request by default then it will check in the server that the get method and endpoint /test is
//matching or not if it is matching then it will send the responce to client



app.get("/home",(req,res)=>{
    res.send("This is home route");
})

app.get("/contact",(req,res)=>{
    res.send("this contact page")
})

app.get("/about",(req,res)=>{
    res.send("this is about us page");
})

const fs=require("fs");

app.get("/read",(req,res)=>{
    const data=fs.readFile("./data.txt","utf-8",(err,data)=>{
        if(err){
           console.error(err);
        }else{
            console.log(data);
            res.send(data)
        }
    })
})

app.listen(3000,()=>{
    console.log("server started running on server 3000....");
})