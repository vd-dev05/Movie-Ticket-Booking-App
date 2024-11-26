import { Cancel, Users } from "../../../models/movie/index.js"
import { deleteImage } from "../ticket/upload/genqr.js";

const CancelController = {
    create : async (req,res) => {
        // console.log("hello");
        
        // console.log(req.userId);
        // console.log( req.body.nameUser.name);
        
        // try {
        //     console.log(req.body);
            
        //     const cancel = await Cancel.create({
        //         movieId : req.body.movieId,
        //         checkBox : req.body.selectedValue,
        //         cancelReason : req.body.rating || "",
        //         userId : req.userId
        //     })
        //     const ticket =  await Bookings
        //     res.status(201).json({
        //         message : "Cancelation request created successfully",
        //         success : true,
        //         data : cancel
        //     })
        // } catch (error) {
        //     res.status(500).json({
        //         message : "Error creating cancelation request",
        //         success : false,
        //         error : error.message
        //     })
        // }

        try {
            const user = await Users.findOne( {_id : req.userId , name : req.body.nameUser.name })
            .select('ticket')
            // console.log(user);            
            user.ticket.forEach(ticket => {
                if (ticket._id.toString() === req.body.ticketId) {
                    const test = user.ticket.filter((item) => item._id.toString() === req.body.ticketId)
                    const splitText = test[0].book.movieQr
                    if (test[0].book && test && splitText) {
                        // const urlImage = splitText.split('/').pop().split('.')[0]

                        // if (urlImage) {
                        //     (async () => {
                        //         await deleteImage(urlImage)
                        //     })()
                        // }
                        const data = {
                            movieId: test[0].movieId,
                            book: {
                                status: "Cancelled",
                                _id: test[0].book._id
                            },
                            _id: test[0]._id
                        }
                        console.log(data);

                        user.ticket.splice(user.ticket.indexOf(ticket), 1);
                        user.ticket.push(data)
                    }

                    // console.log(user.ticket);

                }
                // console.log(user.ticket);


            })
            // const response = await user.save();
            // res.status(200).json({ message: "Ticket cancelled successfully", success: true, data: response })

        } catch (error) {
            console.log(error);

            res.status(404).send({ error: error.message })
        }
    }
}
export default CancelController