import React ,{useState,useEffect} from "react";
import { Box, Stack, Typography, Divider, IconButton } from "@mui/material";

import SearchBar from "./SearchBar";
import { ChatList as List } from "../assets/data";
import ChartElement from "./ChartElement";
import { Users } from "phosphor-react";
import Friends from "./Friends";
import { socket } from "../socket";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversation } from "../redux/slices/conversation";

function ChatList() {
  const [openDialog, setopenDialog] = useState(false)

  const {uid} = useSelector((state)=>state.auth)

  const {conversations} = useSelector((state)=> state.conversation.direct_chat)

  

  const dispatch = useDispatch()

  useEffect(() => {
   
    socket.emit('get_direct_conversations',{user_id:uid},(err,data)=>{
      console.log(data);
      dispatch(fetchConversation({conversations:data}))
    })
  }, [])
  

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
            <Typography variant="subtitle1">All Chats</Typography>
            {conversations.map((el) => {
              return <ChartElement {...el} key={el._id} />;
            })}
          </Stack>
        </Stack>
      </Stack>
      {openDialog && <Friends open={openDialog} handleClose={handleCloseDialog}/>}
    </Box>
  );
}

export default ChatList;
