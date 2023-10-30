import { Stack, Box } from "@mui/material";
import React from "react";
import { Chat_History } from "../assets/data";
import {
  Docmsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "./MessageTypes";

function Messages() {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((el) => {
          switch (el.type) {
            case "divider":
              return <Timeline el={el} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                  return <MediaMsg el={el} />;
                case "doc":
                  return <Docmsg el={el} />;
                case "link":
                  return <LinkMsg el={el} />;
                case "reply":
                  return <ReplyMsg el={el} />;

                default:
                  return <TextMsg el={el} />;
              }
             

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
}

export default Messages;
