import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD__oYOix0IuOAwe6Xdv4MzvaXNZjRFoeM",
  authDomain: "socialstream-35452.firebaseapp.com",
  projectId: "socialstream-35452",
  storageBucket: "socialstream-35452.firebasestorage.app",
  messagingSenderId: "195542666042",
  appId: "1:195542666042:web:0bd5d9051a8748f8561e03"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
