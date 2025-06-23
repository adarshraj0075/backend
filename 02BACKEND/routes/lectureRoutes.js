const express=require("express");
let router=express.Router();

router.get("/all-lecture",(req,res)=>{
    res.status(200).json({msg:"List of all lecture"});
})

//201--> new resourse was added sussesfully
router.post("/add-lecture",(req,res)=>{
    res.status(201).json({msg:"lecture added"});
})

router.put("/update-lecture/:id",(req,res)=>{
    res.status(201).json({msg:"lecture updated"});
})

router.delete("/delete-lecture/:id",(req,res)=>{
    res.status(201).json({msg:"lecture delete"});
})
module.exports=router;