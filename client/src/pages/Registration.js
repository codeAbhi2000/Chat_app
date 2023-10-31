import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Button,
  Input,
  Container,
} from "@mui/material";
import logo from "../assets/iamges/chatting.png";
import { UploadSimple,Eye,EyeClosed } from "phosphor-react";

const Registration = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePic: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., send data to a server or store it in state.
    console.log(formData);
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
        height={{ sm: "95vh", xs: "75vh" }}
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
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
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

              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                variant="outlined"
                fullWidth
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <Stack direction="row" spacing={2}>
                <Input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="profilePicInput"
                  type="file"
                  onChange={handleProfilePicChange}
                />
                <label htmlFor="profilePicInput">
                  <Button
                    endIcon={<UploadSimple />}
                    variant="contained"
                    component="span"
                    color="primary"
                    sx={{
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    }}
                  >
                    Upload Profile Picture
                  </Button>
                </label>
                <Typography variant="body1" sx={{ alignSelf: "center" }}>
                  {formData.profilePic
                    ? formData.profilePic.name
                    : "No file selected"}
                </Typography>
              </Stack>

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
