import React, { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Events from "./routes/events.jsx";
import CreateEvent from "./routes/createEvent.jsx";
import Event from "./routes/event.jsx";
import EditEvent from "./routes/editEvent.jsx";
import Users from "./routes/users.jsx";
import EditUser from "./routes/editUser.jsx";

import SignUp from "./components/pages/SignUp.jsx";
import SignIn from "./components/pages/SignIn.jsx";
import { getCurrentUser } from "./lib/apiClient/auth.js";
import "./App.css";

export const AuthContext = createContext({
  loading: false,
  setLoading: React.Dispatch,
  isSignedIn: false,
  setIsSignedIn: React.Dispatch,
  currentUser: undefined,
  setCurrentUser: React.Dispatch,
});

function App() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res?.data.is_login === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        navigate("/events");
      } else {
        console.log("No current user");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);
  const Private = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        navigate("/signin");
      }
    } else {
      return <></>;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/signin" element={<SignIn />} />

        <Route
          path="events"
          element={
            <Private path="events">
              <Events />
            </Private>
          }
        />
        <Route
          path="events/create"
          element={
            <Private path="events/create">
              <CreateEvent />
            </Private>
          }
        />
        <Route
          path="events/:id"
          element={
            <Private path="events/:id">
              <Event />
            </Private>
          }
        />
        <Route
          path="events/:id/edit"
          element={
            <Private path="events/:id/edit">
              <EditEvent />
            </Private>
          }
        />
        <Route
          path="users"
          element={
            <Private path="users">
              <Users />
            </Private>
          }
        />
        <Route
          path="mypage"
          element={
            <Private path="mypage">
              <EditUser />
            </Private>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
