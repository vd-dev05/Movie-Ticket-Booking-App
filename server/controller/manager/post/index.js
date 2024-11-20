import { Movies, Booking } from "../../../models/movie/index.js"
const postManager = {
    createMovie: async (req, res) => {

        try {
            const data = req.body
            const movie = await Movies.aggregate([{ $match: { title: data.title, plot: data.plot } }])
            console.log(movie);

            if (!movie) {
                throw new Error("Movie already exists in the system")
            } else {
                const newMovie = await Movies.create(data)
                // await newMovie.save()
                res.status(201).json({
                    message: "Movie created successfully",
                    data: newMovie
                })
            }
        } catch (error) {

            res.status(500).json({
                message: error.message
            })
        }

    },
    createTicketMovie: async (req, res) => {
        try {
            
            const movieId = await Movies.findById(req.params.id)
            if (movieId) {
                const generateSeats = (book) => {
                    const seats = [];
                    const obValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
                    // const book = 'available'
                    for (let i = 0; i < obValues.length; i++) {
                        const row = obValues[i];
                        for (let j = 1; j <= 7; j++) {
                            const seatId = `${row}${j}`;
                            if (seatId !== 'A6' && seatId !== 'A7' && seatId !== 'G6' && seatId !== 'G7') {
                                seats.push({ id: seatId, status: book,userId : null});
                            }
                            
                        }
                    }
                    return seats;
                    // if (seats) {
                    //     res.status(201).json({
                    //         message: "Seats created successfully",
                    //         data: seats
                    //     });
                    // }
                };

                // Sử dụng hàm
                const seats = generateSeats('available');
                if (seats) {
                    const data = {
                        movieId : movieId,
                        seats: seats,
                        userId : null
                    }
                    await Booking.create(data)
                    // await test.save();
                    res.status(201).json("Create Seats successfully")
                }


            } else {
               throw new Error(`Create Ticket failed with `)
            }

        } catch (error) {
            res.status(500).json({
                error: error.message,
                status: false
            })
        }
    }
}

export default postManager;