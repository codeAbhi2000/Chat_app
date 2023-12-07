import React , {useState,useEffect} from "react";
import { Box, Dialog, DialogContent, Stack,Avatar,IconButton,Typography, Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/slices/app";
import { PlusCircle,XCircle } from "phosphor-react";
import { socket } from "../socket";

function AllUsersDlg({open,handleClose,usersInGrp,adminId,group_id}) {
  const [SelectedMembers, setSelectedMembers] = useState([]);
  const { allUsers } = useSelector((state) => state.app);

  const dispatch = useDispatch()



  const existingParticipants = usersInGrp.map(el => el._id)

  const handleMemberRemove = (index) => {
    const updatedMembers = SelectedMembers;
    updatedMembers.splice(index, 1);
    setSelectedMembers(
      updatedMembers
    );
  };

  useEffect(() => {
    if(allUsers.length === 0){
        dispatch(getAllUsers())
    }
    
  }, [allUsers.length])
  

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box width={320}>
            <Stack spacing={2} p={2}>
                <Typography variant="subtitle2">Select & Add Participants</Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                sx={{ overflowX: "scroll" }}
                p={2}
              >
                {SelectedMembers?.map((id, i) => {
                  const user = allUsers?.find((el) => el._id === id);
                  return (
                    <Stack
                      direction={"row"}
                      spacing={2}
                      key={user._id}
                      alignItems={"center"}
                    >
                      <Stack
                        spacing={1}
                        direction={"row"}
                        alignItems={"center"}
                      >
                        <Avatar src={user?.avatar} alt={user.name} />
                        <Typography variant="caption">{user.name}</Typography>
                      </Stack>
                      <IconButton onClick={() => handleMemberRemove(i)}>
                        <XCircle size={15} />
                      </IconButton>
                    </Stack>
                  );
                })}
              </Stack>
              <Stack spacing={4} p={2}>
                {allUsers?.filter((el)=> !existingParticipants.includes(el._id)).map((el, i) => {
                  return (
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      spacing={1}
                      key={el._id}
                    >
                      <Stack
                        alignItems={"center"}
                        spacing={2}
                        direction={"row"}
                      >
                        <Avatar src={el.avatar} alt={el.name} />
                        <Typography variant="body1">{el.name}</Typography>
                      </Stack>
                      <IconButton
                        onClick={() => {
                          SelectedMembers.push(el._id);
                        }}
                      >
                        <PlusCircle />
                      </IconButton>
                    </Stack>
                  );
                })}
              </Stack>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'end'}>
                    <Button variant="outlined" onClick={()=>{
                        socket.emit("add_participants",{adminId, user_ids:SelectedMembers, group_id })
                    }}>Add Participants</Button>
              </Stack>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AllUsersDlg;
