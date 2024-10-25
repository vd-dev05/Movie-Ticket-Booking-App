import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useTheme } from '@/context/Theme/index'
const Home = () => {
  const themeCtx = useTheme()
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
          navigate('/login');
        }, 1000);
        return () => clearTimeout(timer);
      }, [navigate]);
    return (
    <div className={` iphone-12-pro-max:flex flex justify-center items-center h-[100vh] ${themeCtx.theme == "dark" ? "bg-black" : "bg-white"}`} >
        <img src="/assets/img/logo.png"  alt="" />
    </div>
    );
}

export default Home;
