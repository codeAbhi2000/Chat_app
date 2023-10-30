import React from 'react'
import { Stack } from '@mui/material'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import Conversation from '../components/Conversation'
import Conatct from '../components/Conatct'
import { useSelector } from 'react-redux'

function DashBoard() {
  const {sidebar } = useSelector((store)=>store.app)
  return (
    <Stack direction={{sm:'row',xs:'column'}}>
        <SideBar/>
        <Outlet/>
        <Conversation/>
        {sidebar.open && <Conatct/> }
    </Stack>
  )
}

export default DashBoard