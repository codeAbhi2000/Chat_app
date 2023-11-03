import React, { useContext } from "react";
import {
  Box,
  Stack,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import logo from "../assets/iamges/chatting.png";
import MaterialUISwitch from "./AntSwitch";
import { faker } from "@faker-js/faker";
import ThemeContext from "../context/ThemeContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { Nav_Buttons, Profile_Menu } from "../assets/data";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/auth";

function SideBar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const themeContext = useContext(ThemeContext);

  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: { sm: "column", xs: "row" },
        justifyContent: { sm: "space-between", xs: "center" },
      }}
      boxShadow="0px 0px 2px rgb(0,0,0,0,25)"
      height={{ sm: "100vh", xs: "3rem" }}
      width={{ sm: 90, xs: "100%" }}
      p={3}
      alignItems={"center"}
    >
      <Stack alignItems={"center"} spacing={2} width={{ xs: "100%", sm: 0 }}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            height: 64,
            width: 64,
            borderRadius: 1.5,
            display: { sm: "flex", xs: "none" },
          }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img src={logo} alt="logo" width={45} />
        </Box>
        <Stack
          sx={{ width: "max-content" }}
          direction={{ sm: "column", xs: "row" }}
          alignItems={"center"}
          spacing={{ xs: 5, sm: 2 }}
        >
          {Nav_Buttons.map((el) => {
            return el.index == value ? (
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
              >
                <Stack alignItems={"center"} justifyContent={"center"}>
                  <IconButton
                    onClick={() => {
                      handleChange(el.index);
                    }}
                    sx={{ width: "max-content", color: "#ffffff" }}
                  >
                    <Link to={el.link}>{el.icon}</Link>
                  </IconButton>
                </Stack>
              </Box>
            ) : (
              <Stack alignItems={"center"} justifyContent={"center"}>
                <IconButton
                  onClick={() => {
                    handleChange(el.index);
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#080707"
                        : theme.palette.text.primary,
                  }}
                >
                  <Link to={el.link}>{el.icon}</Link>
                </IconButton>
              </Stack>
            );
          })}
        </Stack>
        <Divider />
      </Stack>

      <Stack
        alignItems={"center"}
        spacing={2}
        display={smallScreen ? "flex" : "none"}
      >
        <MaterialUISwitch onChange={() => themeContext.togglePaletteMode()} />
        <Avatar
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          src={faker.image.avatar()}
        />
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Stack spacing={1} px={0.5}>
            {Profile_Menu.map((el, idx) => {
              return (
                <MenuItem
                  onClick={() => {
                    if (idx === 1) {
                      dispatch(logoutUser());
                    }
                  }}
                >
                  {" "}
                  {el.title === "Profile" ? (
                    <Stack
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      direction={"row"}
                      sx={{ width: 100 }}
                      component={Link}
                      to={"/dashboard/profile"}
                    >
                      <span>{el.title}</span>
                      {el.icon}
                    </Stack>
                  ) : (
                    <Stack
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      direction={"row"}
                      sx={{ width: 100 }}
                    >
                      <span>{el.title}</span>
                      {el.icon}
                    </Stack>
                  )}
                </MenuItem>
              );
            })}
          </Stack>
        </Menu>
      </Stack>
    </Box>
  );
}

export default SideBar;
