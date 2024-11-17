//  import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";
// import { getFirestore} from 'firebase/firestore';

// import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'
// // import firebase from 'firebase/app';
// import 'firebase/firestore';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   // apiKey: "AIzaSyDxRV3ER5-2BCIwzbTT7sTcHh9HD-ap5Xs",
//   // authDomain: "movie-ticket-25-659ce.firebaseapp.com",
//   // databaseURL: "https://movie-ticket-25-659ce-default-rtdb.asia-southeast1.firebasedatabase.app",
//   // projectId: "movie-ticket-25-659ce",
//   // storageBucket: "movie-ticket-25-659ce.appspot.com",
//   // messagingSenderId: "599610268388",
//   // appId: "1:599610268388:web:86525e34a432b415286af1"
//   // databaseURL: "https://movie-ticket-25-659ce-default-rtdb.asia-southeast1.firebasedatabase.app",
//   apiKey: "AIzaSyCBRUbKiGbtS2MbFcG-naYvsnwTTwuZ3SI",
//   authDomain: "send-otp-f1a27.firebaseapp.com",
//   projectId: "send-otp-f1a27",
//   storageBucket: "send-otp-f1a27.firebasestorage.app",
//   messagingSenderId: "949551374839",
//   appId: "1:949551374839:web:249b1bdfc4105f26370ef2",
//   measurementId: "G-BGFZ612S24"
  
// };
// firebase.initializeApp(firebaseConfig)

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app)
// export const auth = getAuth(app)
// export const database = getDatabase(app);
// export default firebase

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {initializeApp} from 'firebase/app'

const firebase = initializeApp({
  apiKey: "AIzaSyCBRUbKiGbtS2MbFcG-naYvsnwTTwuZ3SI",
  authDomain: "send-otp-f1a27.firebaseapp.com",
  projectId: "send-otp-f1a27",
  storageBucket: "send-otp-f1a27.firebasestorage.app",
  messagingSenderId: "949551374839",
  appId: "1:949551374839:web:249b1bdfc4105f26370ef2",
  measurementId: "G-BGFZ612S24"
})
// firebase.initializeApp({
//   apiKey: "AIzaSyCBRUbKiGbtS2MbFcG-naYvsnwTTwuZ3SI",
//   authDomain: "send-otp-f1a27.firebaseapp.com",
//   projectId: "send-otp-f1a27",
//   storageBucket: "send-otp-f1a27.firebasestorage.app",
//   messagingSenderId: "949551374839",
//   appId: "1:949551374839:web:249b1bdfc4105f26370ef2",
//   measurementId: "G-BGFZ612S24"
// })
// export default firebase