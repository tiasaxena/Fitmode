import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";//onAuthStateChanged basically listens to the user's change in the authentication
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

//initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
export { db, storage };

export default function singup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function login() {
    return signInWithEmailAndPassword(auth);
}

export function logout() {
    return signOut(auth);
}

//Custom Hook
export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    const unsub = useEffect(() => {
        onAuthStateChanged(auth, user => setCurrentUser(user)); return unsub;
    }, []);

    return currentUser;
}