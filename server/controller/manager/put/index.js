import { Users } from "../../../models/movie/index.js";

export const UpdateScanTicket = async (code) => {
    try {
        // const ticket = await Users.findOneAndUpdate({ code: code }, { $set: { status: "Scanned" } }, { new: true });
        const users = await Users.findOne({'ticket.book.movieQr' : code})
        .select('ticket')
        if (!users) {
            throw new Error("Couldn't find ticket");
        }
       users.ticket.forEach( async element => {
            if (element.book.movieQr === code) {
                element.book.status = "Active";
                element.book.movieQr = null;
                await users.save()
            }
       });        
        return ticket;
    } catch (error) {
        throw new Error(error.message);
    }
}