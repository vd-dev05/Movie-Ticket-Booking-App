import { showErrorToast, showSuccessToast } from "@/lib/toastUtils";
import ManagerController from "@/services/manager/Manager.controller";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
const TicketBooking = () => {
    const [value, setValue] = useState("")
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const handleInputChange = (e) => {
        setValue(e.target.value);
    };
    useEffect(() => {
        const fetechData = async () => {
            try {
                const reponse = await ManagerController.getAllMovie()
                setData(reponse)
                console.log(reponse);

            } catch (error) {
                console.log(error);
            }
        }
        fetechData()
    }, [isLoading, setIsLoading])

    // useEffect(() => {
    //     ( async () => {
    //         try {
    //             const reponse = await ManagerController.searchMovieCreateId(value)
    //             const dataReponse = reponse.movieId
    //             setData({
    //                 ...data,
    //                 dataReponse
    //             })
    //             console.log(data);

    //          } catch (error) {
    //             console.log(error);
    //          }
    //     })()

    // }, [isLoading,setIsLoading])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const reponse = await ManagerController.createMovie(value)
            if (reponse.status === 201) {
                console.log(reponse);

                showSuccessToast(reponse.data)
                setIsLoading(true)
            }
            if (reponse.status === 403) {
                showErrorToast(reponse.data.error)
            }

        } catch (error) {

        }
        // const reponse = await  ManagerController.searchMovieId(value)
        // if (reponse) {

        // }
    }
    // fomat text length title
    const truncateText = (text, length) => {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        }
        return text;
    };
    return (
        <div className="pl-10 sm:pl-0">
            <h2>Create Ticket Seats</h2>
            <div className="flex gap-2">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-[500px] h-10 outline-none p-2 rounded-lg text-xs"
                        placeholder="Enter your id movie"
                        value={value}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="bg-blue-400  h-10 text-xs text-white">Create Seats </button>
                </form>

            </div>
            <div className="mt-10 grid grid-cols-5 gap-4 ">
                {data.length ? data.map((item) => {
                    return (
                        <div key={item._id} className="w-50 h-50 drop-shadow-lg bg-white rounded-lg cursor-pointer  ">
                            <div className="group  relative " >
                                <Link to={`/manager/qrcode/${item._id}`}>
                                    <img
                                        className="rounded-t-lg w-full object-cover h-[130px]"
                                        src={item.poster} alt={item.title}
                                    />
                                    <p className="p-2 absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-xs">{(item.title)}</p>

                                </Link>
                            </div>
                            <span className="flex p-2">
                                <MdDeleteForever size="10px" className=" bg-red-600 text-white w-7 h-7 rounded-sm text-nowrap" />
                                Delete seats Movie
                            </span>

                        </div>
                    )
                }) : <div>No Film Create </div>}
            </div>

        </div>
    );
}

export default TicketBooking;