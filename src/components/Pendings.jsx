import { doc, updateDoc } from "firebase/firestore";
import { firestore, getUserInfo } from "../lib/firebase";

import styles from "../css/Pendings.module.css";
import User from "../assets/user.png";
import { useEffect, useState } from "react";

const Pendings = ({ handleViewClick, data }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  const handleDecline = async (emergencyId) => {
    try {
      if (emergencyId) {
        const emergencyRef = doc(firestore, "emergencies", emergencyId);
        await updateDoc(emergencyRef, { status: "rejected" });
        console.log(`Emergency ${emergencyId} marked as rejected.`);
      }
    } catch (error) {
      console.error("Error updating emergency status:", error);
    }
  };

  useEffect(() => {
    getUserInfo(data.userId).then((user) => {
      setProfileImg(user.profileImg);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    });
  }, []);

  return (
    <div className={styles.Pendings}>
      <div className={styles.User}>
        <img src={profileImg || User} />
        <span>{`${firstName} ${lastName}`}</span>
      </div>

      <div className={styles.Buttons}>
        <button onClick={() => handleViewClick(data.id, data.userId)}>
          Accept
        </button>
        <button onClick={() => handleDecline(data.id)}>Decline</button>
      </div>
    </div>
  );
};

export default Pendings;
