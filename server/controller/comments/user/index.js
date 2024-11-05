import { Comments } from "../../../models/comment/index.js";
import { Users } from "../../../models/movie/index.js";
export const createComment = async (userId,movieBody) => {
    try {
        
        
        const comment = new Comments(movieBody)
        const commentUser = await Users.findById(userId)
        commentUser.comment.forEach ((index) =>{
            if (index.movieId.toString() === movieBody.movie_id && index.status === 'InActive') {
                commentUser.comment.push()
            }else {
               throw new Error("Movie Comment is not system")
            }
        })
        
        // if (!comment) {
        //     throw new Error("Error: Couldn't create Comment")
        // }
        // await comment.save()

    } catch (error) {
        throw new Error(error.message)
    }
}