import mongoose from "mongoose";
import { Users, Booking } from "../../../models/movie/index.js";
import UserMiddleware from "../../../middleware/user.js";
const BookTicket = {
    bookticket: async (req, res) => {
        try {
            const book = await Booking.findById(req.params.id)
            if (!book) {
                throw new Error("Error: Couldn't find Booking");
            }
            const seats = book.seats
            const updateSeats = req.body.seat

            // Update seats status and user id in booking
            seats.forEach(seat => {
                if (updateSeats.includes(seat.id)) {
                    seat.status = req.body.status;
                    seat.userId = req.body.userId;
                }
            });
            book.seats.push({ seats: seats })

            const userTicket = await Users.findOne({
                _id: req.body.userId})

                     const data = {
                    _id: false,
                    movieId: req.params.id,
                    book: {
                        price: 100,
                        seat: req.body.seat,
                        status: "Active",
                    } }
                    const dataComment = {
                        movieId : req.params.id,
                        status : "InActive",

                    }
                // console.log(new mongoose.Schema.Types.ObjectId(req.params.id));
            
                for (const ticket of userTicket.ticket) {
                    if (ticket.movieId.toString() === req.params.id) {
                        return res.status(404).json({ 
                            message: "Ticket does not exist", 
                            success: false 
                        });
                    }
                }
                userTicket.ticket.push(data)
                userTicket.comment.push(dataComment)
                const t = await userTicket.save();
                if (t) {
                    res.status(200).json({
                        message: 'Ticket booked successfully!',
                        success: true,
                        data: userTicket
                    });
                }

        } catch (error) {
            res.status(404).send({ error: error.message })
        }


    },
    removeAllTicket: async (req, res) => {
        try {
            const ticket = await Users.findByIdAndUpdate(req.params.id, { $set: { ticket: [] } })
            if (ticket) {
                res.status(200).json({
                    message: 'All ticket removed successfully!',
                    success: true,
                    data: ticket,

                })
            } else {
                throw new Error('Could not find ticket')
            }


        } catch (error) {
            res.status(404).send({ error: error.message })
        }
    },
    removeOneTicket: async (req, res) => {
        try {

            const user = await Users.findById(req.params.id)
            // console.log(user.ticket);
          
            
             user.ticket.forEach(ticket => {
                if (ticket.movieId.toString() === req.body.movieId) {
                    user.ticket.splice(user.ticket.indexOf(ticket), 1);
                    res.status(200).json({
                        message: 'Ticket removed successfully!',
                        success: true,
                        data: user,
                    })
                  
                    
                } else {

                    throw new Error("Ticket not found in the system")
                }
            })
            
            await user.save();
           
          
          
           
        } catch (error) {
            res.status(404).send({ error: error.message })
        }
    },
    createCodeQr : (req, res) => {
        try {
          
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
}
export default BookTicket

// const seats = [
//     null, 'A2', 'A3', 'A4', 'A5','A6',null,
//     'A1', 'B2', 'B3', 'B4', 'B5','B6','A7'
//     // Thêm nhiều ghế khác nếu cần
// ];