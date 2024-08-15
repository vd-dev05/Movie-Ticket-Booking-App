// src/components/Layout/Product/GetApi/GetContext.jsx
import { createContext, useContext,useState } from 'react';

const UserContext = createContext();

export const UseContext = UserContext; 
export const UserProvider = ({ children }) => {
    const [dataUser, setDataUser] = useState({ 
        user: '', 
        phone: '',
        email:"",
        total:"",
        loveMovie:[],
        dataComent:[],
        card: {
            name:"",
            numberCard:"",
            date:"",
            cvv:""
        },
        dataTicket:[],
    });

    return (
        <UserContext.Provider value={{ dataUser, setDataUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext); 




// export const UserProvider = ({ children }) => {
//   const [dataUser, setDataUser] = useState({ user: '', age: '' });

//   useEffect(() => {
//       const fetchData = async () => {
//           try {
//               const docRef = doc(db, 'users', 'user-id'); // Thay "user-id" bằng ID người dùng thực tế
//               const docSnap = await getDoc(docRef);

//               if (docSnap.exists()) {
//                   setDataUser(docSnap.data());
//               } else {
//                   console.log('No such document!');
//               }
//           } catch (error) {
//               console.error('Error fetching document: ', error);
//           }
//       };

//       fetchData();
//   }, []);

//   useEffect(() => {
//       const updateFirestore = async () => {
//           try {
//               await setDoc(doc(db, 'users', 'user-id'), dataUser); // Cập nhật Firestore
//           } catch (error) {
//               console.error('Error updating document: ', error);
//           }
//       };

//       updateFirestore();
//   }, [dataUser]);

//   return (
//       <UserContext.Provider value={{ dataUser, setDataUser }}>
//           {children}
//       </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);