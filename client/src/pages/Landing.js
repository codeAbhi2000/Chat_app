import { Box, Button, Container, Stack, Typography } from "@mui/material";
import poster from "../assets/iamges/Group_Chat-pana.png";
import logo from "../assets/iamges/chatting.png";
import bg_desktop from "../assets/iamges/backgroun_desktop.jpeg";
import bg_mbl from "../assets/iamges/background_mbl.jpeg";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { PaperPlaneTilt } from "phosphor-react";
import { useSelector,useDispatch } from "react-redux";
import { loginUseer } from "../redux/slices/auth";

function Landing() {
  const {isLoggedIn} = useSelector((state)=> state.auth)
  const dispatch = useDispatch()
  const handleSubmit = async ()=>{
    try {
      console.log('Dispatching loginUser action');
      await dispatch(loginUseer({email:'vvietmedia.editor@gmail.com',password:'123'}));
      console.log('Login successful');
  
      // After the login action is completed, navigate to the dashboard
      console.log('Navigating to /dashboard');
     
    } catch (error) {
      console.error('Login failed:', error);
    }

  }
  
 if(!isLoggedIn){ return (
    <Container
      sx={{
        maxWidth: "sm",
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: { xs: `url(${bg_mbl})`, sm: `url(${bg_desktop})` },
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        p: 0,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
         
        }}
      >
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ width: "100%", height: "100vh" }}
          
        >
          <Stack  direction={{xs:'column' , sm:'row'}}>
            <Box sx={{ width:{sm: "50%" ,xs:"100%" }}}>
              <img src={poster} alt="poster" width={"100%"} />
            </Box>
            <Stack
              sx={{ width: {sm: "50%" ,xs:"100%" } }}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={{sm : 3,xs :1}}
            >
              <Stack
                direction={"row"}
                sx={{ width: "100%", height: "20vh" }}
                alignItems={"center"}
                display={{sm:'flex',xs:"none"}}
              >
                <Stack sx={{ width: "30%" }} alignItems={"center"}>
                  <img src={logo} alt="logo" width={"50%"} />
                </Stack>
                <Typography variant="h1">Ping Pluse</Typography>
              </Stack>
              <Stack alignItems={"center"} p={2}>
                <Typography variant="h3">
                  "Spark real-time connections with our seamless one-on-one
                  messaging platform."
                </Typography>
              </Stack>
              <Stack
                alignItems={"center"}
                justifyContent={'space-evenly'}
                direction={{sm:"row",xs:'column'}}
                width={"60%"}
                height={'20vh'}
              >
               {!isLoggedIn ? <Button variant="contained" endIcon={<PaperPlaneTilt />}>
                  <Link to="/login">Start Messaging</Link>
                </Button> : null}
               {!isLoggedIn ? <Button variant="contained" onClick={handleSubmit} endIcon={<PaperPlaneTilt />}>
                  Try a demo
                </Button> : null}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );}else{
    return <Navigate to={"/dashboard"} />;
   
  }
}

export default Landing;
