

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";


import "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBswNajjyT5h1AScAQy-ASKY3dNZPsdlJ8",
  authDomain: "olx-new-2.firebaseapp.com",
  projectId: "olx-new-2",
  storageBucket: "olx-new-2.appspot.com",
  messagingSenderId: "57647289387",
  appId: "1:57647289387:web:cc409e1d608baafbbec66e",
  measurementId: "G-5Z37XFP5HF"
};

// Initialize Firebase and return a firebase object
export const Firebase = initializeApp(firebaseConfig);
export const db=getFirestore(Firebase)
export const storage = getStorage(Firebase)




