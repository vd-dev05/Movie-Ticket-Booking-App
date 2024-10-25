import React, { useEffect, useState } from 'react'
import axios from 'axios'
export const TestMongo = () => {
    const [ messages,setMessages] = useState(null)
    const [ isTrue,setIsTrue] = useState(true)
    const [ data,setData] = useState(null)
    // useEffect(() => {
    //     const fetch = async () => {
    //         try {
    //             const reponse = await axios.get('http://localhost:1000')
    //             const rmessage = await axios.post('http://localhost:1000/login')
    //             const register = await axios.post('http://localhost:1000/register')
    //             console.log(register);
                
    //             console.log(rmessage.data.message);
                
    //             // const data = await reponse.json()
    //             console.log(reponse.data.items);
                
    //         } catch (error) {
    //             console.log(error.message);
                
    //         }
        
    //     }
    //     fetch();
    // }, [isTrue])
    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:1000/login');
            console.log(response);
            
            // console.log(response.data.items);
            // setMessages(response.data.items); // Store messages
        } catch (error) {
            console.log(error.message);
        }
    };
    const test =  async () => {
        // const data = {
        //     userName :'admin',
        //     password: 'admin@123',
        //     email: 'admin@gmail.com',
        //     role: 'admin',
        //     status: true,
        //     created_at: new Date(),
        //     updated_at: new Date(),
        // }
        const response = await axios.post('http://localhost:1000/', {
            // data: data,
        })
        console.log(response);
    }
    const testPost = async () => { 
        const response = await axios.post('http://localhost:1000/register', {
            email : 'admin12@example.com',
            password : 'admin@123',
            password2 : 'admin@123',
            roles : 'user'
        })
        // console.log(response);
    }
    const Login = async () => { 
        const response = await axios.post('http://localhost:1000/login', {
            email : 'admin12@example.com',
            password : 'admin@123'
        })
        // await fetchData();
        // setIsTrue(false)
        // console.log(response);
    }
    const Movie = async () => {
        // const responseGet = await axios.post('http://localhost:1000/api/v1/movie', {
        //     limit :30
        // });
        const response = await axios.get('http://localhost:1000/api/v1/movie', {
          
        });
        // console.log(response.data.items);
        // setMessages(response.data) // Store messages
        setData(response.data.items)
        // console.log(data[0].poster);
        
    }
  return (
    <div>
        testMongo
    <button onClick={test}>Click Push Server </button>
    <button onClick={testPost}>Push Server Hash </button>
    <button onClick={Login}>Login Server </button>
    <button onClick={Movie} >Fetech Movie</button>
    {/* <img src={data ? data[0].poster : null} alt="" /> */} {
        data ? data.map((item) => {
            // console.log(item);
            return (
                <div key={item.id}>
                    <img src={item.poster} alt="" />
                </div>
            )
        }): null
    }
    {messages}
    </div>
  )
}
