// hear we need to keep logic for only db interactions
const fs=require("fs");
const getData = () =>{
      let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
     // console.log(data.courses);
      let courses = data.courses;

      return {data,courses};
}

module.exports={getData};