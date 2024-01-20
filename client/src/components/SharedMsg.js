import React, { useState, useEffect } from "react";
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
import {
  ArrowCircleLeft,
  DownloadSimple,
  File,
  LinkBreak,
} from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { updateSidebarType } from "../redux/slices/app";

import Axios from "axios";

function SharedMsg() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [PrivateSharedMsg, setPrivateSharedMsg] = useState({
    links: null,
    docs: null,
    imgs: null,
  });
  const [GroupSharedMsg, setGroupSharedMsg] = useState({
    links: null,
    docs: null,
    imgs: null,
  });

  const { room_id, chat_type } = useSelector((state) => state.app);
  const { token } = useSelector((state) => state.auth);

  const getPrivateSharedMessages = () => {
    Axios.get(
      `https://chatapp-production-23a8.up.railway.app/user/getSharedMsg/${room_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((res) => {
        // console.log(res);
        setPrivateSharedMsg({
          links: res.data.data
            .map((el) =>
              el.text !== null ? { link: el.text, date: el.created_at } : null
            )
            .filter(Boolean),
          imgs: res.data.data
            .map((el) =>
              el.imagefile !== null
                ? { imgUrl: el.imagefile, date: el.created_at }
                : null
            )
            .filter(Boolean),
          docs: res.data.data
            .map((el) =>
              el.docfile !== null
                ? { docUrl: el.docfile, date: el.created_at }
                : null
            )
            .filter(Boolean),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGroupSharedMessages = () => {
    Axios.get(
      `https://chatapp-production-23a8.up.railway.app/user/getGrpSharedMsg/${room_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((res) => {
        // console.log(res);
        setGroupSharedMsg({
          links: res.data.data
            .map((el) =>
              el.text !== null ? { link: el.text, date: el.created_at } : null
            )
            .filter(Boolean),
          imgs: res.data.data
            .map((el) =>
              el.imagefile !== null
                ? { imgUrl: el.imagefile, date: el.created_at }
                : null
            )
            .filter(Boolean),
          docs: res.data.data
            .map((el) =>
              el.docfile !== null
                ? { docUrl: el.docfile, date: el.created_at }
                : null
            )
            .filter(Boolean),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(PrivateSharedMsg,GroupSharedMsg);

  const handleDownload = (docUrl) => {
    const documentUrl = docUrl;
    console.log(documentUrl);
    const anchor = document.createElement("a");

    anchor.href = documentUrl;

    anchor.download = `${docUrl.split("/").pop()}`;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (chat_type === "individual") {
      getPrivateSharedMessages();
    } else {
      getGroupSharedMessages();
    }
  }, [chat_type]);

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
            width: { sm: 320, xs: "100%" },
          }}
          p={value === 0 ? 2 : 1}
        >
          {(() => {
            switch (value) {
              case 0:
                return (
                  <Grid container spacing={2}>
                    {(chat_type === "individual"
                      ? PrivateSharedMsg.imgs
                      : GroupSharedMsg.imgs
                    )?.map((e, i) => {
                      return (
                        <Grid item sm={4} key={i}>
                          <img src={e?.imgUrl} alt={"img"} width={"100%"} />
                        </Grid>
                      );
                    })}
                  </Grid>
                );
              case 1:
                return (
                  chat_type === "individual"
                    ? PrivateSharedMsg.links
                    : GroupSharedMsg.links
                )?.map((el) => (
                  <Box
                    sx={{
                      width: "100%",
                      borderRadius: 1,
                      backgroundColor: "background.paper",
                    }}
                  >
                    <Stack
                      alignItems={"center"}
                      direction={"row"}
                      spacing={2}
                      p={1}
                    >
                      <Stack alignItems={"center"} justifyContent={"center"}>
                        <LinkBreak />
                      </Stack>
                      <Stack alignItems={"center"} justifyContent={"center"}>
                        <Typography variant="caption">{el?.link}</Typography>
                      </Stack>
                      <Stack alignItems={"center"} justifyContent={"center"}>
                        <Typography variant="caption">
                          {el?.date.slice(0, 10)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                ));

              case 2:
                return (
                  chat_type === "individual"
                    ? PrivateSharedMsg.docs
                    : GroupSharedMsg.docs
                )?.map((el) => {
                  return (
                    <Box
                      sx={{
                        width: "100%",
                        borderRadius: 1,
                        backgroundColor: "background.paper",
                      }}
                    >
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                        p={1}
                      >
                        <Stack alignItems={"center"} justifyContent={"center"}>
                          <File />
                        </Stack>
                        <Stack
                          alignItems={"center"}
                          spacing={1}
                          direction={"row"}
                        >
                          <Typography variant="caption">
                            {el?.docUrl?.split("/").pop()}
                          </Typography>
                          <IconButton
                            onClick={() => handleDownload(el?.docUrl)}
                          >
                            <DownloadSimple />
                          </IconButton>
                        </Stack>
                        <Stack alignItems={"center"} justifyContent={"center"}>
                          <Typography variant="caption">
                            {el?.date.slice(0, 10)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  );
                });

              default:
                <></>;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
}

export default SharedMsg;
