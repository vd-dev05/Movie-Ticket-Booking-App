import { Users } from "../../../models/movie/index.js";

const UserHistory = {
    getHistory: async (req, res) => {
        try {            
          
            const historyUser = await Users.findById(req.userId )
                .select("history")
                .populate("history", `poster _id title tomatoes.production`) 
                .lean()            
            if (!historyUser) {
                throw new Error("Error: Couldn't find User");
            }

            res.status(200).json(historyUser);


        } catch (error) {
            console.log(error);

        }
    },
    addHistory: async (req, res) => {
        try {      
            const { movieId } = req.body
            
            
            const checkId = await Users.findById(req.userId)
                .select('history')
                .populate('history')    
         
            
            const movieCheckLast = checkId.history.findIndex(item => item._id.toString() === movieId.toString())             
            if (movieCheckLast !== -1 ) {
               throw new Error('return')
            }
            if (!checkId) throw new Error(`Movie not found for user`)
                
            if (req.body.action === 'clear') {
                checkId.history = [];
                await checkId.save();
                return res.status(200).json({ message: 'History cleared' });
            }   
            if (req.body.action === 'save' && movieCheckLast === -1 ) {
                checkId.history.push(movieId);
                await checkId.save();
                res.status(200).json(checkId.history)
            }
        } catch (error) {
            res.status(403).json({ error: error.message });
        }
    }
}
export default UserHistory