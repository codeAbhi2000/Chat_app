import React, { useState } from "react";
import {
  Box,
  Stack,
  IconButton,
  Typography,
  useTheme,
  Tab,
  Tabs,
  Grid,
} from "@mui/material";
import { ArrowCircleLeft } from "phosphor-react";
import { useDispatch } from "react-redux";
import { toggleSidebar, updateSidebarType } from "../redux/slices/app";
import { faker } from "@faker-js/faker";
import { SHARED_Docs, SHARED_Links } from "../assets/data";
import { Docmsg, LinkMsg } from "./MessageTypes";

function SharedMsg() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
            sx={{ height: "100%", p: 2, width: "100%" }}
            direction={"row"}
            alignItems={"center"}
            spacing={2}
          >
            <IconButton
              onClick={() => {
                dispatch(updateSidebarType("CONTACT"));
              }}
            >
              <ArrowCircleLeft />
            </IconButton>
            <Typography variant="subtitle2">Shared Message</Typography>
          </Stack>
        </Box>
        <Box
          sx={{ width: { sm: 320, xs: "100%" }, bgcolor: "background.paper" }}
        >
          <Tabs
            sx={{ px: 2, pt: 2 }}
            value={value}
            onChange={handleChange}
            centered
          >
            <Tab label="Media" />
            <Tab label="Link" />
            <Tab label="Docs" />
          </Tabs>
        </Box>
        <Stack
          alignItems={"center"}
          spacing={3}
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
            width:{ sm: 320, xs: "100%" },
          }}
          p={value === 0 ? 2 : 1}
          
        >
          {(() => {
            switch (value) {
              case 0:
                return (
                  <Grid container spacing={2}>
                    {[0, 1, 2, 3, 4, 5].map((e, i) => {
                      return (
                        <Grid item  sm={4} key={i}>
                          <img
                            src={faker.image.avatar()}
                            alt={faker.name.fullName()}
                            width={"100%"}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                );
              case 1:
                return SHARED_Links.map((el) => (
                  <Stack alignItems={"center"} p={1} width={"80%"}>
                    <LinkMsg el={el} />
                  </Stack>
                ));

              case 2:
                return SHARED_Docs.map((el) => <Docmsg el={el} />);
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
}

export default SharedMsg;
