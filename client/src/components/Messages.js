import { Stack, Box, Snackbar } from "@mui/material";
import React, { useEffect, useRef } from "react";
import {
  Docmsg,
  GroupDocMsg,
  GroupImgMsg,
  GroupLinkMsg,
  GroupMsg,
  LinkMsg,
  MediaMsg,
  
  TextMsg,

} from "./MessageTypes";
import { useSelector } from "react-redux";

function Messages({ menu }) {
  const { chat_type } = useSelector((state) => state.app);
  const { current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const { group_messages } = useSelector(
    (state) => state.conversation.group_chat
  );

  // console.log(group_messages);
  const messageListRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [current_messages]);
  return (
    <Box p={3} ref={messageListRef}>
      <Stack spacing={3}>
        {chat_type === "individual"
          ? current_messages?.map((el) => {
              switch (el.type) {
                case "Img":
                  return <MediaMsg el={el} menu={menu} />;
                case "Doc":
                  return <Docmsg el={el} menu={menu} />;
                case "Link":
                  return <LinkMsg el={el} menu={menu} />;
                case "Text":
                  return <TextMsg el={el} menu={menu} />;

                default:
                  return <></>;
              }
            })
          : group_messages?.map((el) => {
              switch (el.type) {
                case "Text":
                  return <GroupMsg el={el} menu={menu} />;
                case "Link":
                  return <GroupLinkMsg el={el} menu={menu} />;
                case "Doc":
                  return <GroupDocMsg el={el} menu={menu} />;
                case "Img":
                  return <GroupImgMsg el={el} menu={menu} />;

                default:
                  break;
              }
            })}
      </Stack>
      <Snackbar />
    </Box>
  );
}

export default Messages;
