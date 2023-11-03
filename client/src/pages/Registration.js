import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Button,
  Container,
} from "@mui/material";
import logo from "../assets/iamges/chatting.png";
import { Eye,EyeClosed } from "phosphor-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/slices/auth";

const Registration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., send data to a server or store it in state.
    if(formData.password!== formData.confirmPassword){
      alert('Both password should be same')
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    }
    await dispatch(registerUser({
        name:formData.name,
        email:formData.email,
        password:formData.password
    }))
    console.log(formData);
    navigate('/enterOTP')
  };

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
            sm: "40%",
            xs: "80%",
          },
          borderRadius: 3,
          border: "1px solid",
        }}
        height={{ sm: "90vh", xs: "75vh" }}
      >
        <Stack spacing={3} p={3}>
          <Stack alignItems={"center"} justifyContent={"center"} spacing={2}>
            <Box sx={{ width: 50, height: 50 }}>
              <img src={logo} alt="logo" width={"100%"} />
            </Box>

            <Typography variant="h5">Register</Typography>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                required
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
              />

              <TextField
                type={showPassword ? "text" : "password"}
                variant="outlined"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
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

              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                variant="outlined"
                fullWidth
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Container>
  );
};

export default Registration;
