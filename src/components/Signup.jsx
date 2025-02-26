import { useState } from "react";
import { signUp } from "../lib/firebase";
import styles from "../css/Signup.module.css";
import PropTypes from "prop-types";

const Signup = ({ handleNavClick }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState(""); // New Address State

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    try {
      await signUp(email, password, firstName, lastName, address); // Passing address
      console.log("User signed up successfully!");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className={styles.Signup}>
      <h1>Create your account</h1>
      <form className={styles.Forms} onSubmit={handleSubmit}>
        <div className={styles.Fullname}>
          <div className={styles.Fname}>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.Lname}>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.Email}>
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.Address}>
          <label>Address/Location:</label> {/* New Address Input */}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </div>

        <div className={styles.Fullname}>
          <div className={styles.Fname}>
            <label>Enter your password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.Lname}>
            <label>Confirm password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit">SUBMIT</button>
      </form>
      <button onClick={() => handleNavClick(0)} className={styles.Close}>
        CLOSE
      </button>
    </div>
  );
};

Signup.propTypes = {
  handleNavClick: PropTypes.func.isRequired,
};

export default Signup;
