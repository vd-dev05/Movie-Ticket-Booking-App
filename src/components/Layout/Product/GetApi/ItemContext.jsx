
// import React, { createContext, memo, useContext, useState } from 'react';
// import { useMemo } from 'react';
// // Tạo context
// const ItemContext = createContext();

// // Tạo provider
// export const ItemProvider =  ({ children }) => {
//     const [item, setItem] = useState([]);

//     return (
//         <ItemContext.Provider value={{ item, setItem }}>
//             {children}
//         </ItemContext.Provider>
//     );
// } ;

// // Hook để sử dụng context
// export const useItem = () => useContext(ItemContext);


import React, { createContext, memo, useCallback, useContext, useState } from 'react';
import { useMemo } from 'react';

const ItemContext = createContext();


export const ItemProvider =  ({ children }) => {
    const [item, setItem] = useState({
        // user: '', 
        // phone: '',
        // email:"",
        // total:"",
        // loveMovie:[],
        // dataComent:[],
        // card: {
        //     name:"",
        //     numberCard:"",
        //     date:"",
        //     cvv:""
        // },
        // user:"name",
        dataTicket:[],
        userTest:[],
    });
    // const updateItem = useCallback((newItem) => {
    //     setItem(prevItems => [...prevItems, newItem]);
    // }, []);
    // const value = useMemo(() => ({ item, updateItem }), [item, updateItem]);
    return (
        <ItemContext.Provider value={{ item, setItem }}>
            {children}
        </ItemContext.Provider>
    );
} ;


export const useItem = () => useContext(ItemContext);
