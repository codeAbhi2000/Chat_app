import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Stack,
  Container,
  Typography,
} from "@mui/material";
import logo from "../assets/iamges/chatting.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../redux/slices/auth";
import SnackbarAlert from "../components/Snackbar";

const OTPInput = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const { email } = useSelector((store) => store.auth);
  const [otp, setOTP] = useState(["", "", "", "", "", ""]); // Initialize an array with 4 empty strings
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [timer, setTimer] = useState(300); // Set the initial expiration time (in seconds)
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const handleOTPChange = (event, index) => {
    const value = event.target.value;
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  }; 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredOTP = otp.join("");
    // You can implement OTP verification logic here
  await  dispatch(verifyUser({otp:parseInt(enteredOTP),email}))
    navigate('/login')
    console.log(`Entered OTP: ${enteredOTP}`);
  };

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const timeoutId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000); // Decrease the timer every 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [timer, isTimerRunning]);

  useEffect(() => {
    if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [timer]);

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
        height={"50vh"}
      >
        <Stack spacing={3} p={3} alignItems={"center"}>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Box sx={{ width: 50, height: 50 }}>
              <img src={logo} alt="logo" width={"100%"} />
            </Box>
            <Typography variant="h5">Verify OTP</Typography>
          </Stack>
          <Typography variant="body2">
            {isTimerRunning
              ? `OTP will expire in ${Math.floor(timer / 60)}:${
                  timer % 60
                } minutes`
              : "OTP has expired"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={5} sx={{ height: "100%" }} alignItems={"center"}>
              <Stack
                direction={"row"}
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "space-evenly" }}
              >
                {otp.map((digit, index) => (
                  <Box key={index} sx={{ height: 30, width: 30 }}>
                    <TextField
                      key={index}
                      variant="outlined"
                      inputRef={inputRefs[index]}
                      sx={{ lineHeight: 6 }}
                      value={digit}
                      onChange={(e) => handleOTPChange(e, index)}
                      type="text"
                    />
                  </Box>
                ))}
              </Stack>
              <Button
                variant="contained"
                sx={{ bgcolor: "primary.main" }}
                type="submit"
              >
                Verify OTP
              </Button>
            </Stack>
          </form>
        </Stack>
        <SnackbarAlert/>
      </Box>
    </Container>
  );
};

export default OTPInput;
