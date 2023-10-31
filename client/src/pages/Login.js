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
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setshowPassword] = useState(false);
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
          <form>
            <Stack spacing={2}>
              <TextField
                type="text"
                variant="outlined"
                label="Email"
                name="name"
              />
              <TextField
                type={showPassword ? "text" : "password"}
                variant="outlined"
                label="Password"
                name="password"
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
              <FormHelperText >Don't have accout? <Link to='/signup' color='secondary'>Create new Accout</Link></FormHelperText>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Container>
  );
}

export default Login;
