import { useTheme } from "@/context/Theme";
import { generateSeats } from "@/lib/createSeats";
import { useEffect, useState } from "react";
import { MdChair } from "react-icons/md";

const SeatList = ({ count, onSeatsUpdate, startIndex, setTotalTicket }) => {
    const theme = useTheme()

    const [seats, setSeats] = useState(generateSeats(count, startIndex));
    // console.log(seats);



    // Hàm xử lý sự kiện khi nhấp vào ghế
    const handleSeatClick = (id) => {
        // console.log(id);
        setTotalTicket(id)

        // const t =  seats.filter(seat => seat.id == id)
        // console.log(seats.filter(seat => seat.id == id.id ?  ));


        const updatedSeats = seats.map((seat) =>

            seat.id === id && !seat.booked
                ? ({ ...seat, selected: !seat.selected, price: !seat.selected ? 99 : 0 })
                : seat
        );

        // console.log(updatedSeats);

        setSeats(updatedSeats);
        //    

    };

    useEffect(() => {
        onSeatsUpdate(seats);
        // console.log(TotalTicket);
    }, [seats]);

    return (
        <div className="flex flex-col">
            {seats.map((seat) => (
                <div key={seat.id}>
                    {/* {seat.id} */}
                    <MdChair
                        key={seat.id}
                        id={seat.id}
                        size={'100%'}
                        // size={sizeClass}
                        className={`cursor-pointer ${seat.booked
                            ? theme.theme == 'travel' ? ' text-[#b8116a]' : 'text-chairMovie-chairBooked' : seat.selected
                                ? theme.theme == 'travel' ? ' text-[#08fbd2]' : 'text-primary-textMovie'
                                : theme.theme == 'travel' ? ' text-[#c4c4c2]' : 'text-chairMovie-chairAvailable'}    `}
                        onClick={() => handleSeatClick(seat.id)}
                    />

                </div>
            ))}
        </div>
    );
};

export default SeatList;