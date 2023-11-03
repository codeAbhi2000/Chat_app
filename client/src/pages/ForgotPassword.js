import React,{useState} from "react";
import {
    Box,
    Container,

    Stack,
    TextField,
  
    Button,
    Typography
  } from "@mui/material";
  import logo from "../assets/iamges/chatting.png";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/slices/auth";

function ForgotPassword() {
    const dispatch = useDispatch()
    const [inputEamil, setinputEamil] = useState({
        email:''
    })

    const handleChange = (e)=>{
        setinputEamil({
            email:e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(inputEamil);
        dispatch(forgotPassword(inputEamil))
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
        height={'50vh'}
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
                type="text"
                variant="outlined"
                label="Email"
                name="email"
                value={inputEamil.email}
                onChange={handleChange}
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

export default ForgotPassword;
