
import mongoose from "mongoose";
import { Booking, Cancel, Users } from "../../../models/movie/index.js"
import { Comments } from "../../../models/comment/index.js";


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
                seat: null,
                date : null,
                event :null
            }
     
            
           
            const movieId = new mongoose.Types.ObjectId(req.body.ticketId)
            const ticketId = new mongoose.Types.ObjectId(req.body.movieId)
            const userId = new mongoose.Types.ObjectId(req.body.userId)
            const commentId = new mongoose.Types.ObjectId(req.body.commentId)
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

                // const test = user.comment.findIndex((item)  => item.movieId.toString() === req.body.ticketId.toString())
             
                const comment = await Comments.findOneAndDelete({_id :commentId })
                console.log(comment);
                
                // const cancel = comment.findIndex(item => item._id.toString() === req.body.commentId.toString()) 

                // if (cancel !== -1) {
                //     comment.slice(cancel,1)
                //     console.log(comment);
                    
                //     // await comment.save()
                // }
             
                // await comment.save()
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
                    if ( ticketCancel && booking && user) {
                        res.status(200).json("Cancelled successfully 😢 !")
                    }
                   
                  
                } catch (error) {
                    console.error("Error in bulk operation:", error);
                }
            } else {
                console.error("No valid seat operations to perform.");
            }

        } catch (error) {
            console.log(error);

            res.status(404).send({ error: error.message })
        }
    }
}
export default CancelController