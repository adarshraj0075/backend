const express=require("express");
const router=express.Router();
const{signUp,logIn}=require("../controllers/authController");
const{getPhotos,createPhotos}=require("../controllers/userController");
const{authMiddleware}=require("../middlewares/authMiddleware");
const {forgetPassword,resetPassword}=require("../controllers/authController");
const rateLimit=require("../middlewares/rateLimiterMiddleware")
router.post("/signup",signUp);
router.post("/login",logIn);
router.post("/forget-password",forgetPassword);
router.post("/reset-password",resetPassword);

//protected routes 
router.use(authMiddleware);

router.get("/photos",rateLimit,getPhotos);
router.post("/photos",rateLimit,createPhotos)


module.exports=router;