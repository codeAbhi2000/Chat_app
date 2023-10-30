import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import StyledBadge from "./StyledBadge";
import { faker } from "@faker-js/faker";
import SearchBar from "./SearchBar";
import styled from "@emotion/styled";
import { LinkSimple, PaperPlaneTilt, Smiley } from "phosphor-react";
import Messages from "./Messages";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import ActionButtons from "./ActionButtons";
// import { useDispatch } from "react-redux";
// import { ToggleSidebar } from "../redux/slices/app";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: 1, // Add a fixed border
      borderColor: "transparent", // Set a transparent border color by default
    },
    "&:hover fieldset": {
      borderColor: "transparent", // Remove the border on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // Remove the border on focus
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "inherit", // Use the default label color on focus
    },
  },
}));

const ChatInput = ({ setopenPicker }) => {
  const [openActionBtn, setopenActionBtn] = useState(false);
  return (
    <StyledTextField
      fullWidth
      placeholder="Write a message..."
      InputProps={{
        startAdornment: (
          <Stack sx={{ width: "max-conten" }}>
            <ActionButtons openActionBtn={openActionBtn} />
            <InputAdornment>
              <IconButton
                onClick={() => {
                  setopenActionBtn((prev) => !prev);
                }}
              >
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment>
            <IconButton
              onClick={() => {
                setopenPicker((prev) => !prev);
              }}
            >
              <Smiley />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

function Conversation() {
  const theme = useTheme();
  // const dispatch = useDispatch();
  const [openPicker, setopenPicker] = useState(false);
  return (
    <Box
      sx={{
        height: "100vh",
        width: { sm: "calc(100vw-740px)", xs: "100%" },
        backgroundColor:
          theme.palette.mode === "light" ? "#F0F4FA" : "background.default",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
      }}
    >
      <Stack
        // onClick={() => {
        //   dispatch( ToggleSidebar());
        // }}
        height={"100%"}
        maxHeight={"100vh"}
        width={"auto"}
      >
        <Box
          width={"100%"}
          sx={{
            backgroundColor: "background.paper",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
          alignItems={"center"}
          p={2}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ width: "100%", height: "100%" }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Box>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar src={faker.image.avatar()} />
                </StyledBadge>
              </Box>
              <Stack spacing={0.2}>
                <Typography variant="subtitle2">Abhishek</Typography>
                <Typography variant="caption">online</Typography>
              </Stack>
            </Stack>

            <Box width="40%">
              <SearchBar />
            </Box>
          </Stack>
        </Box>
        <Box flexGrow={1} width={"100%"} overflow={"scroll"} height={"100%"}>
          <Messages />
        </Box>
        <Box
          p={1}
          width={"100%"}
          sx={{
            backgroundColor: "background.paper",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={3}
            height={"100%"}
          >
            <Stack width={"100%"}>
              <Box
                display={openPicker ? "inline" : "none"}
                sx={{ zIndex: 10, position: "fixed", bottom: 81, right: 80 }}
              >
                <Picker data={data} theme={theme.palette.mode} />
              </Box>
              <ChatInput setopenPicker={setopenPicker} />
            </Stack>
            <Box
              sx={{
                height: 48,
                width: 48,
                backgroundColor: "primary.main",
                borderRadius: 1.5,
              }}
            >
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ height: "100%", width: "100%" }}
              >
                <IconButton>
                  <PaperPlaneTilt color="white" />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Conversation;
