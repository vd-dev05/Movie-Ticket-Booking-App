import { Booking } from "../models/movie/index.js";

const ManagerMiddleware = {
    checkSeats : async (req,res,next) => {
        try {
            if (!req.params.id) {
                throw new Error("Invalid Movie ID");
            }
            const movieID = await Booking.findOne({movieId : req.params.id , sellerId : req.body.userId})
            if (movieID) {
                throw new Error("Ticket are available on the system ");
            }
            else {
                return next()
            }
             
        } catch (error) {
            res.status(403).json({error: error.message});
        }
    },
    
}
export default ManagerMiddleware