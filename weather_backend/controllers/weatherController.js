require("dotenv").config();
const { json } = require("express");
const {redis}=require("../config/redis");

const API_KEY=process.env.OPEN_WEATHER_API_KEY;
//console.log(API_KEY);

const weather=async (req,res)=>{
    console.log("getting inside")
    const {city}=req.params;
    const cashed=await redis.get(city);
    if(cashed){
        const realData=JSON.parse(cashed)
        return res.json({source:"cashed data",realData})
    }
    try {
        const resu=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data=await resu.json();
        console.log(data);
        await redis.set(city,JSON.stringify(data),"EX",60*5)
        res.status(200).json({source:"data from api",data})
    } catch (error) {
        console.log("this is the error msg: ",error);
        res.status(500).json({msg:error});
    }
}

module.exports={weather};