import { useEffect, useState } from "react";
import { firestore } from "../lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

import styles from "../css/PendingUsers.module.css"; // Create CSS for styling

const PendingUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      const usersRef = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersRef);
      const pending = usersSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.status === "pending"); // Get only pending users

      setPendingUsers(pending);
    };

    fetchPendingUsers();
  }, []);

  const handleApproval = async (userId, action) => {
    try {
      const userRef = doc(firestore, "users", userId);
      await updateDoc(userRef, {
        status: action === "accept" ? "approved" : "declined",
      });

      // Remove the user from the pending list
      setPendingUsers((prev) => prev.filter((user) => user.id !== userId));

      console.log(`User ${action}ed successfully.`);
    } catch (error) {
      console.error(`Error ${action}ing user:`, error.message);
    }
  };

  return (
    <div className={styles.PendingUsers}>
      <h2>Pending User Approvals</h2>
      {pendingUsers.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <ul>
          {pendingUsers.map((user) => (
            <li key={user.id} className={styles.UserCard}>
              <div>
                <strong>
                  {user.firstName} {user.lastName}
                </strong>
                <p>Email: {user.email}</p>
                <p>Address: {user.address}</p>
              </div>
              <div className={styles.Buttons}>
                <button
                  onClick={() => handleApproval(user.id, "accept")}
                  className={styles.Accept}
                >
                  ✅ Accept
                </button>
                <button
                  onClick={() => handleApproval(user.id, "decline")}
                  className={styles.Decline}
                >
                  ❌ Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingUsers;
