import mongoose from "mongoose";
import { Users, Booking } from "../../../models/movie/index.js";
import UserMiddleware from "../../../middleware/user.js";
import { generateQRCode } from "../../../utils/generateQR.js";
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns'
import { parseDateWithTime } from "../../../utils/configDate.js";
import { Comments } from "../../../models/comment/index.js";
import Voucher from '../../../models/User/voucher/index.js'

const BookTicket = {
    getSellerTickets  : async (req,res) =>{
        try {
        
            if (req.body) {
       
                const seller = await Booking.aggregate([
                    { $match: { type: req.body.type } },
                    {
                      $project: {
                        sellerId: 1,
                        _id: 1,
                        movieId: 1,
                        price: 1,
                        seat: 1,
                        type : 1,
                        events : 1,
                      },
                    },
                    {
                      $lookup: {
                        from: "managers",  
                        localField: "sellerId", 
                        foreignField: "_id",  
                        as: "sellerDetails",  
                      },
                    },
                    {
                      $unwind: "$sellerDetails",    
                    },
                    {
                      $project: {
                        _id: 1,
                        movieId: 1,
                        price: 1,
                        seat: 1,
                        sellerId: 1,
                        sellerAddressManager: "$sellerDetails.addressManager",  
                        sellerNameSeller: "$sellerDetails.nameSeller",  
                        sellerLogo: "$sellerDetails.logo",  
                        type : 1,
                        events : 1,
                      },
                    },
                  ]);
                res.status(200).json(seller)
            }
        } catch (error) {
            res.status(401).send({ error: error.message })
        }
    },
    bookticket: async (req, res) => {
        try {
            const keyCode = uuidv4().split('-')[4];
            let priceDiscount ;
            const id = req.userId;
            
            
            const { movieId, price, seat, status, date, event,address ,
                code,
                _id,
                sellerId
             } = req.body;
     
          
            // console.log(sellerId,code);
            
            
            const isoDateStart = format(parseDateWithTime( date, event.start), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            const isoDateEnd = format(parseDateWithTime(date, event.end), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            
            const book = await Booking.findOne({ movieId: movieId , 
                sellerId : sellerId  }, { seats: 1, movieId: 1 }).lean();

            // console.log(book.seats.find(seat => seat.userId === id.toString() ));
            const idCheck =  new mongoose.Types.ObjectId(id)
            const check = book.seats.find(seat => seat.userId === idCheck );
 
            if (check && check !== undefined) {
                throw new Error('Ticket already booked for this movie')
            }
            await Comments.find({}).lean()
            
            if (!book) {
                throw new Error(`The movie theater hasn't opened for ticket sales yet`)
            }
            if (_id ) {
                const updateVocher = await Voucher.findByIdAndUpdate(_id, {
                    $set: {
                        isClaimed: true
                    }
                })

               priceDiscount =  (price -(updateVocher.discountAmount / 100) * price).toFixed(3)
                // console.log(priceDiscount);
                
            }
          
            const userId = new mongoose.Types.ObjectId(id);
            const updateSeats = seat;
            const seats = book.seats;

            // console.log(seat);
            
            const updatedSeats = seats.map(seat => {
                if (updateSeats.includes(seat.seatsId)) {
                    return { ...seat, status: status, userId: userId, code: keyCode };
                }
                return seat;
            });
            
            
            const userTicketPromise = Users.findOne({ _id: id }).select('name ticket role ');
            const userTicket = await userTicketPromise;

            if (!userTicket) {
                throw new Error('User not found')
            }

            const existingTicket = userTicket.ticket.find(ticket => ticket.movieId.toString() === movieId && ticket.book.status === "Active");
            if (existingTicket) {
                throw new Error('Ticket already booked for this movie')
            }
            const qrData = `Mov-${movieId}-${id}}`;
            // const code = await generateQRCode(qrData)
            // console.log(code);
            
            // const upLoadPromise = upLoadClound(code, keyCode)
            // const upLoadPromise = "gello"
        
            

            const dataComment = {
                name : userTicketPromise.name,
                createAt : new Date(),
                movieId: movieId,
                status: "InActive",
                userId :  userTicketPromise._id,
                _id  : new mongoose.Types.ObjectId()
            };
            // const userdataComment = {
            //     comentId : dataComment._id
            // }
            const data = {
                commentId :dataComment._id,
                movieId: movieId,
                book: {
                    movieQr: keyCode,
                    price:  priceDiscount  ?  priceDiscount : price,
                    seat: seat,
                    status: "Expired",
                    keyCode: qrData,
                    date: isoDateStart,
                    keyCode: keyCode,
                    event : {
                        start: event.start,
                        end: event.end
                    },
                    address : address,
                    
                },
                _id: new mongoose.Types.ObjectId()
            };            
            userTicket.ticket.push(data);

            const [updatedUserTicket] = await Promise.all([
                // upLoadPromise,
                Booking.updateOne(
                    { movieId: movieId },
                    { $set: { seats: updatedSeats } }
                ),
                Comments.create(dataComment),
                
                userTicket.save(),

            ]);
       
            
            return res.status(200).json({
                message: 'Ticket booked successfully!',
                success: true,
                imgUrl: updatedUserTicket,
                dataQr: data._id

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
            const ticket = await Users.findByIdAndUpdate(req.userId, { $set: { ticket: [] } })
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
     
    },
    getTicketId: async (req, res) => {
        try {
            const ticketId = new mongoose.Types.ObjectId(req.params.id)


            const response = await Users.findOne({ 'ticket._id': ticketId })
                .select('ticket')

            // console.log(response);

            res.status(200).json(response)
        } catch (error) {
            res.status(401).send({ error: error.message })
        }
    },
    getAllTickets: async (req, res) => {


        try {
            const ticket = await Users.findById(req.userId)
                // .select('ticket')
                .select('ticket.movieId ticket.book.status ticket.book._id ticket.book.movieQr ticket._id ticket.book.seat ticket.commentId')
                .populate('ticket.movieId', 'title tomatoes languages poster ')

            // console.log(ticket);

            res.status(200).json(ticket)
        } catch (error) {
            res.status(401).send({ error: error.message })
        }
    }
}
export default BookTicket