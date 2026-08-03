import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import getCurrentUser from "./customHooks/getCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { Navigate } from "react-router-dom";
import getOtherUsers from "./customHooks/getOtherUsers";
import io from "socket.io-client";
import { serverUrl } from "./main";
import { setOnlineUsers, setSocket } from "./redux/userSlice";

function App() {
  getCurrentUser();
  getOtherUsers();
  let { userData, socket, onlineUsers } = useSelector((state) => state.user);
  let dispatch = useDispatch();

 useEffect(() => {
  if (!userData) {
    if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
    return;
  }

  const socketio = io(serverUrl, {
    query: {
      userId: userData._id,
    },
    transports: ["websocket"],
  });

  dispatch(setSocket(socketio));

  socketio.on("getOnlineUsers", (users) => {
    dispatch(setOnlineUsers(users));
  });

  return () => {
    socketio.close();
    dispatch(setSocket(null));
  };
}, [userData]);

  return (
    <Routes>
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/profile" />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
}

export default App;
