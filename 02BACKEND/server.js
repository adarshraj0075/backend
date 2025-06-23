const express=require("express");
const app=express();
const courseRoutes=require("./routes/courseRoutes");
const lectureRoutes=require("./routes/lectureRoutes");
const {loggerMiddleware}=require("./middleware/loggerMiddleware");
const {limiter}=require("./middleware/rateLimiter");



app.use(express.json()); //json body parser

//app lvl middleware
app.use(loggerMiddleware);

//app.use(limiter);
//course Route
app.use("/courses",courseRoutes);

//lecture route
app.use("/lectures",lectureRoutes);

app.get("/test",(req,res)=>{
    res.json({msg:"this is test route"});
})

//unhandelled routes
app.use((req,res)=>{
    res.status(404).json({msg:"this request is not found"});
})

app.listen(3000,()=>{
    console.log("server started running on port 3000....")
})
