// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDQwk-IRzXF2jJ4pmcvu5XMnTM9mtnu618",
    authDomain: "socialfy-77d53.firebaseapp.com",
    projectId: "socialfy-77d53",
    storageBucket: "socialfy-77d53.appspot.com",
    messagingSenderId: "987867019899",
    appId: "1:987867019899:web:30dc935c415d07113c80de"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); 