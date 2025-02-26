import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../lib/firebase"; // Import Firebase configuration
import styles from "../css/Completed.module.css";
import Finished from "./Finished";

const Completed = () => {
  const [cases, setCases] = useState([]); // State for both completed & rejected emergencies

  useEffect(() => {
    const fetchCases = async () => {
      try {
        // Query Firestore for emergencies with status "completed" or "rejected"
        const emergenciesRef = collection(firestore, "emergencies");
        const q = query(
          emergenciesRef,
          where("status", "in", ["completed", "rejected"])
        );
        const querySnapshot = await getDocs(q);

        // Map query results to cases
        const fetchedCases = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCases(fetchedCases); // Set state with fetched cases
      } catch (error) {
        console.error("Error fetching emergencies:", error);
      }
    };

    fetchCases();
  }, []);

  return (
    <div className={styles.Completed}>
      {cases.length > 0 ? (
        cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className={caseItem.status === "rejected" ? styles.Rejected : ""}
          >
            <Finished data={caseItem} />
            {caseItem.status === "rejected" && (
              <p className={styles.RejectedText}>This call was rejected</p>
            )}
          </div>
        ))
      ) : (
        <p>No completed or rejected emergencies found.</p>
      )}
    </div>
  );
};

export default Completed;
