import React from 'react'
import { Stack } from '@mui/material'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import Conversation from '../components/Conversation'
import Conatct from '../components/Conatct'

function DashBoard() {
  return (
    <Stack direction={{sm:'row',xs:'column'}}>
        <SideBar/>
        <Outlet/>
        <Conversation/>
        {/* <Conatct/> */}
    </Stack>
  )
}

export default DashBoard