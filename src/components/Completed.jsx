import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../lib/firebase"; // Import Firebase configuration
import styles from "../css/Completed.module.css";
import Finished from "./Finished";
import UserDetails from "./UserDetails";

const Completed = ({handleUserUser, userDetails}) => {

  const [cases, setCases] = useState([]); 

  useEffect(() => {
    const fetchCases = async () => {
      try {

        const emergenciesRef = collection(firestore, "emergencies");
        const q = query(
          emergenciesRef,
          where("status", "in", ["completed", "rejected"])
        );
        const querySnapshot = await getDocs(q);


        const fetchedCases = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCases(fetchedCases);
      } catch (error) {
        console.error("Error fetching emergencies:", error);
      }
    };

    fetchCases();
  }, []);

  return (
    <div className={styles.Completed} >
      {cases.length > 0 ? (
        cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className={caseItem.status === "rejected" ? styles.Rejected : ""}
          >
            <Finished data={caseItem} handleUserUser={handleUserUser} userDetails={userDetails}/>
            {caseItem.status === "rejected" && (
              <p className={styles.RejectedText}>This call was rejected</p>
            )}
          </div>
        ))
      ) : (
        <p>No completed or rejected emergencies found.</p>
      )}

      {
        userDetails && <UserDetails handleUserUser={handleUserUser} userDetails={userDetails}/>
      }
    </div>
  );
};

export default Completed;
