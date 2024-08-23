import { useEffect, useState } from "react";
import { Movie, truncateText,dataMovie } from "../GetApi/GetApi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Review from "./accept/Review";
import { useThemeClasses } from "../../Theme/themeStyles";
const Past = () => {
    const [data, setMovieData] = useState([])

    const [starReveiew, setRatingandReview] = useState({
        rating:0,
        review:"",
        id:0
    });
    const handleSubmit = () => {
        // const test = confirm("Xác nhânj đánh giá")
        //    console.log(test);
        console.log(starReveiew);
        
        if (starReveiew.id == 1 ) {
            console.log("Xóa thành công");
            
        }
        // if (test == true) alert("")
    }
    const { inputClasses, backGround, textClasses,themePaid,themePaidDone } = useThemeClasses();
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await dataMovie('data/movies'); 
                if (data) {
                setMovieData(data);
                }
            } catch (err) {
                console.error(err);
            } 
        };
        // if (starReveiew) {
        //     console.log("Đánh giá thành công");
            
        // }
        console.log(starReveiew);
        

        fetchMovies();
    }, []);
    return (
        <div className="  font-movie  drop-shadow-lg pb-[50px]">
            {data.map((itenm) => (
                <div className={`mt-5 flex flex-col rounded-lg ${backGround}`}key={itenm.id} >
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
                        <Link className="w-full">
                                <Review data={itenm} text="Write a review" onSubmit={handleSubmit}  key={itenm.id} setRatingandReview={setRatingandReview} starReveiew={starReveiew}  ></Review>
                        </Link>



                    </div>


                </div>
            ))}
        </div>
    );
}

export default Past;