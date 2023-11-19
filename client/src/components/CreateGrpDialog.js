import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Slide,
  Stack,
  IconButton,
  Typography,
  Box,
  TextField,
  Avatar,
  Tooltip,
  DialogActions,
  DialogTitle,
  DialogContentText,
  FormHelperText,
} from "@mui/material";
import { PlusCircle, XCircle } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { getAllUsers, openSnackBar } from "../redux/slices/app";
import { socket } from "../socket";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateGrpDialog({ open, handleClose }) {
  const { allUsers } = useSelector((state) => state.app);

  console.log(allUsers);

  const dispatch = useDispatch();

  const [Dopen, setDOpen] = useState(false);

  const handleClickOpen = () => {
    setDOpen(true);
  };

  const MyhandleClose = () => {
    setDOpen(false);
  };

  const { uid, token } = useSelector((state) => state.auth);
  const [groupData, setGroupData] = useState({
    grpName: "",
    tagline: "",
    icon: null,
    admin: [uid],
    members: [uid], // Add a state for members
  });

  const handleInputChange = (e) => {
    setGroupData({
      ...groupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setGroupData({
      ...groupData,
      icon: e.target.files[0],
    });
  };

  const handleMemberRemove = (index) => {
    const updatedMembers = [...groupData.members];
    updatedMembers.splice(index, 1);
    setGroupData({
      ...groupData,
      members: updatedMembers,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your logic to send groupData to the backend

    const formData = new FormData();
    formData.append("grpName", groupData.grpName);
    formData.append("tagline", groupData.tagline);
    formData.append("icon", groupData.icon);
    formData.append("admin", groupData.admin);
    formData.append("members", groupData.members);

    // Append each member to formData
    // groupData.members.forEach((member, index) => {
    //   formData.append(`members[${index}]`, member);
    // });

    console.log("Sending data to backend:", formData);

    try {
      const response = await Axios.post(
        "http://13.126.35.197:5000/user/createGroup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      console.log(response);
      socket.emit("create_group_room", {
        groupId: response.data.grpId,
        user_id: uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (allUsers.length === 0) dispatch(getAllUsers());
  }, []);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ backgroundColor: "background.default" }}>
          <Box sx={{ width: 420 }}>
            <Stack spacing={3} p={3} width={"100%"}>
              <Stack
                alignItems={"center"}
                justifyContent={"space-between"}
                spacing={2}
                direction={"row"}
              >
                <Typography variant="h6">Create New Group</Typography>
                <IconButton onClick={() => handleClose()}>
                  <XCircle />
                </IconButton>
              </Stack>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2} width={"100%"}>
                  <TextField
                    label="Group Name"
                    name="grpName"
                    required
                    value={groupData.grpName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Tag Line"
                    name="tagline"
                    required
                    value={groupData.tagline}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Upload image"
                    type="file"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        accept: "image/jpeg, image/png",
                      },
                    }}
                    name="icon"
                    required
                    onChange={handleFileChange}
                  />
                  <FormHelperText>
                    the image size should be within 20kb
                  </FormHelperText>
                  <Stack spacing={1}>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      spacing={1}
                      alignItems={"center"}
                    >
                      <Typography variant="body1">Members</Typography>
                      <Tooltip title="Add Member" placement="left">
                        <IconButton onClick={handleClickOpen}>
                          <PlusCircle />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={2}
                      sx={{ overflowX: "scroll" }}
                      p={2}
                    >
                      {groupData?.members.slice(1).map((id, i) => {
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
                              <Avatar src={user.avatar} alt={user.name} />
                              <Typography variant="caption">
                                {user.name}
                              </Typography>
                            </Stack>
                            <IconButton
                              onClick={() => handleMemberRemove(i + 1)}
                            >
                              <XCircle size={15} />
                            </IconButton>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"end"}>
                    <Button variant="contained" type="submit" size="xlarge">
                      Create
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={Dopen} onClose={MyhandleClose}>
        <DialogContent sx={{ backgroundColor: "background.default" }}>
          <Box sx={{ width: 320 }}>
            <Stack spacing={4} p={2}>
              {allUsers?.map((el, i) => {
                return (
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    spacing={1}
                    key={el._id}
                  >
                    <Stack alignItems={"center"} spacing={2} direction={"row"}>
                      <Avatar src={el.avatar} alt={el.name} />
                      <Typography variant="body1">{el.name}</Typography>
                    </Stack>
                    <IconButton
                      onClick={() => {
                        if (groupData?.members.length < 6) {
                          groupData?.members.push(el._id);
                        }
                      }}
                    >
                      <PlusCircle />
                    </IconButton>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={MyhandleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateGrpDialog;
