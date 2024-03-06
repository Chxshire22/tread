'use client'

import { useEffect, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";

export default function ChatUi() {

  const socket = io(`http://localhost:5000`);

  useEffect(()=>{
    socket.on('connect',()=>{
      console.log(socket.id)
    })
    return () =>{
      socket.disconnect()
    }
  },[])
  
  return ("this is a test component for the chat ui.")
}