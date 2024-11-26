import mongoose from "mongoose";
import { Users } from "../../../models/movie/index.js"
const UserLoveMovie = {
    loveMovie: async (req, res) => {
        try {
            // const userId = new mongoose.Types.ObjectId(req.params.id);
            console.log( req.userId);
            const movieId = req.body.movieId
                
         const user = await Users.findById( req.userId)
                .select('movieLove')
                .populate("movieLove")
          
            // console.log(user.movieLove);
            if (!user) throw new Error(`Movie not found for user`)

            if (req.body.action === 'love') {  
                res.status(200).json(user)
            }
            const checkMovieLove = user.movieLove.findIndex(movie => movie._id.toString() === movieId.toString());            
            if (checkMovieLove !== -1 && req.body.action == 'like') {       
                // console.log("fix");
                         
                throw new Error(`Movie is already in your favorite list`)
            }
           
            if (req.body.action == 'like' && checkMovieLove === -1) {  
                user.movieLove.push(movieId);
                await user.save();
                res.status(200).json({
                    message: 'Movie added to your favorite list successfully!',
                    success: true,
                    data: user
                });
            } else if (req.body.action == "unlike") {
                const movieIndex = user.movieLove.findIndex((item) => item._id.toString() == movieId.toString())
                if (movieIndex !== -1) {
                    user.movieLove.splice(movieIndex, 1);
                    await user.save();
                    res.status(200).json({
                        message: 'Movie removed from your favorite list successfully!',
                        success: true,
                        data: user
                    });
                } 
            } else {        
                throw new Error("Invalid action")
            }
        } catch (error) {
            res.status(401).json({
              error: error.message
            })
        }
    }, getLoveMovie: async (req, res) => {
        try {
            // console.log(req.userId);


            const userId = new mongoose.Types.ObjectId(req.userId);
            const user = await Users.findById(userId)
                .select('movieLove')
                .populate('movieLove')
            // console.log(user);
            

            res.status(200).json(user.movieLove)
        } catch (error) {


        }
    }
}
export default UserLoveMovie