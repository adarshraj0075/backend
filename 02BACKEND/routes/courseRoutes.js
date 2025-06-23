const express = require("express");
const router=express.Router();
const {getAllCourses,addCourse,updateCourse,deleteCourse,getDataById,getDataByQuery}=require("../controller/courseController")
const {dataCheck}=require("../middleware/dataCheck")
const {limiter}=require("../middleware/rateLimiter")



//get route that reads all the courses
router.get("/all-courses",limiter,getAllCourses);


//post request

// router.post("/add-course",(req,res)=>{
//     // i will be getting course details in the body
//     // push the  course details into db.json

//     //to do that first read the data
//    let db=JSON.parse(fs.readFileSync("./db.json","utf-8"));
//    //console.log(db.courses);
//    let courses=db.courses;
//    //console.log(courses);
//     let id=courses.length;
//     console.log(id);

//    //courses is a copy of array which is present in db.json
//    //now we have to add new course to the courses which
//    //is coming from req.body from postman
//    ///courses.push(req.body);
//    //console.log(courses);

//    //now update the db.json with new course using fs.write
//    //and we have to stringify it as well becuse of json
//    ///fs.writeFileSync("./db.json",JSON.stringify(courses));
//    res.json("course added....");
// })


// post request for adding a course
router.post("/add-course",dataCheck,addCourse);

//update, how willi update? I need a reference point
//that is id
//updation and deletion should hrouteren through id

//:id--> This is called as params

//put request
router.put("/update-course/:id", updateCourse);

//delete request
router.delete("/delete-course/:id", deleteCourse);

//dynamic Routing using id

//dynamic get request
router.get("/course/:id", getDataById);

//dynamic get routing using query parameter
router.get("/course", getDataByQuery);

module.exports = router;
