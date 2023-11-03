import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import logo from "../assets/iamges/chatting.png";
import { Eye, EyeClosed } from "phosphor-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassowrd } from "../redux/slices/auth";


function ResetPassword() {
    const {uid,token} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const [showPassword, setshowPassword] = useState({
    open1: false,
    open2: false,
  });

  const [passwords, setpaswords] = useState({
        password:'',
        cpassword:''
  })

  const handleChange = (e)=>{
    setpaswords({...passwords, [e.target.name]:e.target.value})
  }


  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(passwords.password !== passwords.cpassword){
        alert('Both password should be same')
        setpaswords({
            password:'',
            cpassword:''
      })
        return
    }
    await dispatch(resetPassowrd({uid,token,password:passwords.password}))

    navigate('/login')
  }

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
        height={"63vh"}
      >
        <Stack spacing={3} p={3}>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Box sx={{ width: 50, height: 50 }}>
              <img src={logo} alt="logo" width={"100%"} />
            </Box>
            <Typography variant="h5">Login</Typography>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                type={showPassword.open1 ? "text" : "password"}
                variant="outlined"
                label="Password"
                name="password"
                value={passwords.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        onClick={() => {
                          setshowPassword({
                            ...showPassword,
                            open1: !showPassword.open1,
                          });
                        }}
                      >
                        {showPassword.open1 ? <Eye /> : <EyeClosed />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type={showPassword.open2 ? "text" : "password"}
                variant="outlined"
                label="Confirm Password"
                name="cpassword"
                value={passwords.cpassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        onClick={() => {
                          setshowPassword({
                            ...showPassword,
                            open2: !showPassword.open2,
                          });
                        }}
                      >
                        {showPassword.open2 ? <Eye /> : <EyeClosed />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                sx={{ bgcolor: "primary.main" }}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Container>
  );
}

export default ResetPassword;
