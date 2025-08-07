const dotenv=require("dotenv")
const jwt = require("jsonwebtoken"); 

dotenv.config();

const JWT_PASSWORD=process.env.JWT_PASSWORD;

const authMiddleware=(req,res,next)=>{
    const token=req.headers["authorization"];
    console.log("token recived",token);

    try {
        const decode=jwt.verify(token,JWT_PASSWORD);
        console.log("decoded",decode);
        req.user=decode;
        console.log(req.user);
        next();
    } catch (error) {
        console.log("jwt error:",error.message)
        res.status(401).json({
            msg:"unauthorize acess",
        })
    }
}

module.exports={
    authMiddleware,
}