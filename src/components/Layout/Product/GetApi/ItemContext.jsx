// ItemContext.js
import React, { createContext, useContext, useState } from 'react';

// Tạo context
const ItemContext = createContext();

// Tạo provider
export const ItemProvider = ({ children }) => {
    const [item, setItem] = useState(null);

    return (
        <ItemContext.Provider value={{ item, setItem }}>
            {children}
        </ItemContext.Provider>
    );
};

// Hook để sử dụng context
export const useItem = () => useContext(ItemContext);
