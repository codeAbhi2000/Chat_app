import { faker } from "@faker-js/faker";
import {
  Stack,
  Box,
  IconButton,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { CaretLeft, Palette, Password, SignOut } from "phosphor-react";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MaterialUISwitch from "./AntSwitch";

function Settings() {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
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
            width:{ sm: 320, xs: "100%" },
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
            <IconButton>
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
              src={faker.image.avatar()}
              alt={faker.name.fullName()}
            />
          </Box>
          <Stack spacing={0.5} alignItems={"center"}>
            <Typography variant="article" fontWeight={600}>
              {faker.name.fullName()}
            </Typography>
            <Typography variant="body2" fontWeight={400}>
              {faker.random.words()}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={3} padding={2}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Password size={32} />
            <Typography variant="body2">Change Password</Typography>
          </Stack>
          <Divider />
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Palette size={32} />
            <Typography variant="body2">Set defult Theme</Typography>
            <MaterialUISwitch />
          </Stack>
          <Divider />
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
