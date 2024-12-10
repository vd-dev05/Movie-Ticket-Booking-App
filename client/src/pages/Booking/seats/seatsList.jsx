import { useTheme } from "@/context/Theme";
import { generateSeats } from "@/lib/createSeats";
import { decodeString } from "@/lib/encode";
import { showErrorToast } from "@/lib/toastUtils";
import MovieController from "@/services/movie/Movie.controller";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { MdChair } from "react-icons/md";
import { useLocation } from "react-router-dom";

const SeatList = ({ count, onSeatsUpdate, startIndex, setTotalTicket }) => {
    const [seats, setSeats] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const theme = useTheme();
    const location = useLocation();
    const movieId = location.pathname.split('/')[2];

    const ok = decodeURIComponent(decodeString(location.search.split('?')[1],import.meta.env.VITE_SECRET_KEY))

    const { sellerId } = queryString.parse(ok);

    
    
    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const response = await MovieController.getBookingSeats(movieId,sellerId); 
                const data = generateSeats(count, startIndex, response); 
                if (data && response) {
                    setSeats(data);
                    setIsLoading(false);  
                }
            } catch (error) {
                console.error("Error fetching booking data", error);
                setIsLoading(false);  
            }
        };

        fetchBookingData(); 
    }, [movieId, count, startIndex]);  
    useEffect(() => {
        onSeatsUpdate(seats)
        
    }, [seats])
   
    const handleSeatClick = (id) => {
  
        setTotalTicket(id); 

        const updatedSeats = seats.map((seat) =>
            seat.id === id && !seat.booked
                ? { ...seat, selected: !seat.selected, price: !seat.selected ? 6.99 : 0 }
                : seat
        );
        // console.log(updatedSeats.findIndex((item) => item.id === id));
        
        if (updatedSeats.findIndex((item) => item.id === id && item.booked === true) !== -1) {
            showErrorToast("This seat is already booked")
          
        } else {
            setSeats(updatedSeats);
        }
        

     
    };

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="flex flex-col">
            {seats.map((seat) => (
                <div key={seat.id}>
                    <MdChair
                        key={seat.id}
                        id={seat.id}
                        size={'100%'}
                        className={`cursor-pointer ${seat.booked
                            ? theme.theme === 'travel'
                                ? 'text-[#b8116a]' 
                                : 'text-chairMovie-chairBooked'
                            : seat.selected
                                ? theme.theme === 'travel'
                                    ? 'text-[#08fbd2]' 
                                    : 'text-primary-textMovie'
                                : theme.theme === 'travel'
                                    ? 'text-[#c4c4c2]' 
                                    : 'text-chairMovie-chairAvailable'
                        }`}
                        onClick={() => handleSeatClick(seat.id)}  
                    />
                </div>
            ))}
        </div>
    );
};

export default SeatList;
