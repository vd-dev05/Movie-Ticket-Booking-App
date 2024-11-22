import mongoose from "mongoose";
import { Users, Booking } from "../../../models/movie/index.js";
import UserMiddleware from "../../../middleware/user.js";
import { generateQRCode } from "../../../utils/generateQR.js";
import { v4 as uuidv4 } from 'uuid';
import { upLoadClound } from "./upload/genqr.js";
import {format} from 'date-fns'
import { parseDateWithTime } from "../../../utils/configDate.js";


const BookTicket = {
    bookticket: async (req, res) => {
        try {
            const keyCode = uuidv4().split('-')[4];
            const id = req.userId;
            const { movieId, price, seat, status ,day,hour } = req.body;            
            const isoDate = format(parseDateWithTime(day,hour), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            // Tìm booking dựa trên movieId
            const book = await Booking.findOne({ movieId: movieId }, { seats: 1, movieId: 1 }).lean();
            if (!book) {
                throw new Error(`The movie theater hasn't opened for ticket sales yet`)
            }
            
            const userId = new mongoose.Types.ObjectId(id);
            const updateSeats = seat;
            const seats = book.seats;
           
            
            const updatedSeats = seats.map(seat => {
                if (updateSeats.includes(seat.seatsId)) {
                    return { ...seat, status: status, userId: userId, code : keyCode  };
                }
                return seat;
            });           

            const userTicketPromise = Users.findOne({ _id: id }).select('name ticket comment role');    
            const userTicket = await userTicketPromise;

            if (!userTicket) {
               throw new Error('User not found')
            }

            const existingTicket = userTicket.ticket.find(ticket => ticket.movieId.toString() === movieId);
            if (existingTicket) {
              throw new Error('Ticket already booked for this movie')
            }            
            const qrData = `Mov-${movieId}-${id}}`;
            const code = await generateQRCode(qrData)
            const upLoadPromise = upLoadClound(code, keyCode)
          
            
            const dataComment = {
            
                movieId: movieId,
                status: "InActive"
            };

            const data = {
                movieId: movieId,
                book: {
                    movieQr: await upLoadPromise, 
                    price: price,
                    seat: seat,
                    status: "Expired",
                    keyCode : `Mov-${keyCode}`,
                    date  : isoDate,
                    keyCode : keyCode
                },
                _id  :  new mongoose.Types.ObjectId()
            };
            
            userTicket.ticket.push(data);  
      
             
            userTicket.comment.push(dataComment);

            const [updatedUserTicket] = await Promise.all([
                upLoadPromise,
                Booking.updateOne(
                    { movieId: movieId },
                    { $set: { seats: updatedSeats } }
                ),
                userTicket.save(),
              
            ]);                   
            return res.status(200).json({
                message: 'Ticket booked successfully!',
                success: true,
                imgUrl  : updatedUserTicket ,
                dataQr : data._id
                
            });
    
        } catch (error) {
            res.status(401).json({
                error: error.message || "An error occurred while booking the ticket.",
                success: false
            });
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
    getTicketId : async (req, res) => {
        try {
        const ticketId = new mongoose.Types.ObjectId(req.params.id)

        
        const response = await Users.findOne({'ticket._id' : ticketId })
        .select('ticket')

        // console.log(response);
        
          res.status(200).json(response)
        } catch (error) {
            res.status(401).send({ error: error.message })
        }
    },
    getAllTickets : async (req, res) => {

        
        try {
            const ticket = await Users.findById(req.userId)
            .select('ticket' )
            .populate('ticket.movieId' ,'title')
            // console.log(ticket);
            
            res.status(200).json(ticket)
        } catch (error) {
            res.status(401).send({ error: error.message })
        }
    }
}
export default BookTicket

// const seats = [
//     null, 'A2', 'A3', 'A4', 'A5','A6',null,
//     'A1', 'B2', 'B3', 'B4', 'B5','B6','A7'
//     // Thêm nhiều ghế khác nếu cần
// ];