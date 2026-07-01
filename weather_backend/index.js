const express=require("express");
const env=require("dotenv").config()
const cors=require("cors");
const {router}=require("./routes/weatherRoutes")
const {cron}=require("./cron/cacheCleaner")

//https://api.openweathermap.org/data/2.5/weather?q=London&appid=bd5e378503939ddaee76f12ad7a97608&units=metric

const app=express();
app.use(cors());
app.use(express.json())
app.use("/",router);

const PORT=process.env.PORT

app.listen(PORT,()=>{
   console.log(`server is running on ${PORT}`);
})
