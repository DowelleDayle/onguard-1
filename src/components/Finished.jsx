import styles from "../css/Finished.module.css";
import User from "../assets/user.png";
import { useEffect, useState } from "react";
import { getUserInfo } from "../lib/firebase";
import { set } from "firebase/database";

const Finished = ({ data,handleUserUser,userDetails }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  const formattedDate = new Date(data.timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    getUserInfo(data.userId).then((user) => {
      setProfileImg(user.profileImg);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    });
  }, []);

  return (
    <div className={styles.Finished} onClick={handleUserUser}>
      <div className={styles.Name}>
        <img src={profileImg || User} />
        <span>{`${firstName} ${lastName}`}</span>
      </div>
      <span className={styles.Date}>{formattedDate}</span>
    </div>
  );
};
export default Finished;
