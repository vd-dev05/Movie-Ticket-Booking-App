// src/App.jsx
// import React from 'react';

import RouteMovie from "@/routes/appMovie.routes.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "./context/Theme";
import { UserProvider } from "./context/User";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RootManager from "./routes/appManager.routes";
import { ItemProvider } from "./hooks/GetApi/ItemContext";
const App = () => {

    return (
        <div className=''>
            <ThemeProvider>
                <UserProvider>
                    < ItemProvider>
                    
                    <RouteMovie />
                    </ItemProvider>
                </UserProvider>
                <RootManager/>
            </ThemeProvider>
                 <ToastContainer />
        </div>
    );
};

export default App;
