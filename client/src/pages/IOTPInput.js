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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((store) => store.auth);

  // Initialize refs at the top level of the component
  const inputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));

  const [otp, setOTP] = useState(["", "", "", "", "", ""]); // 6 digits OTP
  const [timer, setTimer] = useState(300); // Set the initial expiration time (in seconds)
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const handleOTPChange = (event, index) => {
    const value = event.target.value;
    if (value.length === 1 && /^\d$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      if (index < 5) {
        inputRefs.current[index + 1].current.focus(); // Move to the next input
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      const newOTP = [...otp];
      if (newOTP[index]) {
        newOTP[index] = ""; // Clear the current input
        setOTP(newOTP);
      } else if (index > 0) {
        inputRefs.current[index - 1].current.focus(); // Move to the previous input
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredOTP = otp.join("");
    await dispatch(verifyUser({ otp: parseInt(enteredOTP), email }));
    navigate("/login");
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
                  <Box key={index} sx={{ height: 50, width: 50 }}>
                    <TextField
                      key={index}
                      variant="outlined"
                      inputRef={inputRefs.current[index]}
                      value={digit}
                      onChange={(e) => handleOTPChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      type="text"
                      inputProps={{
                        maxLength: 1,
                        style: {
                          textAlign: "center",
                          fontSize: "1.5rem",
                          height: "50px",
                        },
                      }}
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
        <SnackbarAlert />
      </Box>
    </Container>
  );
};

export default OTPInput;
