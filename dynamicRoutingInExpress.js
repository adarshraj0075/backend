//Request responce cycle

const express=require("express");
const app=express();

app.use(express.json());

// create a route

app.get("/test",(req,res)=>{
    res.send("This is test route");
})

app.get("/test1",(req,res)=>{
    res.send({msg:"this is test1 route"});
})

app.get("/test2",(req,res)=>{
    res.json({msg:"this is test2 route and response method is res.json"});
})

//Types of route
//1.get
//2.post
//3.put
//4.patch
//5.delete

app.post("/add-data",(req,res)=>{
    console.log(req.body);
    res.send("Data added....");
})

//req.body will be undifined because there are many 
//ways to send the body(like form-data,binary,raw etc)
//and also if there is no key of a object i am trying 
//to search then also it return undefined
//***--> To solve this use app.use(express.json()) impt

//except get none of the route request will work on
//browser becuse by default brwoser can only make get
// request so we have to use external api test app like
//postman

app.put("/update-data",(req,res)=>{
    res.send("Data updated...");
})

app.delete("/delete-data",(req,res)=>{
    res.send("data deleted....");
})

//there are two ways to send a response
//1.res.send() use it when you want to show some update on ui

//2.res.json() if we are creating backend and frontend
// seperately then send arr the res in json only because
// in frontend the fetch req only accept json

app.listen(3000,()=>{
    console.log("server is runnning....")
})
 
