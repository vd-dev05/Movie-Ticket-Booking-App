import authManager from "./auth/index.js"

const managerController = {
    loginManager: async (req, res) => {

        try {
            const seller = req.data
            console.log(seller);
            
            res.status(200).json({
                message: "Seller Login Successful",
                success: true,
                data: {
                    _id : seller._id,
                    name: seller.nameSeller,
                    email: seller.email,
                    address: seller.addressManager,
                    logo: seller.logo,
                }
            })
        } catch (error) {
            return res.status(403).json({ message: "Manager Login Error", error: error.message })
        }
    },
    create: async (req, res) => {
        try {
            const urlLogo = req.logoUrl
            const manager = await authManager.create(req.body, urlLogo)
            if (manager.success === true) {
                res.status(201).json({ message: "Manager created successfully", manager: manager.seller })
            }

        } catch (error) {
            return res.status(400).json({ message: "Manager creation Error", error: error.message })
        }
    }
}
export default managerController  