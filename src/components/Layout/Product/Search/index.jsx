import { Input } from "@/components/ui/input";
import { Movie, truncateText, Mobile } from "../GetApi/GetApi"
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Nav from "../../Nav";
import { useTheme } from "../../Theme";
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';

const Search = () => {
    // const schema = z.object({
    //     name: z.string().min(1, { message: 'Ko đúng với tự' }),
    //     age: z.number().min(10,{ message: 'Ko đúng với số tuôi lớn 10' }),
    // });
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm({
    //     resolver: zodResolver(schema),
    // });

    const themeCtx = useTheme()
    const [data, setMovieData] = useState([])
    const [search, setSearch] = useState("")
    const [isValid, setIsValid] = useState(true)
    useEffect(() => {
        const getMovies = async () => {
            const data = await Mobile
            setMovieData(data)
        }


        getMovies()
    }, [search]);
    const filter = data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            // const item = data.map((item) => item.title).filter((el) => el.toLowerCase().includes(search.toLowerCase()))
            // if (item != search) {
            //     setIsValid(false)
            // }
            const item = data.map((item) => item.title).filter((el) => el.toLowerCase().includes(search.toLowerCase()))
            if (item != search) {
                setIsValid(false)
            } else {
                setIsValid(true)
            }
        }


    }
    return (
        <div>
            {/* <form onSubmit={handleSubmit((d) => console.log(d))}>
                <input {...register('name')} />
                {errors.name?.message && <p>{errors.name?.message}</p>}
                <input type="number" {...register('age', { valueAsNumber: true })} />
                {errors.age?.message && <p>{errors.age?.message}</p>}
                <input type="submit" />
            </form> */}
        <div>
            <div className={`iphone-12-pro-max:flex flex flex-col  iphone-12:w-[390px]   font-movie  pt-10 px-5 ${themeCtx.theme == 'dark' ? 'bg-dark-bg' : 'bg-[#f5f5f5]'} ${filter.length === 0 ? 'h-[200vw]' : 'h-full'}  `}>
                <div className="relative">

                    <Input

                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}

                        placeholder="Search"
                        className={`w-full pl-10  outline-none py-7 ${themeCtx.theme == 'dark' ? "bg-[#1a1414] text-white " : 'bg-[#fafafa]'} ${!isValid ? 'border-red-400' : 'border-hidden'}`}
                    />
                    {!isValid ? <p className="mt-2 ml-2 text-sm text-red-500 ">Tên phim không tồn tại trên hệ thống </p> : null}
                    <CiSearch
                        size={30}
                        className={`absolute top-3 left-2 ${themeCtx.theme == 'dark' ? "text-white" : 'text-black'}`}
                    />
                    {/* {movieSearch.length > 0 && movieSearch.map((item) => console.log(item.title))  } */}
                    {/* {movieSearch == null ? ("error") : movieSearch.map((item) => (<p>{item.title}</p>))} */}
                </div>
                <div className=" ">
                    {filter.length > 0 ? filter.map((item) => (
                        <div>
                            <div key={item.id} className={`flex-shrink-0 w-[calc(100% / 3)] pr-2 mt-10 flex  rounded-3xl p-5 ${themeCtx.theme == 'dark' ? 'bg-btn-dark text-light-bg' : 'bg-white'}`}>
                                <div className="">
                                    <img
                                        src={item.poster}
                                        alt={item.Title}
                                        loading="lazy"
                                        className="rounded-xl h-[100px] w-[100px] bg-contain object-cover "
                                    />
                                </div>
                                <div className="flex flex-col justify-around pl-6">
                                    <h2 className="font-[700] text-xl">{truncateText(item.title, 18)}</h2>
                                    <p className="text-gray-400 text-xs">{item.theFirm}</p>
                                    <p className="text-xs">Language:{item.language}</p>
                                </div>

                            </div>
                            {/* "border shadow rounded-md p-4 max-w-sm w-full mx-auto" */}

                        </div>
                    )) : <div class={`flex-shrink-0 w- pr-2 mt-10 flex  rounded-3xl p-5 ${themeCtx.theme == 'dark' ? 'bg-btn-dark text-light-bg' : 'bg-white'}`}>
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