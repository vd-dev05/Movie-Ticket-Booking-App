
import { createContext, useContext, useState, useEffect } from 'react';


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const themes = ['light', 'dark', 'universi'];
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [color, setColor] = useState(localStorage.getItem('color') || 'white');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        localStorage.setItem('color', color);
    }, [theme, color]);

    const value = { theme, setTheme, color, setColor, themes };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
