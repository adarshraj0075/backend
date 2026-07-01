const express=require("express");
const {Server}=require("socket.io")
const {createServer}=require("http")
const cors=require("cors")


const app=express();
const server=createServer(app);
const io=new Server(server,{
    cors:{
        origin:"*"
    }
});

app.get("/",(req,res)=>{
    res.json("server is running");
})

//io means entire circuit and socket means only single client
//every socket has its own individual id

const rooms={};

io.on("connection",(socket)=>{
    console.log("user connected", `id : ${socket.id} ${new Date().toLocaleString()}`);

    socket.emit("welcome","hello from the server");
    socket.broadcast.emit("welcome",`${socket.id} welcome to client side`)

    //creating room

    socket.on("create-room",({name})=>{
        const roomId=String(Math.floor(1000+Math.random()*9000));
        rooms[roomId]={id:roomId,name,members:[]};
        socket.join(roomId)
        rooms[roomId].members.push(socket.id);
        socket.emit("room-created",rooms[roomId]);
    })

    //join room 
    
    socket.on("join-room",(roomId)=>{
        roomId=String(roomId)
        if(!roomId) return;
        if(!rooms[roomId]) return;
        socket.join(roomId);
        rooms[roomId].members.push(socket.id);
        io.to(roomId).emit("room-updated",rooms[roomId]);
    })

    //chat msg inside room

    socket.on("msg",({roomId,text})=>{
        io.to(roomId).emit("server-msg",{
            text,
            sender:socket.id
        })
    })
    
    socket.on("disconnect",()=>{
        console.log("user disconnected",` id : ${socket.id} ${new Date().toLocaleString()}`);
    })
})

server.listen(3000,()=>{
    console.log("server running on port 3000");
})