import React from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,

  useTheme,
  alpha,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "../redux/slices/app";

function GroupChatElement({
  group_id,
  group_name,
  last_message,
  last_message_time,
  avatar,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const {room_id} = useSelector((state)=> state.app)

  const uint8Array = new Uint8Array(avatar);

  // Convert Uint8Array to a Base64 string
  const base64String = btoa(String.fromCharCode.apply(null, uint8Array));

  // Create a Data URL for an image (assuming it's a PNG image)
  const dataUrl = `data:image/png;base64,${base64String}`;

  let isSelected = room_id === group_id ? true : false;
  return (
    <Box
      onClick={() => {
        dispatch(selectChat({ room_id: group_id, chat_type: "group" }));
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
          <Avatar src={dataUrl} />
          <Stack spacing={1}>
            <Typography variant="subtitle2">{group_name}</Typography>
            <Typography variant="caption">{last_message}</Typography>
          </Stack>
        </Stack>
        <Stack alignItems={"center"} spacing={2}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {last_message_time?.slice(11, 16)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default GroupChatElement;
