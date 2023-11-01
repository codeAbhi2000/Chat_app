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

function App() {
  return (
    <MyCustomTheme>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/dashboard" element={<DashBoard />}>
          <Route path='chats' element={<ChatList/>}/>
          <Route path="groups" element={<GroupList/>}/>
          <Route path="settings" element={<Settings/>}/>
          <Route path='updates' element={<Updates/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </MyCustomTheme>
  );
}

export default App;
