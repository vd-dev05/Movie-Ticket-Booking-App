import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
          navigate('/login');
        }, 1000);
        return () => clearTimeout(timer);
      }, [navigate]);
    return (
    <div className="iphone-12-pro-max:flex flex justify-center items-center h-[100vh] " >
        <img src="/src/assets/img/logo.png"  alt="" />
    </div>
    );
}

export default Home;
