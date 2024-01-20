import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import {
  CaretRight,
  DotsThreeVertical,
  Plus,
  Prohibit,
  SignOut,
  Trash,
  XCircle,
} from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import {
  openSnackBar,
  toggleSidebar,
  updateSidebarType,
} from "../redux/slices/app";

import DialogAlert from "./DialogAlert";
import Axios from "axios";
import AllUsersDlg from "./AllUsersDlg";

function Conatct() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [openBlockDlg, setopenBlockDlg] = useState(false);
  const [openDeleteDlg, setopenDeleteDlg] = useState(false);
  const [Participants, setParticipants] = useState([]);
  const [OpenAllUsersDlg, setOpenAllUsersDlg] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleCloseAllusersDlg = () => {
    setOpenAllUsersDlg(false);
  };

  const handleMakeAdminClick = () => {
    // Handle make admin logic with el._id
    if (selectedId) {
      makeAdmin(selectedId);
      handleClose();
    }
  };

  const handleDismissAdminClick = () => {
    // Handle dismiss admin logic with el._id
    dismissAdmin(selectedId);
    handleClose();
  };

  const handleRemoveParticipantsClick = () => {
    // Handle remove participants logic with el._id
    removeParticipants(selectedId);
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenBlockDlg = () => {
    setopenBlockDlg(false);
  };
  const handleOpenDeleteDlg = () => {
    setopenDeleteDlg(false);
  };

  const { uid, token } = useSelector((state) => state.auth);
  const { chat_type } = useSelector((state) => state.app);
  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { current_group_conversation } = useSelector(
    (state) => state.conversation.group_chat
  );

  const makeImageUrl = (avatar) => {
    const uint8Array = new Uint8Array(avatar);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    const dataUrl = `data:image/png;base64,${base64String}`;
    return dataUrl;
  };

  const makeAdmin = (id) => {
    if (current_group_conversation?.group_admin.includes(id?.toString())) {
      alert("he is already a admin");
    }
    console.log("this is from make id ", id);
    Axios.post(
      "https://chatapp-production-23a8.up.railway.app/user/makeAdmin",
      {
        group_id: current_group_conversation?.group_id,
        user_id: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((res) => {
        dispatch(openSnackBar({ severity: "success", message: res.data.msg }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          openSnackBar({ severity: "error", message: err.response.data.msg })
        );
      });
    // console.log(admins);
    handleClose();
  };

  const dismissAdmin = (id) => {
    if (current_group_conversation?.group_admin.includes(id?.toString())) {
      console.log("From dismiss admin", id);
      Axios.post(
        "https://chatapp-production-23a8.up.railway.app/user/dismissAdmin",
        {
          group_id: current_group_conversation?.group_id,
          user_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
        .then((res) => {
          dispatch(
            openSnackBar({ severity: "success", message: res.data.msg })
          );
        })
        .catch((err) => {
          console.log(err);
          dispatch(
            openSnackBar({ severity: "error", message: err.response.data.msg })
          );
        });
    } else {
      alert("he is not a admin");
    }
    handleClose();
  };

  const removeParticipants = (id) => {
    // console.log("from reove", id);
    Axios.post(
      "https://chatapp-production-23a8.up.railway.app/user/removeGroupParticipants",
      {
        group_id: current_group_conversation?.group_id,
        user_id: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((res) => {
        dispatch(openSnackBar({ severity: "success", message: res.data.msg }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          openSnackBar({ severity: "error", message: err.response.data.msg })
        );
      });
    handleClose();
  };

  const displayInfo =
    chat_type === "individual"
      ? current_conversation
      : current_group_conversation;

  const getParticipants = () => {
    Axios.get(
      `https://chatapp-production-23a8.up.railway.app/user/getParticipantsDetails/${current_group_conversation?.group_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((res) => {
        setParticipants(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (chat_type === "group") {
      getParticipants();
    }
  }, [makeAdmin, chat_type]);

  return (
    <Box sx={{ height: "100vh", width: { sm: 320, xs: "100%" } }}>
      <Stack sx={{ height: "100%", width: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
            width: { sm: 320, xs: "100%" },
            backgroundColor:
              theme.palette.mode === "light"
                ? " #F8FAFF"
                : theme.palette.background.paper,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction={"row"}
            alignItems={"center"}
            justifyItems={"space-between"}
            spacing={3}
          >
            <IconButton
              onClick={() => {
                dispatch(toggleSidebar());
              }}
            >
              <XCircle />
            </IconButton>
            <Typography variant="subtitle2">Contact info</Typography>
          </Stack>
        </Box>
        <Stack
          spacing={3}
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
            width: { sm: 320, xs: "100%" },
          }}
          p={2}
        >
          <Stack alignItems={"center"} direction={"row"} spacing={3}>
            <Avatar
              src={makeImageUrl(displayInfo?.avatar)}
              alt="avatar"
              sx={{ height: 64, width: 64 }}
            />
            <Stack alignItems={"center"} spacing={0.5}>
              <Typography variant="article" fontWeight={600}>
                {chat_type === "individual"
                  ? displayInfo?.name
                  : displayInfo?.group_name}
              </Typography>
              {chat_type === "individual" ? (
                <Typography variant="article" fontWeight={500}>
                  +91 5678 988 778
                </Typography>
              ) : (
                <></>
              )}
            </Stack>
          </Stack>
          <Divider />
          <Stack spacing={0.5}>
            <Typography variant="article">About</Typography>
            <Typography variant="body2">
              {chat_type === "individual"
                ? displayInfo?.about
                : displayInfo?.tagline}
            </Typography>
          </Stack>
          <Divider />

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">Media, Link and Docs</Typography>
            <Button
              onClick={() => {
                dispatch(updateSidebarType("SHARED"));
              }}
              endIcon={<CaretRight />}
            >
              201
            </Button>
          </Stack>
          <Stack
            spacing={2}
            alignItems={"center"}
            direction={"row"}
            justifyContent={"center"}
          >
            {[1, 2, 3].map((el, i) => {
              return (
                <Box sx={{ height: 70, width: 70 }} key={i}>
                  <img src={""} alt={"names"} width={"100%"} />
                </Box>
              );
            })}
          </Stack>
          <Divider />
          {chat_type === "individual" ? (
            <>
              <Typography variant="subtitle2">1 group in common</Typography>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Avatar src={""} alt={"photo"} />
                <Stack spacing={0.5}>
                  <Typography variant="subtitle2">School Group</Typography>
                  <Typography variant="caption">
                    Owl,Parrot,Rabbit,You
                  </Typography>
                </Stack>
              </Stack>
            </>
          ) : (
            <Stack spacing={1}>
              <Stack
                alignItems={"center"}
                justifyContent={"space-between"}
                p={1}
                direction={"row"}
              >
                <Typography variant="subtitle2">Participants</Typography>
                {current_group_conversation?.group_admin.includes(
                  uid.toString()
                ) ? (
                  <IconButton onClick={() => setOpenAllUsersDlg(true)}>
                    <Plus />
                  </IconButton>
                ) : null}
              </Stack>
              <Stack spacing={2} p={1}>
                {Participants?.map((el, i) => {
                  return (
                    <Stack
                      direction={"row"}
                      spacing={2}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      key={el._id}
                    >
                      <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                      >
                        <Avatar
                          src={makeImageUrl(el.avatar?.data)}
                          alt={el.name}
                        />
                        {displayInfo?.group_admin.includes(
                          el._id.toString()
                        ) ? (
                          <Badge badgeContent="admin" color="primary">
                            <Typography variant="subtitle2">
                              {el._id === uid ? "You" : el.name}
                            </Typography>
                          </Badge>
                        ) : (
                          <Typography variant="subtitle2">
                            {el._id === uid ? "You" : el.name}
                          </Typography>
                        )}
                      </Stack>
                      {current_group_conversation?.group_admin.includes(
                        uid.toString()
                      ) ? (
                        <IconButton
                          id={`basic-button-${el._id}`}
                          aria-controls={`basic-menu-${el._id}`}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={(event) => handleClick(event, el._id)}
                        >
                          <DotsThreeVertical />
                        </IconButton>
                      ) : null}
                      <Menu
                        id={`basic-menu-${el._id}`}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": `basic-button-${el._id}`,
                        }}
                      >
                        <MenuItem onClick={handleDismissAdminClick}>
                          Dismiss Admin
                        </MenuItem>
                        <MenuItem onClick={handleMakeAdminClick}>
                          Make Admin
                        </MenuItem>
                        <MenuItem onClick={handleRemoveParticipantsClick}>
                          Remove Participants
                        </MenuItem>
                      </Menu>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          )}
          <Divider />
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Button
              onClick={() => {
                setopenBlockDlg(true);
              }}
              variant="outlined"
              startIcon={
                chat_type === "individual" ? <Prohibit /> : <SignOut />
              }
              fullWidth
            >
              {chat_type === "individual" ? "Block" : "Exit Group"}
            </Button>
            {chat_type === "individual" ? (
              <Button
                onClick={() => {
                  setopenDeleteDlg(true);
                }}
                variant="outlined"
                startIcon={<Trash />}
                fullWidth
              >
                Clear
              </Button>
            ) : null}
          </Stack>
        </Stack>
      </Stack>
      {openBlockDlg && (
        <DialogAlert
          open={openBlockDlg}
          handleClose={handleOpenBlockDlg}
          Msg={"Are you sure,youn want to Block this Contact"}
        />
      )}
      {openDeleteDlg && (
        <DialogAlert
          open={openDeleteDlg}
          handleClose={handleOpenDeleteDlg}
          Msg={"Are you sure,youn want to clear this chat"}
        />
      )}
      {OpenAllUsersDlg && (
        <AllUsersDlg
          open={OpenAllUsersDlg}
          handleClose={handleCloseAllusersDlg}
          usersInGrp={Participants}
          adminId={uid}
          group_id={current_group_conversation?.group_id}
        />
      )}
    </Box>
  );
}

export default Conatct;
