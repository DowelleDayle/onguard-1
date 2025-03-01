import { useEffect, useState } from "react";
import { logOut, checkAdmin } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

import styles from "../css/Admin.module.css";

import Inquiry from "../assets/Inquiry.png";
import Logout from "../assets/logout.png";
import Post from "../assets/Post.png";
import Logo from "../assets/MainLogo.png";
import Complete from "../assets/Complete.png";
import PendingIcon from "../assets/Pending.png";

import Inquiries from "../components/Inquiries";
import Publish from "../components/Publish";
import Completed from "../components/Completed";
import PendingUsers from "../components/PendingUsers";
import Nav from "../components/Nav";

const Admin = ({handleUserUser, userDetails}) => {
  const [navCount, setNavCount] = useState(1);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleNavClick = (value) => {
    setNavCount(value);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("User logged out successfully");
      setIsLogin(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const redirect = () => {
    navigate("/");
  };

  useEffect(() => {
    checkAdmin(redirect);
  }, []);

  return (
    <div className={styles.Admin}>
      <Nav isLogin={isLogin} handleNavClick={handleNavClick} />

      <div className={styles.Admin_body}>
        <div className={styles.Admin_nav}>
          <div className={styles.Admin_inner}>
            <div className={styles.Logo}>
              <img src={Logo} alt="Logo" />
              <span>On-Guard</span>
            </div>

            <div
              className={styles.Admin_link}
              onClick={() => handleNavClick(1)}
            >
              <img src={Inquiry} alt="Inquiries" />
              <span>Inquiries</span>
            </div>

            <div
              className={styles.Admin_link}
              onClick={() => handleNavClick(2)}
            >
              <img src={Complete} alt="Completed" />
              <span>Activity Logs</span>
            </div>

            <div
              className={styles.Admin_link}
              onClick={() => handleNavClick(3)}
            >
              <img src={Post} alt="Publish" />
              <span>Publish</span>
            </div>


            <div
              className={styles.Admin_link}
              onClick={() => handleNavClick(4)}
            >
              <img src={PendingIcon} alt="Pending Users" />
              <span>Pending Users</span>
            </div>
          </div>

          {isLogin && (
            <img
              className={styles.Out}
              src={Logout}
              alt="Logout"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
        {navCount === 1 && <Inquiries />}
        {navCount === 2 && <Completed handleUserUser={handleUserUser} userDetails={userDetails} />}
        {navCount === 3 && <Publish />}
        {navCount === 4 && <PendingUsers />}
      </div>
    </div>
  );
};

export default Admin;
