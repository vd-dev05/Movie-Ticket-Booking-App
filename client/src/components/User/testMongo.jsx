import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth, PhoneAuthProvider, RecaptchaVerifier, signInWithCredential } from 'firebase/auth';
// import { app } from '../Layout/firebase/firebase';

export const TestMongo = () => {
  const [messages, setMessages] = useState(null);
  const [data, setData] = useState(null);
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);


  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:1000/login');
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Push data to the server
  const test = async () => {
    const response = await axios.post('http://localhost:1000/', {});
    console.log(response);
  };

  // Register a new user
  const testPost = async () => {
    const response = await axios.post('http://localhost:1000/register', {
      email: 'admin12@example.com',
      password: 'admin@123',
      password2: 'admin@123',
      roles: 'user',
    });
    console.log(response);
  };

  // Login the user
  const Login = async () => {
    const response = await axios.post('http://localhost:1000/login', {
      email: 'admin12@example.com',
      password: 'admin@123',
    });
    console.log(response);
  };

  // Fetch movie data
  const Movie = async () => {
    const response = await axios.get('http://localhost:1000/api/v1/movie');
    setData(response.data.items);
  };

  return (
    <div>
      <h1>Test Mongo</h1>
      
      <button onClick={test}>Click Push Server</button>
      <button onClick={testPost}>Push Server Hash</button>
      <button onClick={Login}>Login Server</button>
      <button onClick={Movie}>Fetch Movie</button>

      {/* Display movie posters */}
      {data && data.map((item) => (
        <div key={item.id}>
          <img src={item.poster} alt={item.title} />
        </div>
      ))}

      {/* Display messages */}
      {messages && <pre>{JSON.stringify(messages, null, 2)}</pre>}

      {/* OTP input */}
      {/* <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        placeholder="Enter OTP"
      />
       */}
      {/* reCAPTCHA container */}
      <div id="recaptcha-container"></div>

      <button onClick={onSendOtp}>Send OTP</button>
      <button onClick={onVerify}>Verify OTP</button>
    </div>
  );
};
