import { useEffect, useState } from "react";
import { Movie, truncateText, dataMovie } from "../../../../hooks/GetApi/GetApi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Review from "./accept/Review";
import { useThemeClasses } from "../../../../context/Theme/themeStyles";
import updateDataBase from "../../../../hooks/GetApi/PostRating";
// import { get, ref } from "firebase/database";
// import { database } from "@/components/firebase/firebase";
import updateBookingStatus from '@/hooks/GetApi/GetRemoveData'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Past = () => {
    const [data, setMovieData] = useState([])

    const [starReveiew, setRatingandReview] = useState({
        rating: 0,
        review: "",
        id: 0
    });
    const [isOpen, setIsOpen] = useState(false)
    const [props, setProps] = useState([])
    const [dataLoad,setDataLoad] = useState(false)
    const handleData = (itenm) => {
        // console.log(itenm);
        setProps(itenm)
    }

    const handleSubmit = async () => {
       
        try {
            const refData = 'data/movies'
            const refPost = 'data/movies/'
            await updateDataBase(refData, refPost, starReveiew.id, {
                rate: starReveiew.rating,
                review: starReveiew.review

            })
            await updateBookingStatus(starReveiew.id, {
                past: true
            })
           
            setDataLoad(!dataLoad)
            setRatingandReview('')
            // alert("done")
            // toast.success('Review Successful! Thank you <3');
        } catch (error) {
            console.log(error);
            toast.error('An error occurred. Please try again.');

        }
    }
    if (dataLoad) {
        toast.success('Review SuccessFull ! Thank you <3')
    }
    const { inputClasses, backGround, textClasses, themePaid, themePaidDone, buttonClasses, btnSubmit } = useThemeClasses();
    useEffect(() => {
        const fetech = async () => {
            try {
                const data = await dataMovie('users/dataTicket/book');
                // console.log(data);
                const dataTic = data.filter((item => item.paid == true))
               
                setMovieData(dataTic)

            } catch (err) {
                console.error(err);
                toast.error('An error occurred. Please try again.');

            }
        }
       fetech()
      
    }, [dataLoad]);
    const test = async () => {
        // console.log(data);
        
        // const userRefData = ref(database, '/data/movies');
        // // console.log(userRefData);

        // const dataBook = await get(userRefData) 
        // let arrBook = dataBook.exists() ? dataBook.val() :[];
        // if (arrBook.some(item => item.id === starReveiew.id) ) {

        //     // console.log(arrBook);

        // }
        // console.log(starReveiew);

        // console.log(arrBook);
    }

    return (
        <div className="  font-movie  drop-shadow-lg pb-[50px] h-screen ">
                {data.length === 0 &&
                <div class={`flex-shrink-0 w- pr-2 mt-10 flex    rounded-3xl p-5 ${buttonClasses}`}>
                    <div class="animate-pulse flex space-x-4">
                        <div class="rounded-xl bg-slate-700 h-[100px] w-[100px]"></div>
                        <div class="flex-1 space-y-6 py-1">
                            {/* <div class="h-2 bg-slate-700 rounded w-[200px]"></div> */}
                            <div class="space-y-10">
                                No Data Ticket . Please Book Ticket Movie
                            </div>
                        </div>
                    </div>
                </div>
            }
            {data.map((itenm, idx) => (
                <div className={`mt-5 flex flex-col rounded-lg ${buttonClasses}`} key={itenm.id} >
                    <Review data={props} isOpen={isOpen} setIsOpen={setIsOpen} key={itenm.id} onSubmit={handleSubmit} setRatingandReview={setRatingandReview} starReveiew={starReveiew}  ></Review>

                    <div className=" flex justify-between p-2 ">
                        <div className="flex ">
                            <img src={itenm.poster} alt="" className="w-[120px] h-[100px] rounded-lg object-cover " />
                            <div>
                                <div className="pl-5 flex flex-col h-full justify-around">
                                    <h2 className="font-movie font-bold text-nowrap">{truncateText(itenm.title, 15)}</h2>
                                    <p className="text-gray-400 text-[11px]  text-nowrap">{itenm.theFirm}</p>
                                    <p className="text-[11px] ">Language: {itenm.language}</p>
                                </div>
                            </div>
                        </div>

                        <div className={` h-8 w-14 flex justify-center  items-center mt-12 rounded-md ${themePaid} `}>
                            <Link className={`${themePaidDone}`}>
                                Paid
                            </Link>

                        </div>
                    </div>
                    <div className="p-2 flex gap-2 w-full justify-between">
                        <Link className={` border-1 w-full ${textClasses}`}>
                            <Button
                                className="border-gray-300  w-full"
                            >View Details</Button>
                        </Link>
                        {itenm.past ? <button
                            onClick={() => {
                                handleData(itenm)
                                setIsOpen(!isOpen)

                                // console.log(isOpen);
                                // console.log(itenm);

                            }}
                            className={`${btnSubmit} w-full h-10 text-nowrap rounded-lg`}                      >
                            Edit a review

                        </button>
                            : <button
                                onClick={() => {
                                    handleData(itenm)
                                    setIsOpen(!isOpen)

                                    // console.log(isOpen);
                                    // console.log(itenm);

                                }}
                                className={`${btnSubmit} w-full h-10 text-nowrap rounded-lg`}                      >
                                Write a review

                            </button>
                        }




                    </div>


                </div>
            ))}
        </div>
    );
}

export default Past;