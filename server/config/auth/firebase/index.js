import { initializeApp } from "firebase/app";
import { getAuth, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import admin from 'firebase-admin';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase (for Authentication)
const appFirebase = initializeApp(firebaseConfig);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://send-otp-f1a27.firebaseapp.com"
});

// Express app setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// OTP verification endpoint
app.post('/verifyOtp', async (req, res) => {
  const { verificationId, otp } = req.body;

  // Check for required fields
  if (!verificationId || !otp) {
    return res.status(400).json({ error: "Invalid verificationId or OTP" });
  }

  const auth = getAuth(appFirebase);
  const credential = PhoneAuthProvider.credential(verificationId, otp);

  try {
    // Sign in with the OTP credential
    await signInWithCredential(auth, credential);
    return res.status(200).json({ message: "Successfully signed in with OTP" });
  } catch (error) {
    console.error("Error signing in with OTP:", error);
    return res.status(500).json({ error: "Failed to sign in with OTP", details: error.message });
  }
});

// Start the Express server
app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
