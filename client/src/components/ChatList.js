import React ,{useState} from "react";
import { Box, Stack, Typography, Divider, IconButton } from "@mui/material";

import SearchBar from "./SearchBar";
import { ChatList as List } from "../assets/data";
import ChartElement from "./ChartElement";
import { Users } from "phosphor-react";
import Friends from "./Friends";

function ChatList() {
  const [openDialog, setopenDialog] = useState(false)

  const handleCloseDialog = ()=>{
    setopenDialog(false)
  } 
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
          <Stack alignItems={'center'} justifyContent={'space-between'} direction={'row'} spacing={2}>
            <Typography variant="h4">Chats</Typography>
            <IconButton onClick={()=>{
              setopenDialog(true)
            }}>
              <Users/>
            </IconButton>
          </Stack>
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
      {openDialog && <Friends open={openDialog} handleClose={handleCloseDialog}/>}
    </Box>
  );
}

export default ChatList;
