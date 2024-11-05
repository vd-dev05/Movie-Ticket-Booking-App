import mongoose from "mongoose";
import { Users } from "../../../models/movie/index.js"
const UserLoveMovie = {
    loveMovie: async (req, res) => {
        try {
            const userId = new mongoose.Types.ObjectId(req.params.id);
            const movieId = new mongoose.Types.ObjectId(req.body.movieId);
            const user = await Users.findById(userId).populate()
            if (!user) throw new Error(`Movie not found for user`)
            if (req.body.action == 'like') {
                if (!user.movieLove.includes(movieId)) {
                    user.movieLove.push(movieId);
                    await user.save();
                    res.status(200).json({
                        message: 'Movie added to your favorite list successfully!',
                        success: true,
                        data: user
                    });
                } else {
                    throw new Error(`Movie already exists in your favorite list for user`)
                }
            } else if (req.body.action == "unlike") {
                const movieIndex = user.movieLove.findIndex(movie => movie.equals(movieId));
                if (movieIndex !== -1) {
                    user.movieLove.splice(movieIndex, 1);
                    await user.save();
                    res.status(200).json({
                        message: 'Movie removed from your favorite list successfully!',
                        success: true,
                        data: user
                    });
                } else {
                    throw new Error(`Movie does not exist in your favorite list for user `)
                }
            } else {
                throw new Error("Invalid action")
            }



            //  const movieIndex = user.movieLove.findIndex(movie => movie.movieId === movieId);
            //  console.log(movieIndex);


        } catch (error) {
            res.status(404).send({
                message: error.message,
                success: false,
                data: null
            })
        }
    }
}
export default UserLoveMovie