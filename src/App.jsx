import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Nav from "./components/Nav";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

import Call from "./components/Call";

import { messaging } from "./lib/firebase";

const App = () => {
  const [navCount, setNavCount] = useState(0);
  const handleNavClick = (value) => {
    setNavCount(value);
  };

  const [openCall, setOpenCall] = useState(false);
  const handleCallClick = () => {
    setOpenCall(!openCall);
    console.log(openCall);
  };

  const [userDetails, setUserDetails] = useState(false)
  const handleUserUser = () => {
    setUserDetails( !userDetails)
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                navCount={navCount}
                handleNavClick={handleNavClick}
                openCall={openCall}
                setOpenCall={setOpenCall}
                handleCallClick={handleCallClick}
              />
            }
          />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Admin" element={<Admin handleUserUser={handleUserUser} userDetails={userDetails} />} />
        </Routes>
      </Router>
      <Call openCall={openCall} handleCallClick={handleCallClick} />
    </div>
  );
};

export default App;
