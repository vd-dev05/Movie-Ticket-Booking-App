 import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxRV3ER5-2BCIwzbTT7sTcHh9HD-ap5Xs",
  authDomain: "movie-ticket-25-659ce.firebaseapp.com",
  databaseURL: "https://movie-ticket-25-659ce-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "movie-ticket-25-659ce",
  storageBucket: "movie-ticket-25-659ce.appspot.com",
  messagingSenderId: "599610268388",
  appId: "1:599610268388:web:86525e34a432b415286af1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const database = getDatabase(app);
