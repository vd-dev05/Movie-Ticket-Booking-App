
import mongoose from "mongoose";
import { Booking, Cancel, Users } from "../../../models/movie/index.js"
import { deleteImage } from "../ticket/upload/genqr.js";

const CancelController = {
    create: async (req, res) => {
        const { selectedValue, rating, nameUser, seats } = req.body
         // bulkWrite options update many seats 
         const bulkOperations = [];
         const seatIds = seats[0].split(',');
         // 


        try {

            const book = {
                status: "Cancelled",
                movieQr: '',
                price: '',
                date: null,
                seat: null
            }
           
            const movieId = new mongoose.Types.ObjectId(req.body.ticketId)
            const ticketId = new mongoose.Types.ObjectId(req.body.movieId)
            const userId = new mongoose.Types.ObjectId(req.body.userId)
                const user = await Users.findByIdAndUpdate(req.userId,{
                    $set: {
                        // 'ticket.$.movieId': ticketId,
                        "ticket.$[elem].book": book,
                      },
                    $pull :{
                        'comment' : {movieId : movieId} 
                    },

                },  {
                    new : true,
                    arrayFilters : [{"elem.movieId" : movieId}]
                })
                const test = user.comment.findIndex((item)  => item.movieId.toString() === req.body.ticketId.toString())
                // console.log(test);
                if (test !== -1) {
                    user.comment.slice(test,1)
                }
               const ticketCancel = await Cancel.create({
                    movieId :movieId,
                    checkBox : selectedValue,
                    cancelReason : rating || "",
                    ticketId : ticketId
                })

            seatIds.forEach(seat => {
                bulkOperations.push({
                    updateOne: {
                        filter: {
                            movieId: movieId,
                            "seats.seatsId": seat,
                            "seats.status": "Booked"
                        },
                        update: {
                            $set: {
                                "seats.$.status": "available",
                                "seats.$.userId": null,
                                "seats.$.code": null
                            }
                        }

                    }
                })
            });
            if (bulkOperations.length > 0) {
                try {
                    const booking = await Booking.bulkWrite(bulkOperations);
                    // console.log(booking);
                    
                    if ( ticketCancel && booking && user) {
                        res.status(200).json("Cancelled successfully 😢 !")
                    }
                   
                  
                } catch (error) {
                    console.error("Error in bulk operation:", error);
                }
            } else {
                console.error("No valid seat operations to perform.");
            }

            // console.log(  movieId );
            // console.log(await Booking.find());


            // console.log( bulkOperations);


            // console.log(booking);


            // console.log(ticketCancel);

            // await user.comment.

            // console.log(  user.comment.slice(user.comment.findIndex((item)  => item.movieId.toString() === req.body.ticketId),1));

            //  const response = await user.save()
            // console.log(user.comment.findIndex((item)  => item.movieId.toString() === req.body.ticketId));

            // console.log(user.comment);

            // await user.save()


            // console.log(user);

            // .select('ticket')
            // console.log(user);            
            // user.ticket.forEach(ticket => {


            //     if (ticket._id.toString() === movieId) {

            //         const data = {
            //             movieId: ticketId,
            //             book: {
            //                 status: "Cancelled",
            //                 // _id: test[0].book._id
            //             },
            //             _id : movieId
            //         }
            //         user.ticket.push(data)
            //         console.log(user.ticket);

            //         // console.log(data);

            //         // const test = user.ticket.filter((item) => item._id.toString() === movieId)
            //         // console.log(test);
            //         // console.log("---");

            //         // console.log(ticket._id);
            //         // console.log(ticketId);
            //         // console.log(movieId);
            //         // console.log('_--');
            //         // const splitText = test[0].book.movieQr
            //         // if (test[0].book && test && splitText) {
            //         //     // const urlImage = splitText.split('/').pop().split('.')[0]

            //         //     // if (urlImage) {
            //         //     //     (async () => {
            //         //     //         await deleteImage(urlImage)
            //         //     //     })()
            //         //     // }
            //         //     const data = {
            //         //         movieId: test[0].movieId,
            //         //         book: {
            //         //             status: "Cancelled",
            //         //             _id: test[0].book._id
            //         //         },
            //         //         _id: test[0]._id
            //         //     }
            //         //     console.log(data);

            //         //     user.ticket.splice(user.ticket.indexOf(ticket), 1);
            //         //     user.ticket.push(data)
            //         // }

            //         // console.log(user.ticket);

            //     }
            //     // console.log(user.ticket);


            // })
            // res.status(200)
            // await user.save();
            // res.status(200).json({ message: "Ticket cancelled successfully", success: true, data: response })

        } catch (error) {
            console.log(error);

            res.status(404).send({ error: error.message })
        }
    }
}
export default CancelController