const jwt =require("jsonwebtoken");
const dotenv=require("dotenv")
dotenv.config();
const { Photo } = require('../models'); // adjust path based on your folder structure


const JWT_PASSWORD=process.env.JWT_PASSWORD

const getPhotos = async (req, res) => {
  try {
    const userId = req.user.id; 
    const photos = await Photo.findAll({
      where: { userId: userId },
      attributes:["url"]
    });
    console.log("Your photos are: ",photos);

    res.json(photos||"photos");
  } catch (error) {
    console.error("the error is:",error);
    res.status(401).json({ msg: "Unauthorized user" });
  }
};


const createPhotos = async(req,res)=>{
  const {url}=req.body;
    try {
        await Photo.create({
            userId:req.user.id,
            url,
        })
        res.json({msg:"photos saved"});
    } catch (error) {
      console.error("error msg:",error.message);
        res.json({msg:"there is error in creating the photos"})
    }
}

module.exports={
    getPhotos,
    createPhotos
}
