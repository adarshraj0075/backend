// // const EventEmitter=require("node:events");

// // const emitter=new EventEmitter();

// // emitter.on("walk-forward",()=>{
// //     console.log("player is walking")
// // })

// // emitter.emit("walk-forward");

// // //.emmit will be used to define the event 
// // //.on will be used to listen the event 

// const express=require("express");
// const http=require("http");
// const {Server}=require("socket.io");
// const cors=require('cors')

// const app=express();
// app.use(cors());
// const httpServer=http.createServer(app);


// //const io=new Server(httpServer);

// const io = new Server(httpServer, {
//   cors: {
//     origin: "*", // ✅ allow all origins (you can restrict later)
//     methods: ["GET", "POST"]
//   }
// });

// io.on("connection",(socket)=>{
//     console.log("user connected");
//     socket.on("disconnect",()=>{
//         console.log("user disconnected");
//     })
// })

// httpServer.listen(3000,()=>{
//     console.log("server is running on port 3000");
// })


// -------------------------------------------------------><--------------------------------------------------

//use of event driven artitecture is in microservises or loosely coppled servises

const EventEmitter=require("node:events");

const button=new EventEmitter();


//this is the listeners
button.on("click", ()=>{
  console.log("button clicked");
})

//this is emmitter it will emit the click event
button.emit("click");