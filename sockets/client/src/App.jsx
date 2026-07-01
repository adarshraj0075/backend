import { useEffect, useState } from "react";
import { Container, TextField, Typography } from "@mui/material";
import { socket } from "./sockets/socket";
import "./App.css";

function App() {
    const [roomName,setRoomName]=useState("");
    const [joinRoomId,setJoinRoomId]=useState("");
    const [room,setRoom]=useState(null);
    const [msg,setMsg]=useState("");
    const [messages,setMessages]=useState([]);

    useEffect(()=>{
        socket.on("room-created",(roomData)=>{
            setRoom(roomData);
            setMessages([]);
        })

        socket.on("room-updated",(roomData)=>{
            setRoom(roomData);
        })

        socket.on("server-msg",(msg)=>{
            setMessages((prev)=>[...prev,msg])
        })

        return ()=>{
            socket.off("room-created");
            socket.off("room-updated");
            socket.off("server-msg");
        }
    },[])
    
    const handleCreateRoom=()=>{
        if(!roomName.trim()) return;
        socket.emit("create-room",{name:roomName})
        setRoomName("")
    }

    const handleJoinRoom=()=>{
        if(!joinRoomId.trim()) return
        socket.emit("join-room",joinRoomId);
        setJoinRoomId("")
    }

    const handleSend=(e)=>{
        e.preventDefault();
        if(!room) return;
        if(!msg.trim()) return 
        socket.emit("msg",{roomId:room.id,text:msg})
        setMsg("");
    }

    return(
        <>
        <div className="app">
            <h1>Socket.Io Rooms Chat</h1>

            {/* scoket io Rooms section */}

            {!room &&(
                <div className="roomBox">
                    <h2>create rooom</h2>

                    <input 
                        type="text"
                        placeholder="Enter Room Name"
                        value={roomName}
                        onChange={(e)=>setRoomName(e.target.value)}
                    />
                    <button onClick={handleCreateRoom}>create</button>

                    <h2>join room</h2>
                    
                    <input
                        type="text"
                        placeholder="Enter Room Id...."
                        value={joinRoomId}
                        onChange={(e)=>setJoinRoomId(e.target.value)}
                    />

                    <button onClick={handleJoinRoom}>Join</button>
                </div>
            )
            }

            {/* chat section */}

            {room && (
                <div className="chatSection">
                    <h2>Room: {room.name}</h2>
                    <p className="roomId">Room ID: {room.id}</p>

                    <div className="chatBox">
                        {messages.map((m,i)=>(
                            <div 
                              key={i}
                              className={
                                m.sender===socket.id ? "message myMsg" : "message otherMsg"
                              }
                            >
                                {m.text}
                            </div>
                        ))}

                    </div>

                    <form className="msgForm" onSubmit={handleSend}>
                        <input 
                          type="text"
                          placeholder="Type message...."
                          value={msg}
                          onChange={(e)=>setMsg(e.target.value)}
                        />

                        <button type="submit">Send</button>
                    </form>
                </div>
            )}

        </div>
        </>
    )
}

export default App;
