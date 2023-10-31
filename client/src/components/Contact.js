import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, {useState} from "react";
import { useTheme } from "@mui/material";
import { CaretRight, Prohibit, Trash, XCircle } from "phosphor-react";
import { useDispatch } from "react-redux";
import { toggleSidebar, updateSidebarType } from "../redux/slices/app";
import { faker } from "@faker-js/faker";
import DialogAlert from "./DialogAlert";

function Conatct() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [openBlockDlg, setopenBlockDlg] = useState(false)
  const [openDeleteDlg, setopenDeleteDlg] = useState(false)

  const handleOpenBlockDlg = ()=>{
    setopenBlockDlg(false)
  }
  const handleOpenDeleteDlg = ()=>{
    setopenDeleteDlg(false)
  }


  return (
    <Box sx={{ height: "100vh", width: { sm: 320, xs: "100%" } }}>
      <Stack sx={{ height: "100%", width: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
            width: "100%",
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
          alignItems={"center"}
          spacing={3}
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
        >
          <Stack alignItems={"center"} direction={"row"} spacing={2}>
            <Avatar
              src={faker.image.avatar()}
              alt="avatar"
              sx={{ height: 64, width: 64 }}
            />
            <Stack alignItems={"center"} spacing={0.5}>
              <Typography variant="article" fontWeight={600}>
                Abhishek
              </Typography>
              <Typography variant="article" fontWeight={500}>
                +91 5678 988 778
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack spacing={0.5}>
            <Typography variant="article">About</Typography>
            <Typography variant="body2">Hi i am using PingPluse</Typography>
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
          <Stack spacing={2} alignItems={"center"} direction={"row"}>
            {[1, 2, 3].map((el, i) => {
              return (
                <Box sx={{ height: 70, width: 70 }} key={i}>
                  <img
                    src={faker.image.food()}
                    alt={faker.name.fullName()}
                    width={"100%"}
                  />
                </Box>
              );
            })}
          </Stack>
          <Divider />
          <Typography variant="subtitle2">1 group in common</Typography>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">School Group</Typography>
              <Typography variant="caption">Owl,Parrot,Rabbit,You</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Button onClick={()=>{
                setopenBlockDlg(true)
            }} variant="outlined" startIcon={<Prohibit />} fullWidth>
              Block
            </Button>
            <Button onClick={()=>{
              setopenDeleteDlg(true)
            }} variant="outlined" startIcon={<Trash />} fullWidth>
              Clear
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlockDlg && <DialogAlert open={openBlockDlg} handleClose={handleOpenBlockDlg} Msg={"Are you sure,youn want to Block this Contact"}/>}
      {openDeleteDlg && <DialogAlert open={openDeleteDlg} handleClose={handleOpenDeleteDlg} Msg={"Are you sure,youn want to clear this chat"}/>}
    </Box>
  );
}

export default Conatct;
