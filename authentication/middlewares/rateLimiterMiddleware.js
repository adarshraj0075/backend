const rateLimiterMap=new Map();
const windowSize=1*60*1000;
const maxAttempt=3;

const rateLimit=(req,res,next)=>{
    const {email} = req.body;
    const currentTime=Date.now();

    if(!rateLimiterMap.has(email)){
        rateLimiterMap.set(email,[]);
    }

    const timeStamp=rateLimiterMap.get(email);
    
    const filteredTimeStamp=timeStamp.filter(ts=>currentTime-ts<windowSize);

    if(filteredTimeStamp.length>=maxAttempt){
       return res.status(429).json({msg:"Too many request"});
    }

    filteredTimeStamp.push(currentTime);

    rateLimiterMap.set(email,filteredTimeStamp);
    next();

}

module.exports=rateLimit;