import React, { useState } from "react";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  FormHelperText,
  Button,
  Typography
} from "@mui/material";
import logo from "../assets/iamges/chatting.png";
import { Eye, EyeClosed } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { loginUseer } from "../redux/slices/auth";
import Snackbar from "../components/Snackbar";

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {isLoggedIn} = useSelector((store)=> store.auth)
  const [showPassword, setshowPassword] = useState(false);

  const [loginData, setloginData] = useState({
      email:'',
      password:''
  })

  const handleChange = (e)=>{
    setloginData({...loginData , [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      console.log('Dispatching loginUser action');
      await dispatch(loginUseer(loginData));
      console.log('Login successful');
  
      // After the login action is completed, navigate to the dashboard
      console.log('Navigating to /dashboard');
     
    } catch (error) {
      console.error('Login failed:', error);
    }

  }

  if(!isLoggedIn){
  return (
    <Container
      sx={{
        maxWidth: "sm",
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: {
            sm: "35%",
            xs: "80%",
            borderRadius: 10,
            border: "1px solid",
          },
        }}
        height={{sm:"70vh",xs:'50vh'}}
      >
        <Stack spacing={3} p={3}>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Box sx={{ width: 50, height: 50 }}>
              <img src={logo} alt="logo" width={"100%"} />
            </Box>
            <Typography variant="h5">Login</Typography>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                type="text"
                variant="outlined"
                label="Email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
              />
              <TextField
                type={showPassword ? "text" : "password"}
                variant="outlined"
                label="Password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        onClick={() => {
                          setshowPassword((prev) => !prev);
                        }}
                      >
                        {showPassword ? <Eye /> : <EyeClosed />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText>
                <Link to={"/forgotPassword"}>Forgot Password?</Link>
              </FormHelperText>
              <Button
                variant="contained"
                sx={{ bgcolor: "primary.main" }}
                type="submit"
              >
                Submit
              </Button>
              <FormHelperText >Don't have accout? <Link to='/register' color='secondary'>Create new Accout</Link></FormHelperText>
            </Stack>
          </form>
        </Stack>
        <Snackbar/>
      </Box>
    </Container>
  );}else{
    return navigate('/dashboard');
  }
}

export default Login;
