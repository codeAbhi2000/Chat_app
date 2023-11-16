import React ,{useContext} from "react";

import {
  Stack,
  Box,
  IconButton,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import {
  CaretLeft,
  Palette,
  Password,
  SignOut,
  UserCircle,
} from "phosphor-react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MaterialUISwitch from "./AntSwitch";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeContext from "../context/ThemeContext";
import {useNavigate} from 'react-router-dom'

function Settings() {
  const theme = useTheme();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1)
  }
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const themeContext = useContext(ThemeContext);
  const {loggedInUser} = useSelector((state)=>state.auth)
  const makeImageUrl = (avatar) => {
    const uint8Array = new Uint8Array(avatar);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    const dataUrl = `data:image/png;base64,${base64String}`;
    return dataUrl;
  };
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
        position: "relative",
      }}
      width={{ sm: 320, xs: "100%" }}
      height={"100vh"}
    >
      <Stack spacing={5} width={"100%"}>
        <Box
          sx={{
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
            width: { sm: 320, xs: "100%" },
            backgroundColor:
              theme.palette.mode === "light"
                ? " #F8FAFF"
                : theme.palette.background.paper,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction={"row"}
            alignItems={"center"}
            spacing={2}
          >
            <IconButton onClick={goBack}>
              <CaretLeft />
            </IconButton>
            <Typography variant="h6"> Settings</Typography>
          </Stack>
        </Box>

        <Stack
          alignItems={"center"}
          spacing={3}
          p={3}
          direction={"row"}
          width={"100%"}
        >
          <Box>
            <Avatar
              sx={{ width: 56, height: 56 }}
              src={makeImageUrl(loggedInUser?.avatar.data)}
              alt={loggedInUser?.name}
            />
          </Box>
          <Stack spacing={0.5} alignItems={"center"}>
            <Typography variant="article" fontWeight={600}>
              {loggedInUser?.name}
            </Typography>
            <Typography variant="body2" fontWeight={400}>
              {loggedInUser?.about}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={3} padding={2}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            component={Link}
            to="/dashboard/profile"
          >
            <UserCircle size={32} />
            <Typography variant="body2">Profile</Typography>
          </Stack>
          <Divider />
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Password size={32} />
            <Typography variant="body2">Change Password</Typography>
          </Stack>
          <Divider />
          <Stack direction={"row"} alignItems={"center"} spacing={2} sx={{display :{sm:"none",xs:"flex"}}}>
            <Palette size={32} />
            <Typography variant="body2">Set defult Theme</Typography>
            <MaterialUISwitch onChange={() => themeContext.togglePaletteMode()}/>
          </Stack>
         { !smallScreen ? <Divider /> :  <></>}
          {!smallScreen ? (
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <SignOut size={25} />
              <Typography variant="body2">Logout</Typography>
            </Stack>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default Settings;
