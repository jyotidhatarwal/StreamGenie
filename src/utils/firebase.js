// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB02NTJMKa7GAZ9msKTOdagEsPAlCh-3M",
  authDomain: "streamgenie-f2ec1.firebaseapp.com",
  projectId: "streamgenie-f2ec1",
  storageBucket: "streamgenie-f2ec1.appspot.com",
  messagingSenderId: "273655889307",
  appId: "1:273655889307:web:56a99ff897dd2517a7b53e",
  measurementId: "G-4J3N1BRNTD"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
