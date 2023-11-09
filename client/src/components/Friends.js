import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOtherUser,
  getFriendRequests,
  getFriends,
} from "../redux/slices/app";
import { FriendComponent, FriendRequestComponent, UserComponent } from "./FrienndsTabComponents";

const UserLists = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOtherUser());
  }, []);

  const { users } = useSelector((state) => state.app);
  console.log(users);
  return (
    <>
      {users.map((el, idx) => {
        return <UserComponent key={el._id} {...el}/>;
      })}
    </>
  );
};
const FriendsLists = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  const { friends } = useSelector((state) => state.app);
  console.log(friends);

  return (
    <>
      {friends ? friends.map((el, idx) => {
        return <FriendComponent key={el._id} {...el}/>;
      }) : <></>}
    </>
  );
};
const FriendRequestLists = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendRequests());
  }, []);

  const { requests } = useSelector((state) => state.app);

  return (
    <>
      {requests.map((el, idx) => {
        return <FriendRequestComponent key={el.id} {...el}/>;
      })}
    </>
  );
};

function Friends({ open, handleClose }) {
  const [value, setvalue] = useState(0);
  const handleChange = (event, newValue) => {
    setvalue(newValue);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      keepMounted
      maxWidth="xs"
      sx={{ p: 4 }}
    >
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.5}>
            {(() => {
              switch (value) {
                case 0:
                  return <UserLists />;

                case 1:
                  return <FriendsLists />;
                case 2:
                  return <FriendRequestLists />;

                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default Friends;
