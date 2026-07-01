const cron =require("node-cron");
const redis=require("../config/redis");

cron.schedule("0 * * * *",async()=>{
    try {
        await redis.flusAll();
        console.log("all keys deleted hourly ")
    } catch (error) {
        console.error("error cleaning the kyes :",error);
    }
})

module.exports={cron};