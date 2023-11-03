import React from "react";

import MyCustomTheme from "./theme/customTheme";

import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import DashBoard from "./pages/DashBoard";
import ChatList from "./components/ChatList";
import GroupList from "./components/GroupList";
import Settings from "./components/Settings";
import Updates from "./components/Updates";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./components/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import OTPInput from "./pages/IOTPInput";
import ResetPassword from "./pages/ResetPassword";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "./redux/slices/app";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.app);

  return (
    <MyCustomTheme>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:uid/:token" element={<ResetPassword />} />
        <Route path="/enterOTP" element={<OTPInput />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<DashBoard />}>
          <Route path="chats" element={<ChatList />} />
          <Route path="groups" element={<GroupList />} />
          <Route path="settings" element={<Settings />} />
          <Route path="updates" element={<Updates />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      {snackbar.message && snackbar.open ? (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => {
            dispatch(closeSnackBar());
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => {
              dispatch(closeSnackBar());
            }}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </MyCustomTheme>
  );
}

export default App;
