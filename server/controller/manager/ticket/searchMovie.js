import { Movies, Booking } from "../../../models/movie/index.js"

const Ticket = {
    searchTicketId  : async (req,res) => {
        try {
            const ticketId = req.params.id;
            const ticket = await Movies.findById(ticketId)
           .select("title poster")

            if (!ticket) {
                throw new Error("Error: Couldn't find Booking");
            }
            res.status(200).json(ticket);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getAllTicket : async (req, res) => {
        try {
            const tickets = await Booking.find({})
            .select("movieId")
            .populate("movieId", "title poster")
            .exec()
            // .populate("title")
            // .populate("Movies")
            // console.log(tickets);
    //         const mapMovieId = tickets.map(t => {
    //             const { movieId, ...rest } = t.toObject();  // Destructure and exclude movieId
    //   return {
    //     ...rest,
    //     movie: movieId // Add the populated movie details as `movie` instead of `movieId`
    //   };
    //         })
            const ticketMap = tickets.map(ticket => {return ticket.movieId})
            
            res.status(200).json(ticketMap);
        } catch (error) {
            res.status(400).json({ error: error});
        }
    }
}
export default Ticket