//App lvl middle ware 
//it will log my all methods and its routes

const fs=require("fs");

const loggerMiddleware=(req,res,next)=>{
    let timestamp = new Date().toISOString();
    let reqData = `[${timestamp}] ${req.method} ${req.url} |ip: ${req.ip}\n`;

    fs.appendFileSync("./logs.txt",reqData);
    next();
}

module.exports={loggerMiddleware}; 