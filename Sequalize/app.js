const express = require ("express");

const {sequelize,User,Post}=require("./models");
var cors = require('cors');
const post = require("./models/post");
const app=express();
app.use(express.json());
app.use(cors({
    origin:"*",
    credentials:true,
}));

//post data to mySql
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


//get all users from mySql
app.get("/users",async(req,res)=>{
    try {
        const users=await User.findAll();
        return res.json(users);
    } catch (error) {
        console.log("the error is",error);
        return res.status(401).json(error);
    }
})

//get one usrs from mySql
app.get("/users/:uuid",async(req,res)=>{
    const {uuid}=req.params;
    try {
        const user=await User.findOne({
            where:{uuid},
        })
        return res.json(user);
    } catch (error) {
        console.log(`error is ${error}`);
    }
})

//get users with their posts
app.get("/usersPost/:uuid",async(req,res)=>{
    const {uuid}=req.params;
    try {
        const user=await User.findOne({
            where:{uuid},
            include:[{model:Post}]
        })
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({msg:error});
        console.log(`error is ${error}`);
    }
})

app.post("/posts",async(req,res)=>{
    const {userUuid,body}=req.body;
    
    try {
        const user=await User.findOne({where:{uuid:userUuid}});
        const post =await Post.create({body,userId:user.id});
        return res.json(post);
    } catch (error) {
        res.status(404).json({msg:error});
        console.log("the error is"+" "+ error)
        
    }
})


app.get("/posts",async (req,res)=>{
    try {
        const posts=await Post.findAll({include:[{model:User,as:"user"}]});
        res.json(posts);
    } catch (error) {
        res.status(404).json({msg:"the error is"+error});
        console.log("the error is "+error);
    }
})

//delete user from mySql
app.delete("/delete/:uuid",async (req,res)=>{
    const {uuid}=req.params;
    try {
        const deleteUser=await User.destroy({where:{uuid}});
        res.status(200).json("user deleted");
    } catch (error) {
        res.status(404).json(`the error is ${error}`);
        console.log(`the error is ${error}`);
    }
})

//update user from mySql
app.put("/update/:uuid",async(req,res)=>{
    const uuid=req.params.uuid;
    const {name,email,role}=req.body;
    try {
        const user=await User.findOne({where:{uuid}});
        user.name=name;
        user.email=email;
        user.role=role;

        await user.save();

        return res.status(200).json({msg:"user updated successfully"});
    } catch (error) {
        res.status(404).json(error);
        console.log(`the error is ${error}`);
    }
})

app.listen(8001,"127.0.0.1",async()=>{
    console.log("server up on http://localhost:8001");
    await sequelize.authenticate();
    console.log("db conected..");
})


