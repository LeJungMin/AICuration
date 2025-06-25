import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAU6BxrTppdUE9g6JyJd50mRfgt2rvACWo",
    authDomain: "ntwitter-a091b.firebaseapp.com",
    projectId: "ntwitter-a091b",
    storageBucket: "ntwitter-a091b.appspot.com",
    messagingSenderId: "843394182611",
    appId: "1:843394182611:web:ad3b1a444e508c184c1326",
    measurementId: "G-ZFVSBYVNSW"
  };
  
  const app = initializeApp(firebaseConfig);
  export const authService = getAuth();
  export const dbService = getFirestore();
  export const storageService = getStorage();
  