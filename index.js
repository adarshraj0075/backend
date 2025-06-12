//esm import method
//import {fun} from "./helper.js"

//cjs import method
const {fun,sum}=require("./helper");

// console.log("hello world");

// //when i type node <file_name> then js will run 
// //in the system or server this is because of 
// // node js becuse node js provide enviornment 
// // to run js on the system or server

// //cjs vs esm

// // 1.cjs
// // => no async import
// // => no tree shaking

// // 2.esm
// // => async import is supported
// // => we can do tree shaking

// fun();
// console.log(sum(2,3));

// // types of modules in js
// // there are theree type of module in js
// // 1.coustom modules
// // 2.inbuilt modules
// // 3.external mdules

// //Inbuilt modules
// // to use inbuilt module import them

// const os=require("os");
// console.log(os.cpus().length);

// console.log(os.arch());

// // important inbuilt coustom module File System(fs)

// // this is async task

// console.log("Reading started");

// const fs=require("fs");
// fs.readFile("./data.tx","utf8",(err,data)=>{
//     if(err) throw err
//     else{
//         console.log(data);
//     }
// })

// console.log("Reading ended")

// fs.writeFile("./data1.txt","This data is written by inbuilt module fs",(err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log("data written");
// })

// try {
//     fs.writeFileSync("./data2.txt","this file is written in sync using fs");
// } catch (error) {
//     console.log(error);
// }

// // apppend file and unlink file try on my own

