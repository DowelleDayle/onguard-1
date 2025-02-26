import { useState, useEffect } from "react";
import styles from "../css/Inquiries.module.css";
import Pendings from "./Pendings";
import { firestore } from "../lib/firebase"; // Import Firestore configuration
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import BarangayEmergency from "./BarangayEmergency";

const Inquiries = () => {
  const [selectedButton, setSelectedButton] = useState("Recent");
  const [pendingCases, setPendingCases] = useState([]); // State for pending cases

  const handleClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  // useEffect(() => {
  //   const fetchPendingCases = async () => {
  //     try {
  //       // Query Firestore for emergencies where type === 'ongoing'
  //       const emergenciesRef = collection(firestore, "emergencies");
  //       const q = query(emergenciesRef, where("status", "==", "ongoing"));
  //       const querySnapshot = await getDocs(q);

  //       // Map query results to pending cases
  //       const fetchedCases = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       setPendingCases(fetchedCases);
  //     } catch (error) {
  //       console.error("Error fetching pending cases:", error);
  //     }
  //   };

  //   fetchPendingCases();
  // }, []);

  useEffect(() => {
    const emergenciesRef = collection(firestore, "emergencies");
    const q = query(emergenciesRef, where("status", "==", "ongoing"));

    // Real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedCases = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPendingCases(fetchedCases);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const [userId, setUserId] = useState(null);
  const [callId, setCallId] = useState(null);
  const [showCall, setShowCall] = useState(null);

  const handleViewClick = (callId, userId) => {
    console.log(callId);
    console.log(userId);
    setCallId(callId);
    setUserId(userId);
    setShowCall(true);
    // setShowPopup(true);
    // setCurrentCallId(callId);
  };

  const handleCallClick = () => {
    setShowCall(false);
  };

  return (
    <div className={styles.Inquiries}>
      <div className={styles.Header}>
        <div className={styles.Emergency}>
          <span>Emergency Cases</span>
          <span>Pending Cases: {pendingCases.length}</span>
        </div>
        {/* <div className={styles.Types}>
          <div className={styles.Specific_type}>
            <div className={styles.Medical}></div>
            <span>Medical Emergency</span>
          </div>

          <div className={styles.Specific_type}>
            <div className={styles.Fire}></div>
            <span>Fire Incident</span>
          </div>

          <div className={styles.Specific_type}>
            <div className={styles.Crime}></div>
            <span>Crime Report</span>
          </div>

          <div className={styles.Specific_type}>
            <div className={styles.Legal}></div>
            <span>Legal Assistance</span>
          </div>
        </div> */}

        <div className={styles.Sort}>
          <button
            className={selectedButton === "Recent" ? styles.Selected : ""}
            onClick={() => handleClick("Recent")}
          >
            Request
          </button>
          {/* <button
            className={selectedButton === "Oldest" ? styles.Selected : ""}
            onClick={() => handleClick("Oldest")}
          >
            Oldest
          </button> */}
        </div>
      </div>

      <div className={styles.Pendings}>
        {pendingCases
          .sort((a, b) =>
            selectedButton === "Recent"
              ? b.timestamp - a.timestamp
              : a.timestamp - b.timestamp
          ) // Sort dynamically based on selectedButton
          .map((caseItem) => (
            <Pendings
              key={caseItem.id}
              data={caseItem}
              handleViewClick={handleViewClick}
            />
          ))}
      </div>

      {showCall && (
        <BarangayEmergency
          callId={callId}
          userId={userId}
          handleCallClick={handleCallClick}
        />
      )}
    </div>
  );
};

export default Inquiries;
