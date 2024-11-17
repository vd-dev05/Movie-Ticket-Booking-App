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
import { Link, useLocation, useSearchParams } from "react-router-dom";
import useDebounce from '@/hooks/GetApi/SearchOP'
import MovieController from "@/controller/movie/getMovie.controller";
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
    // test 
    //  search qery react-route-dom
    const [searchParams,setSearchParams] = useSearchParams()
    const seacrchTerm = searchParams.get('search_query') || ''
    const debouncedSearch = useDebounce(seacrchTerm, 1000)
     
    // set search query 
    useEffect(() => {
         if (debouncedSearch) {
            setSearchParams({search_query : debouncedSearch})
         }
    }, [debouncedSearch,searchParams])

    //  set search data to server 
    useEffect(() => {
      const fetchData = async () => {
        try {
            setisLoading(true)
            const reponse = await MovieController.searchMovie(debouncedSearch)
            console.log(reponse);
            
            if (reponse.success === true) {
                setMovieData(reponse.data )
                setIsValid(reponse.data.length > 0)
            }
            
            // if (reponse) {

            // }
        } catch (error) {
            console.error(error); 
            setIsValid(false); 
            setErrorMessage("Error fetching data.");
        } finally {
            setisLoading(false);
        }
      }
      fetchData()
      if (debouncedSearch) { fetchData(); } else { setIsValid(false); setErrorMessage("Nhập tên phim"); }
    }, [debouncedSearch])
    
    
    // const location = useLocation();
    //   useEffect(() => {
    //     (async () => {
        
    //                 try {
    //                     const data = await MovieController.searchMovie( debouncedSearch); 
    //                     if (data) {
    //                     console.log(data.data);
                        
    //                     setMovieData(data.data)
    //                     setisLoading(false)
    //                     }
    //                 } catch (err) {
    //                     console.error(err);
    //                 } finally {
    //                     setisLoading(false);
    //                 } }
    //             )()
    //   }, [debouncedSearch])
      

    // 

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const data = await MovieController.searchMovie(search); 
    //             if (data) {

    //             setMovieData(data)
    //             setisLoading(true)
    //             }
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             setisLoading(false);
    //         } }
    //     )()
    //     if (search) {
    //         setIsValid(true)
    //     }
    // }, [search]);

    // useEffect(() => {
    //     const item = data.filter((el) => el.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
    //     console.log(item);
    //     // setMovieData(item)

    //     if (item.length > 0) {
    //         setIsValid(true);
    //     } else {
    //         setIsValid(false);
    //         setErrorMessage("Tên phim không tồn tại hệ thống");
    //     }
    //     setTimeout(() => {
    //         setErrorMessage('');
    //         setIsValid(true);
    //     }, 3000);
    // }, [debouncedSearch, data,search,seacrchTerm]);
    // const filter = data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    const handleKeyDown = (event) => {
        // if (debouncedSearch.length === 0 ) {
        //     setIsValid(false);
        //     setErrorMessage("Nhập tên phim");
        //     return;
        // }
        if (event.key === 'Enter') {
            event.preventDefault();
            setSearch(event.target.value);
            // console.log(search);
            if (search) {
                // seacrchTerm = search.toLowerCase()
                setSearchParams({ search_query: event.target.value })
            } else {
                setSearchParams('')
            }
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
    // reload page 
    // check url image 
  
    // checkImage("https://m.media-amazon.com/images/M/MV5BODY5MGYxYjQtNzIwZS00NTUwLWJlOGEtZjkwOGY0M2FiODViXkEyXkFqcGdeQXVyNTM5NzI0NDY@._V1_SY1000_SX677_AL_.jpg")
    return (
        <div>
            <div className={`iphone-12-pro-max:flex flex flex-col   min-h-screen   overflow-scroll font-movie  pt-10 px-5 ${themeUniver}  `}>
                <div >
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
                {/* <div> */}
                    {!isLoading && data.length > 0 ? data.map((item) => (
                        <div key={item.id}>
                             <Link to={'/itemLove'} state={{data:item}}>
                             <div key={item.id} className={`flex-shrink-0 w-[calc(100% / 3)] pr-2 mt-10 flex  rounded-3xl p-5 ${buttonClasses}`}>
                               
                               <div className="">
                                   <img
                                       src={item.poster }
                                       alt={item.title}
                                       loading="lazy"
                                       className="rounded-xl h-[100px] w-[100px] bg-contain object-cover "
                                   />
                               </div>
                               <div className="flex flex-col justify-around pl-6">
                                   <h2 className="font-[700] text-xl" >{truncateText(item.title, 15)}</h2>
                                   <p className="text-gray-400 text-xs">{item.tomatoes && item.tomatoes.production ? item.tomatoes.production : 'hang phim ko ton tai' }</p>
                                   <p className="text-xs">Language:{item.countries.join(', ')}</p>
                               </div>

                           </div>
                                </Link>
                           


                        </div>
                    )) :  <div className={`flex-shrink-0 w- pr-2 mt-10 flex  rounded-3xl p-5 ${buttonClasses}`}>
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-xl bg-slate-700 h-[100px] w-[100px]"></div>
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-2 bg-slate-700 rounded w-[200px]"></div>
                                <div className="space-y-10">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                {/* </div> */}

            </div>
            <div className="fixed bottom-0 w-full">
                <Nav data={"search"}></Nav>
            </div>
        </div>
    

    );
}

export default Search;