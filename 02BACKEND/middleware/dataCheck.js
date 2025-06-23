//This is not a simple function it is called as
//middleware
//middleware is a fn that sits btwn req and res
//it process the req and if needed it can give 
// the res or it can send to the next process

//Types of middleware
//1.InBuilt middleware
//2.custom middleware
//3.external middlware

//Application of middleware
//1.app level middle ware (applying at the top of the app)
//2.routes level middleware(applying for all the routes in the server)
//3.request level(applying at one request like get post put)

const dataCheck=(req,res,next)=>{
  //data is coming from req.body so i destructured it 
  const {title,instructor,duration}=req.body;
  
  if(!title||!instructor||!duration){
    //if any of this is false that means req.body is not of course
    //i should reject the req hear itself
    res.status(404).json({msg:"worong request"})
  }else{

    // 🌐 What is next()?

    // In Express, next() is a function provided to middleware.
    // It tells Express:

    // “I'm done with this middleware — go to the next one.”

    // So when a POST request hits /add-course, Express will:

    // Run dataCheck(req, res, next)
    // If dataCheck calls next(), it moves on to run addCourse(req, res)
    // If dataCheck does not call next(), nothing after it runs.

    next()
  }
}

//dataCheck is request lvl middleware because it only applicable for
//one route which is /add-course no other route is affected

module.exports={dataCheck};