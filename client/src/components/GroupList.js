import React,{useState,useEffect} from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  IconButton,
  Link,
  useTheme,
} from "@mui/material";
import SearchBar from "./SearchBar";
import { Plus } from "phosphor-react";
import CreateGrpDialog from "./CreateGrpDialog";
import GroupChatElement from "./GroupChatElement";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket";
import { FetchGrooupList } from "../redux/slices/conversation";

function GroupList() {
  const theme = useTheme();

  const {uid} = useSelector((state) => state.auth)
  const {group_list} = useSelector((state)=> state.conversation.group_chat) 
  const dispatch = useDispatch()
  const [openCreateDlg, setopenCreateDlg] = useState(false)
  const handleOpenBlockDlg = ()=>{
    setopenCreateDlg(false)
  }

  useEffect(() => {
    socket.emit("get_group_list",{user_id:uid},(err,data)=>{
      // console.log(data);
      dispatch(FetchGrooupList(data))
    })
  }, [])
  
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
        <Stack p={3} spacing={2}>
          <Box>
            <Typography variant="h4">Groups</Typography>
          </Box>
          <Stack spacing={3}>
            <Box>
              <SearchBar />
            </Box>
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          spacing={2}
          p={2}
        >
          <Typography variant="subtitle2" component={Link}>
            Create new Group
          </Typography>
          <IconButton onClick={()=>{
            setopenCreateDlg(true)
          }}>
            <Plus style={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Stack>
        <Divider />
        <Stack sx={{ height: "100%", flexGrow: 1, overflowY: "scroll" }}>
          
          <Stack p={2} spacing={3}>
            <Typography variant="subtitle2" color={"#676667"}>
              All Groups
            </Typography>
            {group_list?.map((el) => {
              return <GroupChatElement key={el.group_id} {...el} />;
            })}
          </Stack>
        </Stack>
      </Stack>
      {openCreateDlg && <CreateGrpDialog open={openCreateDlg} handleClose={handleOpenBlockDlg}/>}
    </Box>
  );
}

export default GroupList;
