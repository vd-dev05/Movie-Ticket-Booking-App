import { useEffect, useState } from "react";
import { Movie, truncateText } from "../GetApi/GetApi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Review from "./accept/Review";
const Past = () => {
    const [data, setMovieData] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await Movie();
                setMovieData(data);
                // console.log(data);
            } catch {
                console.log("error");
            }
        };

        getMovies();
    }, []);

    const [data1, setMovieData1] = useState([])
   
    const clickme = (id) => {
        setMovieData1(id)

}
    // console.log(data1);
    // if (data1 == null ) {
    //     setMovieData1(id)
    // }
  
    // console.log(data1);
    
    // console.log(data1);
    // alert(data1)
    

    return (
        <div className="  font-movie  drop-shadow-lg">
            {data.map((itenm) => (
                <div className="mt-5 flex flex-col rounded-lg bg-gray-50 " key={itenm.id}>
                    <div className=" flex justify-between p-2 ">
                        <div className="flex ">
                            <img src={itenm.poster} alt="" className="w-[120px] h-[100px] rounded-lg object-cover " />
                            <div>
                                <div className="pl-5 flex flex-col h-full justify-around">
                                    <h2 className="font-movie font-bold text-nowrap">{truncateText(itenm.title, 15)}</h2>
                                    <p className="text-gray-500 text-[11px]  text-nowrap">{itenm.theFirm}</p>
                                    <p className="text-[11px] ">Language: {itenm.language}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#fff0ef] h-8 w-14 flex justify-center items-center mt-12 rounded-md">
                            <Link className="text-chairMovie-chairSelected">
                                <Button

                                > Paid</Button>
                            </Link>

                        </div>
                    </div>
                    <div className="p-2 flex gap-2">
                        <Link className=" border-1 w-full text-black">
                            <Button
                                className="border-gray-300  w-full"
                            >Cancel Booking</Button>
                        </Link>
                        <Link>
                        <div
                                key={itenm.id}
                                onClick={() => clickme(itenm)
                                
                                }
                                    className=" bg-chairMovie-chairSelected text-white w-full h-10 text-nowrap rounded-lg "
                                ><Review data={data1} text="Write a review"  key={itenm.id} ></Review></div>
                            {/* {data.map((item) => 
                            (

                                
                                <Button 
                                key={item.id}
                                    onclick={clickme}
                                    className=" bg-chairMovie-chairSelected text-white w-full "
                                ><Review ></Review></Button>
                            )
                        )
                            }
 */}

                        </Link>



                    </div>


                </div>
            ))}
        </div>
    );
}

export default Past;