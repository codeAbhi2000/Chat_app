import React from "react";
import { Box, Stack, Typography, Divider } from "@mui/material";

import SearchBar from "./SearchBar";
import { ChatList as List } from "../assets/data";
import ChartElement from "./ChartElement";

function ChatList() {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
        position: "relative",
      }}
      width={{ sm: 320, xs: "100%" }}
    >
      <Stack sx={{ maxHeight: "100vh" }}>
        <Stack p={2} spacing={2}>
          <Box>
            <Typography variant="h4">Chats</Typography>
          </Box>
          <Stack spacing={3}>
            <Box>
              <SearchBar />
            </Box>
            <Divider />
          </Stack>
        </Stack>

        <Stack sx={{ height: "100%", flexGrow: 1, overflowY: "scroll" }}>
          <Stack p={2} spacing={3}>
            <Typography variant="subtitle1">Pinned</Typography>
            {List.filter((el) => el.pinned).map((el) => {
              return <ChartElement {...el} key={el.id}/>;
            })}
          </Stack>
          <Stack p={2} spacing={3}>
            <Typography variant="subtitle1">All Chats</Typography>
            {List.filter((el) => !el.pinned).map((el) => {
              return <ChartElement {...el} />;
            })}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ChatList;
