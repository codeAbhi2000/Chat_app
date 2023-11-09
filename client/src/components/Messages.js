import { Stack, Box, Snackbar } from "@mui/material";
import React ,{useEffect,useRef} from "react";
import { Chat_History } from "../assets/data";
import {
  Docmsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "./MessageTypes";
import { useSelector } from "react-redux";


function Messages({ menu }) {
  const { current_messages } = useSelector(
    (state) => state.conversation.direct_chat
    );
    const messageListRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [current_messages]);
  return (
    <Box p={3}   ref={messageListRef}>
      <Stack spacing={3}>
        {current_messages.map((el) => {
          switch (el.type) {
            case "img":
              return <MediaMsg el={el} menu={menu} />;
            case "doc":
              return <Docmsg el={el} menu={menu} />;
            case "link":
              return <LinkMsg el={el} menu={menu} />;
            case "reply":
              return <ReplyMsg el={el} menu={menu} />;

            default:
              return <TextMsg el={el} menu={menu} />;
          }
        })}
      </Stack>
      <Snackbar/>
    </Box>
  );
}

export default Messages;
