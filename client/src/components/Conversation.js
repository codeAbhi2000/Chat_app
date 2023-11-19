import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import StyledBadge from "./StyledBadge";
import { faker } from "@faker-js/faker";
import SearchBar from "./SearchBar";
import { PaperPlaneTilt } from "phosphor-react";
import Messages from "./Messages";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/slices/app";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import {
  FetchCurrentMessages,
  FetchGroupMessage,
  SetCurrentConversation,
  SetCurrentGroupChat,
} from "../redux/slices/conversation";
import { socket } from "../socket";
import SnackbarAlert from "./Snackbar";

function Conversation() {
  const theme = useTheme();
  const { sidebar, room_id, chat_type } = useSelector((store) => store.app);
  const { uid } = useSelector((state) => state.auth);
  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const { group_list, current_group_conversation } = useSelector(
    (state) => state.conversation.group_chat
  );
  const dispatch = useDispatch();
  const [openPicker, setopenPicker] = useState(false);

  const makeImageUrl = (avatar) => {
    const uint8Array = new Uint8Array(avatar);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    const dataUrl = `data:image/png;base64,${base64String}`;
    return dataUrl;
  };

  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  function handleEmojiClick(emoji) {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
          emoji +
          value.substring(selectionEnd)
      );

      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  }

  function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(
      urlRegex,
      (url) => `<a href="${url}" target="_blank">${url}</a>`
    );
  }

  function containsUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
  }

  useEffect(() => {
    if (chat_type === "individual") {
      let current = conversations?.find((el) => el.chat_id === room_id);

      console.log("this is current chat", current);

      socket?.emit(
        "get_messages",
        { user_id: current._id, chat_id: current.chat_id },
        (err, data) => {
          if (err) {
            console.log(err);
          }
          console.log("this is from server", data);
          dispatch(FetchCurrentMessages(data));
        }
      );

      dispatch(SetCurrentConversation(current));
    } else {
      const current_grpchat = group_list.find((el) => el.group_id === room_id);

      console.log(current_grpchat);

      dispatch(SetCurrentGroupChat(current_grpchat));
      socket?.emit(
        "get_group_messages",
        { group_id: current_grpchat?.group_id },
        (err, data) => {
          if (err) {
            console.log(err);
          }
          console.log("group messages from sever", data);
          dispatch(FetchGroupMessage(data));
        }
      );
    }
  }, [room_id]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: {
          sm: sidebar.open ? "calc(100vw-740px)" : "calc(100vw-420px)",
          xs: "100%",
        },
        backgroundColor:
          theme.palette.mode === "light" ? "#F0F4FA" : "background.default",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
      }}
    >
      <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
        <Box
          width={"100%"}
          sx={{
            backgroundColor: "background.paper",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
          alignItems={"center"}
          p={2}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ width: "100%", height: "100%" }}
          >
            <Stack
              onClick={() => {
                dispatch(toggleSidebar());
              }}
              direction={"row"}
              alignItems={"center"}
              spacing={2}
            >
              {chat_type === "individual" ? (
                <Box>
                  {current_conversation?.status ? (
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar src={makeImageUrl(current_conversation?.avatar?.data)} />
                    </StyledBadge>
                  ) : (
                    <Avatar src={makeImageUrl(current_conversation?.avatar)} />
                  )}
                </Box>
              ) : (
                <Box>
                  <Avatar src={makeImageUrl(current_group_conversation?.avatar)} />
                </Box>
              )}
              <Stack spacing={0.2}>
                {chat_type === "individual" ? (
                  <Typography variant="subtitle2">
                    {current_conversation?.name}
                  </Typography>
                ) : (
                  <Typography variant="subtitle2">
                    {current_group_conversation?.group_name}
                  </Typography>
                )}
                {chat_type === "individual" ? (
                  current_conversation?.status ? (
                    <Typography variant="caption">online</Typography>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </Stack>
            </Stack>

            <Box width="40%">
              <SearchBar />
            </Box>
          </Stack>
        </Box>
        <Box flexGrow={1} width={"100%"} overflow={"scroll"} height={"100%"}>
          <Messages menu={true} />
        </Box>
        <Box
          p={1}
          width={"100%"}
          sx={{
            backgroundColor: "background.paper",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={3}
            height={"100%"}
          >
            <Stack width={"100%"}>
              <Box
                display={openPicker ? "inline" : "none"}
                sx={{
                  zIndex: 10,
                  position: "fixed",
                  bottom: { xs: "10%", sm: "15%" },
                  right: "6%",
                }}
              >
                <Picker
                  data={data}
                  theme={theme.palette.mode}
                  onEmojiSelect={(emoji) => {
                    handleEmojiClick(emoji.native);
                  }}
                />
              </Box>
              <ChatInput
                setopenPicker={setopenPicker}
                inputRef={inputRef}
                value={value}
                setValue={setValue}
              />
            </Stack>
            <Box
              sx={{
                height: 48,
                width: 48,
                backgroundColor: "primary.main",
                borderRadius: 1.5,
              }}
            >
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ height: "100%", width: "100%" }}
              >
                <IconButton
                  onClick={() => {
                    chat_type === "individual"
                      ? socket?.emit("text_message", {
                          message: linkify(value),
                          chat_id: room_id,
                          from: uid,
                          to: current_conversation._id,
                          type: containsUrl(value) ? "Link" : "Text",
                        })
                      : socket?.emit("group_message", {
                          group_id: current_group_conversation?.group_id,
                          from_user_id: uid,
                          message: linkify(value),
                          type: containsUrl(value) ? "Link" : "Text",
                        });
                    setValue("");
                  }}
                >
                  <PaperPlaneTilt color="white" />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <SnackbarAlert />
    </Box>
  );
}

export default Conversation;
