import React, { useEffect } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import SideBar from "../components/SideBar";
import { Navigate, Outlet } from "react-router-dom";
import Conversation from "../components/Conversation";
import Contact from "../components/Contact";
import { useDispatch, useSelector } from "react-redux";

import SharedMsg from "../components/SharedMsg";
import { connectSocket, socket } from "../socket";
import { openSnackBar, selectChat } from "../redux/slices/app";
import poster from "../assets/iamges/Conversation-pana.png";
import {
  AddConversation,
  AddDirectMessage,
  AddGroupMessage,
  UpdateConversation,
} from "../redux/slices/conversation";
import SnackbarAlert from "../components/Snackbar";

function DashBoard() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { sidebar, room_id, chat_type } = useSelector((store) => store.app);

  const { isLoggedIn, uid } = useSelector((store) => store.auth);

  const createTimeStamp = () => {
    const currentDate = new Date();

    // Format the date as YYYY-MM-DD
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // Format the time as HH:MM:SS
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Combine the formatted date and time
    const combinedDateTime = `${formattedDate} ${formattedTime}`;

    return combinedDateTime;
  };

  const { conversations, curren_conversation, current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const { curren_group_converstation } = useSelector(
    (state) => state.conversation.group_chat
  );

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = () => {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };
    }

    if (!socket) {
      connectSocket(uid);
    }
    socket.on("new_friend_request", (data) => {
      dispatch(openSnackBar({ severity: "success", message: data.message }));
    });
    socket.on("request_accepted", (data) => {
      dispatch(openSnackBar({ severity: "success", message: data.message }));
    });
    socket.on("request_sent", (data) => {
      dispatch(openSnackBar({ severity: "success", message: data.message }));
    });
    socket.on("start_chat", (data) => {
      console.log(data);
      const existing_chats = conversations.find(
        (el) => el.chat_id === data.chat_id
      );

      if (existing_chats) {
        //dispatch for undateconversation
        dispatch(UpdateConversation({ conversations: data }));
      } else {
        //dispatch fro adding the new chat
        dispatch(AddConversation({ conversations: data }));
      }

      dispatch(selectChat({ room_id: data.chat_id }));
    });

    socket.on("new_message", (data) => {
      console.log("this is neew chat", data.chat_id);
      if (curren_conversation?.chat_id === data.chat_id) {
        dispatch(
          AddDirectMessage({
            id: data.data.message_id,
            chat_id: data.data.chat_id,
            type: data.data.type,
            time: createTimeStamp(),
            message: data.data.message,
            incoming: data.data.to === uid,
            outgoing: data.data.from === uid,
          })
        );
        dispatch(openSnackBar({ severity: "info", message: data.message }));
      }
    });

    socket.on("group_room_created", (data) => {
      dispatch(openSnackBar({ severity: "info", message: "Room created" }));
    });

    socket.on("new_group_message", (data) => {
      console.log(data);
      if (data.group_id === curren_group_converstation?.group_id) {
        dispatch(
          AddGroupMessage({
            id: data.message_id,
            group_id: data.group_id,
            type: data.type,
            from_user_id: data.from_user_id,
            sender_name:data.from_user_id === uid ? "You" : data.from_user_name,
            message: data.message,
            message_time: createTimeStamp(),
            incoming: data.from_user_id !== uid,
            outgoing: data.from_user_id === uid,
          })
        );
        dispatch(openSnackBar({severity: "info", message: "New Group Message"}))
      }
    });

    return () => {
      socket.off("new_friend_request");
      socket.off("request_accepted");
      socket.off("request_sent");
      socket.off("start_chat");
      socket.off("new_message");
      socket.off("group_room_created");
      socket.off("new_group_message");
    };
  }, [isLoggedIn, socket]);

  if (isLoggedIn) {
    return (
      <Stack direction={{ sm: "row", xs: "column" }}>
        <SideBar />
        <Outlet />
        {room_id !== null ? (
          <Conversation />
        ) : (
          <Box
            sx={{
              height: "100vh",
              width: {
                sm: sidebar.open ? "calc(100vw-740px)" : "calc(100vw-420px)",
                xs: "100%",
              },
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#F0F4FA"
                  : "background.default",
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
            }}
          >
            <Stack
              alignItems={"center"}
              sx={{ width: "100%", height: "100%" }}
              justifyContent={"center"}
            >
              <Stack
                alignItems={"center"}
                height={"80%"}
                justifyContent={"center"}
              >
                <img src={poster} alt="poster" width={"100%"} height={"100%"} />
                <Typography variant="subtitle1">Start Conversation </Typography>
              </Stack>
            </Stack>
          </Box>
        )}
        {sidebar.open &&
          (() => {
            switch (sidebar.type) {
              case "CONTACT":
                return <Contact />;
              case "SHARED":
                return <SharedMsg />;
              default:
                break;
            }
          })()}
        <SnackbarAlert />
      </Stack>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default DashBoard;
