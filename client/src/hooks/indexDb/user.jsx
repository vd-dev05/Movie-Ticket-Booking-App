import { db } from "@/db/indexDB"
import { toast } from "react-toastify";
const UserIndexDb = {

    createUser : async  (dataUser) => {
       try {
        await db.user.clear()
        await db.user.add({userName :dataUser.user});
       } catch (error) {
        throw new Error(error)
       }
    },
    getUser : async () => {
        try {
        const user = await db.users.get(userName)
        return user;
       } catch (error) {
        throw new Error(error)
       }
    }
}

export  default UserIndexDb