const express = require ("express");

const {sequelize,User}=require("./models");
var cors = require('cors');
const app=express();
app.use(express.json());
app.use(cors);

app.post("/user",async(req,res)=>{
    const{name,email,role}=req.body;
    try {
        console.log("server")
        const user=await User.create({name,email,role});
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
})

app.listen(8000,"127.0.0.1",async()=>{
    console.log("server up on http://localhost:5000");
    await sequelize.sync()
    console.log("db synced");
})


