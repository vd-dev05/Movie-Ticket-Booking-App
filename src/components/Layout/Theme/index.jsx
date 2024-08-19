// import { createContext,useContext,useState,useEffect } from 'react';
// const ThemeContext = createContext()
// export const ThemeProvider = ({ children }) => {
//     const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
//     const [color,setColor] = useState(localStorage.getItem('color') || 'white');
//     useEffect(() => {
//         localStorage.setItem('theme', theme);
//         localStorage.setColor('color', color);
//     }, [theme,color]);
// // giá trị mặc định

//     // const value = { theme, setTheme };

//     return (
//         <ThemeContext.Provider value={{ theme, setTheme,setColor,color }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export const useTheme = () => useContext(ThemeContext);
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [color, setColor] = useState(localStorage.getItem('color') || 'white');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        localStorage.setItem('color', color);
    }, [theme, color]);

    const value = { theme, setTheme, color, setColor };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
