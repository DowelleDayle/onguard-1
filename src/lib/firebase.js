import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, // Import signOut for logging out
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyALVsuSWiP_fwDbscLQ3zaE5RQmjjBXUMo",
//   authDomain: "onguard-6f7cb.firebaseapp.com",
//   databaseURL:
//     "https://onguard-6f7cb-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "onguard-6f7cb",
//   storageBucket: "onguard-6f7cb.firebasestorage.app",
//   messagingSenderId: "245232388429",
//   appId: "1:245232388429:web:93721d2372bf679b574f04",
//   measurementId: "G-GXZTMXXWKT",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBkCJJ18SbIRaFkYImXtXN_7A-fm1kT9Qg",
  authDomain: "onguard-60bc2.firebaseapp.com",
  databaseURL:
    "https://onguard-60bc2-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "onguard-60bc2",
  storageBucket: "onguard-60bc2.firebasestorage.app",
  messagingSenderId: "376221102604",
  appId: "1:376221102604:web:d25fc97b8200a4ad073429",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);
const auth = getAuth(app);

// Sign-up function with Firestore integration
const signUp = async (email, password, firstName, lastName, address) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      firstName,
      lastName,
      email,
      address,
      password,
      status: "pending",
      createdAt: new Date(),
    });

    console.log("User signed up and stored in Firestore:", user);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

// Sign-in function
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userRef = doc(firestore, "users", userCredential.user.uid);
    const userSnap = await getDoc(userRef);

    console.log("User logged in:", userCredential.user);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log(userData);
      if (!userData.isAdmin) {
        return { ...userData, role: "user" }; // Default role
      } else {
        return { ...userData, role: "admin" };
      } // Return user with role
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

// Sign-out function
const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

const getUserInfo = async (uid) => {
  try {
    const userRef = doc(firestore, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("No user data found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    return null;
  }
};

const checkAdmin = async (redirect) => {
  onAuthStateChanged(auth, async (user) => {
    console.log(user);
    if (!user) {
      redirect("/"); // Redirect if not logged in
      return;
    }

    const userRef = doc(firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);

    console.log(userSnap.data());
    console.log(userSnap.exists());

    if (!userSnap.exists() || !userSnap.data().isAdmin) {
      redirect("/"); // Redirect if not admin
    } else {
      setLoading(false);
    }
  });
};

export {
  auth,
  signUp,
  signIn,
  logOut,
  firestore,
  storage,
  messaging,
  getUserInfo,
  checkAdmin,
};
