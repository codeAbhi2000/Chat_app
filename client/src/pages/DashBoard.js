import React, { useEffect } from 'react'
import { Stack } from '@mui/material'
import SideBar from '../components/SideBar'
import { Navigate, Outlet } from 'react-router-dom'
import Conversation from '../components/Conversation'
import Contact from '../components/Contact'
import { useDispatch, useSelector } from 'react-redux'

import SharedMsg from '../components/SharedMsg'
import { connectSocket, socket } from '../socket'
import { openSnackBar } from '../redux/slices/app'



function DashBoard() {

  const dispatch = useDispatch()
  const {sidebar } = useSelector((store)=>store.app)

  const {isLoggedIn,uid} = useSelector((store)=> store.auth)

  

  useEffect(() => {

    
    if(isLoggedIn){
      window.onload = ()=>{
        if(!window.location.hash){
          window.location = window.location + '#loaded'
          window.location.reload()
        }
      }
    }

    
    if(!socket){
      connectSocket(uid)
      socket.on("new_friend_request",(data)=>{
        dispatch(openSnackBar({severity:'success',message:data.message}))
      })
      socket.on("request_accepted",(data)=>{
        dispatch(openSnackBar({severity:'success',message:data.message}))
      })
      socket.on("request_sent",(data)=>{
        dispatch(openSnackBar({severity:'success',message:data.message}))
      })
    }

    return ()=>{
      socket.off("new_friend_request")
      socket.off("request_accepted")
      socket.off("request_sent")
    }

   
  }, [isLoggedIn,socket])
  
if(isLoggedIn){
  return (
    <Stack direction={{sm:'row',xs:'column'}}>
        <SideBar/>
        <Outlet/>
        <Conversation/>
        {sidebar.open && (()=>{
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact/>
            case "SHARED":
              return <SharedMsg/>
            default:
              break;
          }
        })() }
    </Stack>
  )}else{
    return <Navigate to={'/login'}/>
  }
}

export default DashBoard