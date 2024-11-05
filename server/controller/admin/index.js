const adminController = {
    loginAdmin : async (req,res) => {
        try {
            res.status(200).json({
                message : "Admin Login Successful",
                success : true,
                data : null
            })
        } catch (error) {
            return res.status(403).json({ message : "Admin Login Error", error : error.message})
        }
      
    }
}
export default adminController 