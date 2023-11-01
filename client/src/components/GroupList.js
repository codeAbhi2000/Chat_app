import React,{useState} from "react";
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
import ChartElement from "./ChartElement";
import { ChatList as List } from "../assets/data";
import CreateGrpDialog from "./CreateGrpDialog";

function GroupList() {
  const theme = useTheme();
  const [openCreateDlg, setopenCreateDlg] = useState(false)
  const handleOpenBlockDlg = ()=>{
    setopenCreateDlg(false)
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
              Pinned
            </Typography>
            {List.filter((el) => el.pinned).map((el) => {
              return <ChartElement {...el} key={el.id} />;
            })}
          </Stack>
          <Stack p={2} spacing={3}>
            <Typography variant="subtitle2" color={"#676667"}>
              All Groups
            </Typography>
            {List.filter((el) => !el.pinned).map((el) => {
              return <ChartElement {...el} />;
            })}
          </Stack>
        </Stack>
      </Stack>
      {openCreateDlg && <CreateGrpDialog open={openCreateDlg} handleClose={handleOpenBlockDlg}/>}
    </Box>
  );
}

export default GroupList;
