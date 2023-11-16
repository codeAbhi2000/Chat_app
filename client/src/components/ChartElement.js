import React from "react";
import { Box,Stack,Typography,Avatar,Badge, useTheme, alpha } from "@mui/material"; 
import StyledBadge from "./StyledBadge";
import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "../redux/slices/app";

function ChartElement({ chat_id, name, avatar, last_message_time, unread, status,last_msg,_id}) {
  const makeImageUrl = (avatar) => {
    const uint8Array = new Uint8Array(avatar);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    const dataUrl = `data:image/png;base64,${base64String}`;
    return dataUrl;
  };

  const { room_id} = useSelector((state)=>state.app)
  const dispatch = useDispatch()

  const theme = useTheme()

  let isSelected = chat_id === room_id ? true : false
  return (
    <Box
      onClick = {()=>{
        dispatch(selectChat({room_id:chat_id , chat_type:"individual"}))
      }}
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: isSelected
        ? theme.palette.mode === "light"
          ? alpha(theme.palette.primary.main, 0.5)
          : theme.palette.primary.main
        : theme.palette.mode === "light"
        ? "#fff"
        : theme.palette.background.paper,
      }}
      p={1}
      alignItems={"center"}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {status ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={makeImageUrl(avatar)} />
            </StyledBadge>
          ) : (
            <Avatar src={makeImageUrl(avatar)} />
          )}
          <Stack spacing={1}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{last_msg}</Typography>
          </Stack>
        </Stack>
        <Stack alignItems={"center"} spacing={2}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {last_message_time?.slice(11,16)}
          </Typography>
          {unread !== '0' ? <Badge color="primary" badgeContent={unread}></Badge> : <></>}
        </Stack>
      </Stack>
    </Box>
  );
}

export default ChartElement;
