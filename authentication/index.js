const express=require("express");
const authRoutes=require("./routes/userRoutes")
const db=require("./models");
const cors=require("cors");
const dotenv=require("dotenv");

dotenv.config();
const app=express();

app.use(cors({
    origin:"*",
    credentials:true,
}))

app.use(express.json());
app.use("/",authRoutes);

const PORT=process.env.PORT;

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(" Database connected...");

    await db.sequelize.sync(); 
    console.log(" Models synchronized...");

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();