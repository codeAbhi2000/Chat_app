import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import React from "react";
import StyledBadge from "./StyledBadge";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import { Chat } from "phosphor-react";

const StyledChatBox = styled(Box)({
  "&:hover": {
    cursor: "pointer",
  },
});

export function UserComponent({ name, avatar, _id, online }) {
  const { uid } = useSelector((store) => store.auth);
  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: "background.paper",
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={avatar} alt={name} />
            </StyledBadge>
          ) : (
            <Avatar src={avatar} alt={name} />
          )}
          <Typography variant="subtitle2">{name}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Button
            onClick={() => {
              socket.emit("friend_request", { to: _id, from: uid }, () => {
                alert("Request sent");
              });
            }}
          >
            Send Request
          </Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
}

export function FriendRequestComponent({ name, avatar, _id, online, id }) {
  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: "background.paper",
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={avatar} alt={name} />
            </StyledBadge>
          ) : (
            <Avatar src={avatar} alt={name} />
          )}
          <Typography variant="subtitle2">{name}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Button
            onClick={() => {
              socket.emit("accept_request", { request_id: id }, () => {
                alert("Request sent");
              });
            }}
          >
            Accept Request
          </Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
}

export function FriendComponent({ name, avatar, _id, status }) {
    const { uid } = useSelector((store) => store.auth);
  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: "background.paper",
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {status ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={avatar} alt={name} />
            </StyledBadge>
          ) : (
            <Avatar src={avatar} alt={name} />
          )}
          <Typography variant="subtitle2">{name}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton onClick={()=>{
                //TODO => have to create login start conversation
                socket.emit("start_conversation",{to: _id ,from : uid})
          }}>
            <Chat />
          </IconButton>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
}
