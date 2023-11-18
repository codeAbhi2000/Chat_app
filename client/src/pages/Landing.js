import { Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <Box>
        This is landing page
        <Button variant='outlined'><Link to="/login">Login</Link></Button>
    </Box>
  )
}

export default Landing