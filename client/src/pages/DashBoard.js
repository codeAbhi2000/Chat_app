import React from 'react'
import { Stack } from '@mui/material'
import SideBar from '../components/SideBar'
import { Navigate, Outlet } from 'react-router-dom'
import Conversation from '../components/Conversation'
import Contact from '../components/Contact'
import { useSelector } from 'react-redux'

import SharedMsg from '../components/SharedMsg'

const isAuthenticated = true;

function DashBoard() {
  const {sidebar } = useSelector((store)=>store.app)

  if(!isAuthenticated){
    return <Navigate to={'/login'}/>
  }

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
  )
}

export default DashBoard