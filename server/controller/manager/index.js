const managerController = {
    loginManager : async (req,res) => {
     
        try {
              res.status(200).json({
            message : "movie theater manager login successful",
            success : true,
            data : null
        })
        } catch (error) {
            return res.status(403).json({ message : "Manager Login Error", error : error.message})
        }
    }
}
export default  managerController  