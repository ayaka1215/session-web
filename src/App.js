import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Events from "./routes/events.jsx";
import CreateEvent from "./routes/createEvent.jsx";
import Event from "./routes/event.jsx";
import EditEvent from "./routes/editEvent.jsx";

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

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);

        console.log(res?.data.data);
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
  }, [setCurrentUser]);
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
    <BrowserRouter>
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
          <Private>
            <Route path="events" element={<Events />} />
            <Route path="events/create" element={<CreateEvent />} />
            <Route path="events/:id" element={<Event />} />
            <Route path="events/:id/edit" element={<EditEvent />} />
          </Private>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
