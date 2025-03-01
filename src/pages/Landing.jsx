import styles from "../css/Landing.module.css";
import PropTypes from "prop-types";
import Disaster from '../assets/disaster.png'
import Line from '../assets/line.png'
import Disaster2 from '../assets/Disaster2.jpg'
import Logo from '../assets/MainLogo.png'

import Nav from "../components/Nav";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Footer from "../components/Footer";
import Emergency from "../components/Emergency";
import PostsList from "../components/PostList";

const Landing = ({
  handleNavClick,
  navCount,
  openCall,
  setOpenCall,
  handleCallClick,
}) => {
  return (
    <div className={styles.Landing}>
      {/* Navigation Component */}
      <Nav navCount={navCount} handleNavClick={handleNavClick} />
      <div className={styles.Disaster}>
        <img src={Disaster2} />
        <div className={styles.Disaster_inner}>
          <span className={styles.Caps}>ON-GUARD: YOUR SAFETY, OUR PRIORITY</span>
          <span className={styles.Smol}>Disasters strike when least expected, but with On-Guard, you’re always prepared. Stay informed with real-time alerts, emergency guides, and safety tools—all in one reliable app.</span>
        </div>

      </div>
      <img className={styles.Line} src={Line} />

      {/* Conditional Rendering for Signup */}
      {navCount === 1 && (
        <Signup navCount={navCount} handleNavClick={handleNavClick} />
      )}

      {/* Conditional Rendering for Login */}
      {navCount === 2 && (
        <Login navCount={navCount} handleNavClick={handleNavClick} />
      )}

      {/* Body Section */}
      <div className={styles.Body}>
        <PostsList />
        {openCall && <Emergency handleCallClick={handleCallClick} />}
      </div>

      {/* Footer Component */}
      {/* <Footer /> */}

      <div className={styles.Footer}>
        <img src={Logo} />
        <span>ON-GUARD</span>
      </div>
    </div>

  );
};

Landing.propTypes = {
  handleNavClick: PropTypes.func.isRequired,
  navCount: PropTypes.number.isRequired,
  openCall: PropTypes.bool.isRequired,
  setOpenCall: PropTypes.func,
  handleCallClick: PropTypes.func.isRequired,
};

export default Landing;
