"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function TestComp() {
  const [buttonContent, setButtonContent] = useState("send event");
  const [isConnected, setIsConnected] = useState(false);

  const socket = io("http://localhost:5000");

  useEffect(() => {
    const handleConnect = async () => {
      setIsConnected(true); 
    };
    socket.on("connect", handleConnect);
    return () => {
      socket.disconnect();
      socket.off("connect", handleConnect);
    };
  }, []);

  useEffect(() => {
    console.log(isConnected);
  }, [isConnected]);

  socket.on("connection", data=>{
    console.log(data)
  })

  socket.on("responseEvent", (data) => {
    setButtonContent(`received response from server ${data}`);
    console.log(data)
  });

  const sendSocketEvent = () => {
    console.log("test2");
    socket.emit("test2", "Hello, Server!"); //name of event, then data to send to server
  };

  return (
    <button className="btn btn-primary" onClick={()=>sendSocketEvent()}>
      {buttonContent}
    </button>
  );
}
