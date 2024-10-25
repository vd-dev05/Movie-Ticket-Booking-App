import { Input } from "@/components/ui/input";
import { dataMovie, Movie, truncateText } from "../../../../hooks/GetApi/GetApi"
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Nav from "../../../common/Nav";
import { useTheme } from "../../../../context/Theme";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useThemeClasses } from "../../../../context/Theme/themeStyles";
import { Link } from "react-router-dom";
import useDebounce from '@/hooks/GetApi/SearchOP'
const Search = () => {
    const schema = z.object({
        name: z.string().min(1, { message: 'Required' }),
        // age: z.number().min(10),
      });
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
      });

    const themeCtx = useTheme()
    const {inputClasses,textClasses,buttonClasses,themeUniver} = useThemeClasses()
    
    const [data, setMovieData] = useState([])
    const [search, setSearch] = useState("")
    const [isValid, setIsValid] = useState(true)
    const [isLoading,setisLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('');
    const debouncedSearch = useDebounce(search, 1000)
    
    useEffect(() => {
        (async () => {
            try {
                const data = await dataMovie('data/movies'); 
                if (data) {

                setMovieData(data)
                setisLoading(true)
                }
            } catch (err) {
                console.error(err);
            } finally {
                setisLoading(false);
            } }
        )()
        if (search) {
            setIsValid(true)
        }
    }, [search]);

    useEffect(() => {
        // console.log(debouncedSearch.length);
        
        if (debouncedSearch.length === 0) {
            setIsValid(false);
            setErrorMessage("Nhập tên phim");
            return;
        }

        const item = data.filter((el) => el.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
        // console.log(item);
        setMovieData(item)

        if (item.length > 0) {
            setIsValid(true);
        } else {
            setIsValid(false);
            setErrorMessage("Tên phim không tồn tại hệ thống");
        }
        
        // console.log(search.trim());
        
        setTimeout(() => {
            setErrorMessage('');
            setIsValid(true);
        }, 3000);
    }, [debouncedSearch, data,search]);
    // const filter = data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setSearch(event.target.value);
            // console.log(search);
            console.log(debouncedSearch);
            
        }
    };
    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault();
           
    //         //  console.log(search.length);
    //         if (search.length === 0 ) {
    //             // console.log(0);
    //             setIsValid(false)
    //             setErrorMessage("Nhập tên phim")
    //             return 
    //         }
    //         const item = data.filter((el) => el.title.toLowerCase().includes(search.toLowerCase()))

    //         if (item.length > 0) {
    //            setIsValid(true)
    //         }    
    //          else {
    //             setIsValid(false)
    //             setErrorMessage("Tên phim không tồn tại hệ thống")
    //             return
    //         }

    //         setTimeout(() => {
    //             setErrorMessage('')
    //            setIsValid(true)
    //         }, 2000);
        
        
    //     }
        
    // }
    // if (isLoading) {
    //     return<div>Loading...</div>
    // }
    return (
        <div>

        <div>
            <div className={`iphone-12-pro-max:flex flex flex-col   min-h-screen   overflow-scroll font-movie  pt-10 px-5 ${themeUniver}  `}>
                <div className="relative">
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <Input
                        //  {...register('name')}
                        // type="search"
                        // value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}

                        placeholder="Search"
                        className={`w-full pl-10  outline-none py-7  ${inputClasses} ${!isValid ? 'border-red-500' : 'border-none'}`}
                    />
                    <p className="text-primary-textMovie animate-pulse">  {!isValid ? errorMessage :null}</p>
                  
                    <CiSearch
                        size={30}
                        className={`absolute top-3 left-2 ${textClasses}`}
                    />

                </div>
                <div className="  ">
                    {!isLoading && data.length > 0 ? data.map((item) => (
                        <div>
                             <Link to={'/itemLove'} state={{data:item}}>
                             <div key={item.id} className={`flex-shrink-0 w-[calc(100% / 3)] pr-2 mt-10 flex  rounded-3xl p-5 ${buttonClasses}`}>
                               
                               <div className="">
                                   <img
                                       src={item.poster}
                                       alt={item.Title}
                                       loading="lazy"
                                       className="rounded-xl h-[100px] w-[100px] bg-contain object-cover "
                                   />
                               </div>
                               <div className="flex flex-col justify-around pl-6">
                                   <h2 className="font-[700] text-xl" >{truncateText(item.title, 15)}</h2>
                                   <p className="text-gray-400 text-xs">{item.theFirm}</p>
                                   <p className="text-xs">Language:{item.language}</p>
                               </div>

                           </div>
                                </Link>
                           


                        </div>
                    )) : <div class={`flex-shrink-0 w- pr-2 mt-10 flex  rounded-3xl p-5 ${buttonClasses}`}>
                        <div class="animate-pulse flex space-x-4">
                            <div class="rounded-xl bg-slate-700 h-[100px] w-[100px]"></div>
                            <div class="flex-1 space-y-6 py-1">
                                <div class="h-2 bg-slate-700 rounded w-[200px]"></div>
                                <div class="space-y-10">
                                    <div class="grid grid-cols-3 gap-4">
                                        <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                                        <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                                    </div>
                                    <div class="h-2 bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>}

                </div>

            </div>
            <div className="fixed bottom-0 w-full">
                <Nav data={"search"}></Nav>
            </div>
        </div>
        </div>

    );
}

export default Search;