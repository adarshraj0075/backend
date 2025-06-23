// here we keep function for business logic
const fs=require("fs");

const { getData } = require("../model/courseModel");

const getAllCourses = (req, res) => {
  // let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  // console.log(data.courses);
  // let courses = data.courses;
  let courses = getData().courses;
  res.json({ msg: "List of courses", courses });
};

const addCourse = (req, res) => {
  let newCourse = req.body;

  let data = getData().data;
  //console.log(data);
  let courses = getData().courses;
  //console.log(courses);
  let id=(courses[courses.length-1].id)+1;
  newCourse = { ...newCourse, id };
  courses.push(newCourse);
  //console.log(courses);
  data = { courses };
  console.log(data);
  fs.writeFileSync("./db.json", JSON.stringify(data));
  res.status(201).json({ mag: "course added successfully" });
};

const updateCourse = (req, res) => {
  //params is part of req object
  //console.log(req.params);
  let id = req.params.id;
  //console.log(id);
  //read the course from db.json
  let data = getData().data;
  let courses = getData().courses;
  //console.log(courses);
  //check whether id is present or not,
  let index = courses.findIndex((course) => course.id == id);
  //console.log(index);
  if (index == -1) {
    // if no, course not found
    res.json({ msg: "course not found" });
  } else {
    //course is found
    // if yes , update the course
    let updatedCourse = courses.map((ele) => {
      if (ele.id == id) {
        return { ...ele, ...req.body };
      } else {
        return ele;
      }
    });

    data.courses = updatedCourse;
    //console.log(data);
    fs.writeFileSync("./db.json", JSON.stringify(data));

    res.json({ msg: "course updated" });
  }
};

const deleteCourse = (req, res) => {
  let id = req.params.id;
  //console.log(id);
  let data = getData().data;
  //console.log(data);
  let courses = data.courses;
  //console.log(courses);

  let beforeData = courses.slice(0, id - 1);
  //console.log(beforeData);
  let afterData = courses.slice(id);
  //console.log(afterData);
  let newData = beforeData.concat(afterData);
  //console.log(newData);
  data.courses = newData;
  //console.log(data);
  fs.writeFileSync("./db.json", JSON.stringify(data));

  res.json("course deleted");
};

const getDataById = (req, res) => {
  let id = req.params.id;
  //  res.json({msg:"course detail"});

  let data = getData().data;
  let courses = data.courses;

  let index = courses.findIndex((course) => course.id == id);
  //console.log(index);
  if (index == -1) {
    res.status(404).json({ msg: "Course not found" });
  } else {
    //course found
    courses.forEach((ele) => {
      if (ele.id == id) {
        res.status(200).json({ msg: "course found", course: ele });
      }
    });
  }
};

const getDataByQuery = (req, res) => {
  // console.log(req.query.title);
  const data = getData().data;
  //console.log(data);
  let courses = data.courses;
  //console.log(courses);
  courses.forEach((ele) => {
    if (ele.title.includes(req.query.title)) {
      res.status(200).json({ msg: "course", course: ele });
      console.log("data found", ele);
    } else {
      res.status(404).json({ msg: "data not found" });
      console.log("data not found");
    }
  });
};

module.exports = {
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getDataById,
  getDataByQuery,
};
