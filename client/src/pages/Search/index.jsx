import { Input } from "@/components/ui/input";
import { dataMovie, Movie, truncateText } from "../../hooks/GetApi/GetApi"
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Nav from "@/layout/Nav";
import { useTheme } from "../../context/Theme";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useThemeClasses } from "../../context/Theme/themeStyles";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import useDebounce from '@/hooks/GetApi/SearchOP'
import MovieController from "@/services/movie/Movie.controller";
import { TypingSearchEffect } from "@/lib/animationText";



const Search = () => {
    const themeCtx = useTheme()
    const {inputClasses,textClasses,buttonClasses,themeUniver} = useThemeClasses()
    const [text,setText] = useState(["avanger...","doctorstanger...","doremon..."])
    const [isValidtext,setIsValidtext] = useState(true)
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [isValid, setIsValid] = useState(true)
    const [isLoading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('');
    const debouncedSearch = useDebounce(search, 1000)
    // hanlde formik 
    useEffect(() => {
     setIsValid(true)
     setErrorMessage('')
    }, [search, setSearch, setErrorMessage])
    
    useEffect(() => {
     fetechData()
    }, [debouncedSearch])
    const fetechData = async () => {
        if (!debouncedSearch) return
        setLoading(true)
        setErrorMessage('')
        try {
            const reponse = await MovieController.searchMovie(debouncedSearch)
            console.log(reponse);
            
            // setData(reponse.data)
            if (reponse) {
                setData(reponse.data)
                setLoading(false)
            }
          
        } catch (error) {
          console.error('Error fetching movies:', error);
          setLoading(false)
            
        }
      }

    const handleKeyDown = (event) => {
        setIsValidtext(false)      
        if (event.key === 'Enter') {
            event.preventDefault()
            if (search.length === 0) { 
                // console.log(search.length);
                setErrorMessage("Please enter a search name movie")                
                setIsValid(false)
                setIsValidtext(true)
            } else {
                setIsValid(true)
                setErrorMessage('')
            }
        }
    }
 
    
  return (
        <div>
            <div className={`iphone-12-pro-max:flex flex flex-col   min-h-screen   overflow-scroll font-movie  pt-10 px-5 ${themeUniver}  `}>
                <div className="relative">
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <Input
                        //  {...register('name')}
                        // type="search"    
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}

                        // placeholder= {TypingSearchEffect({text})}
                        // ${inputClasses} ${!isValid ? 'border-red-500' : 'border-none'}
                        className={`w-full pl-10   outline-none py-7 z-20
                              ${inputClasses}
                              ${!isValid ? 'border-red-500 animate-shake' : 'border-none'}
                        `}
                    />

                    {/* amition text error scroll */}
                    <p className={`absolute top-[15px] left-[42px] text-gray-400 ${!isValidtext ? 'hidden' :'block'}`}>{TypingSearchEffect({text})}</p>
                 
                    <CiSearch
                        size={30}
                        className={`absolute top-3 left-2 ${textClasses}`}
                    />
                    
                    <div className=" ">
                        {/* <p className={` ${isValid ? 'hidden' : 'block animate-slide-out-bottom'}`}>as</p> */}
                    <p className={`${!isValid ? ' text-primary-textMovie animate-slide-in-bottom' :'' }`}>  {!isValid ? errorMessage :null}</p>
                    </div>
                  
                </div>
                {/* <div> */}
                    {!isLoading && data.length > 0 ? data.map((item) => (
                        <div key={item.id}>
                             <Link to={`/details/${item._id}`} state={{data:item}}>
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