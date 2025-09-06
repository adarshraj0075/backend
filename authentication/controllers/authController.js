const argon2 = require("argon2");
const db=require("../models");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv")
dotenv.config();
const nodemailer=require("nodemailer");

const jwt_password=process.env.JWT_PASSWORD

const signUp=async (req,res)=>{
    let {email,username,password}=req.body;

    const existingUser=await db.User.findOne({where:{username}});
    if(existingUser){
        return res.json({msg:"user already exists"});
    }

    const hash=await argon2.hash(password);

    const newUser=await db.User.create({
        email,
        username:username,
        password:hash,
    })

    res.json({msg:"user created"}); 

}

const logIn = async (req,res)=>{
    const {username,password,email}=req.body;
    
    try {
        const dbUser=await db.User.findOne({where:{username}});

        //cheking that user exists or not

        if(!dbUser){
            return res.status(401).json({mas:"invalid username or password"});
        }

        //compare password
        const isCorrectUser = await argon2.verify(dbUser.password,password);
             
        if(isCorrectUser){
           const token=jwt.sign(
            {
                id:dbUser.id,
                username:dbUser.username,
            },
            jwt_password,
            {
                expiresIn:"7d",
            }
           )
           return res.json({token});
        }else{
            return res.status(401).json({msg:"invalid password"});
        }

    } catch (error) {
        console.log("error message:",error.message);
        return res.json({msg:"something went wrong"});
    }


}

//setting transporter for sending mail
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "brannon91@ethereal.email",
    pass: "UgPPmdf7AK13h5Ff46",
  },
});

//hear i was temporarily storing the otp inside the obj
//let otpMap={};

const forgetPassword = async (req,res)=>{
    const {email} = req.body;
    const otp=Math.floor(Math.random()*1000000);
    const expiresAt=new Date(Date.now()+5*60*1000) //5 minutes from now

   // otpMap[email]=otp;
    //how to send this otp to different mail;
   try{ 
        const user=db.User.findOne({where:{email}});
        if(!user){
            return res.status(404).json({msg:"User not found"})
        }

        await db.OtpRequest.create({
            userId:user.id,
            email,
            otp,
            expiresAt,
        })

        await transporter.sendMail({
            from:'"Admin" <admin@domain.com>',
            to:email,
            subject:"Reset Password OTP",
            text:`${otp}`,
            html:`<h1>Reset Password</h1> ${otp}`
        })
        res.status(200).json({msg:"otp send"});
    }catch(err){
        console.log("error message: ", err);
        res.status(500).json({msg:"something went wrong"});
    }
}

const resetPassword=async (req,res)=>{
    const{otp,newPassword,email}=req.body;
    try {
        const user=await db.User.findOne({where:{email}});
        
        if(!user){
            return res.status(404).json({msg:"user does not found"});
        }

        //getting latest opt from database
        const otpDetail=await db.OtpRequest.findOne({
            where:{
                email,
                used:false,
                expiresAt:{[Op.gt]:new Date()},//checking otp is not expired
            },
            order:[["createdAt","DESC"]],
        })

        if(!otpDetail) return res.status(404).json({msg:"no otp data found"});
        if(otp!=otpDetail.otp)return res.status(404).json({msg:"wrong or expired otp"});

        //marking otp as used
        await db.OtpRequest.update(
            {used:true},
            {where:{id:otpDetail.id}}
        );
        

        //this is was otp stored in map temporeraly now i am storing it in db

        // if(otpMap[email]!=otp){
        //     return res.status(400).json({msg:"Invalid OTP"});
        // }

        const hashedPassword=await argon2.hash(newPassword);

        const updatePassword=await db.User.update(
            {password:hashedPassword},
            {where:{email}},
        );

        console.log(updatePassword)

        

        return res.status(200).json({msg:"password updated sucessfully"});
    }catch (error) {
        console.log("error while updating the password ", error);
        return res.status(500).json({msg:"internal server error"})
    }
}
    
module.exports={
    signUp,
    logIn,
    forgetPassword,
    resetPassword
}