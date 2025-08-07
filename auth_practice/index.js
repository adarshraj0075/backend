const express=require("express");
const cors=require("cors");
const db=require("./models");
const dotenv=require("dotenv");

dotenv.config();
const app=express();

app.use(cors({
    origin:"*",
    credentials:true,
}))

app.use(express.json());

const PORT=process.env.PORT;

const startServer=async () => {
    try {
        await db.Sequelize.authenticate();
        console.log("db conected....");

        await db.sequelize.sync();
        console.log("models synced...");

        app.listen(PORT,()=>{
            console.log(`server running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log("failed to start the server:", error.message)
    }
}
