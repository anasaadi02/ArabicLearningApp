// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getDatabase } from "@firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2ryY8SsdvPCgH0KR_ObHxZ38foPxrKns",
  authDomain: "parking-app-pfa.firebaseapp.com",
  projectId: "parking-app-pfa",
  storageBucket: "parking-app-pfa.appspot.com",
  messagingSenderId: "1029293597628",
  appId: "1:1029293597628:web:d5c5dce7efa05c479a01b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

