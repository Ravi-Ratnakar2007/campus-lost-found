// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyneexmpUeo0GEGQ9PTG5gehBs3ipuhtM",
  authDomain: "lost-and-found-2b276.firebaseapp.com",
  projectId: "lost-and-found-2b276",
  storageBucket: "lost-and-found-2b276.firebasestorage.app",
  messagingSenderId: "436139821202",
  appId: "1:436139821202:web:ef05326068cd4bf797fe4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);