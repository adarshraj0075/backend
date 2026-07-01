const express=require("express");
const {weather}=require("../controllers/weatherController")


const router=express.Router();

router.get("/:city",weather);

module.exports={router};