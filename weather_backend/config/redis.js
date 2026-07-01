require("dotenv").config();
const Redis=require("ioredis");

const redis=new Redis(process.env.REDIS_URL);

redis.on("connect",()=>{
    console.log("redis connected",process.env.REDIS_URL)
})

redis.on("error",(err)=>{
    console.log(`redis error ${err}`);
})

module.exports={redis};