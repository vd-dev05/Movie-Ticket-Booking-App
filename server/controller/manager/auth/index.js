import { ManagerSeller } from "../../../models/manager/account.js"
import { hashPass } from "../../../utils/hashPassword.js"

const authManager = {
    create: async (value, url) => {
        try {   
            const password =  hashPass(value.password)
        
            const seller = await  ManagerSeller.create({
                password : password.hash,
                logo  :url,
                code : value.idCard ,
                nameSeller: value.storeName ,
                addressManager : value.address,
                taxCode : value.taxCode,
                email : value.email,
                seller : value.seller
            })
            if (seller) {
                return { success: true,  seller }
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
export default authManager