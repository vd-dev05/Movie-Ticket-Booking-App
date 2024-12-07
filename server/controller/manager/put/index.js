import { Users } from "../../../models/movie/index.js";

export const UpdateScanTicket = async (code) => {
    try {
        // const users = await Users.findByIdAndUpdate("67456f94ed54db5720b975df",{
            
        //     $set: {
        //         // 'ticket.$.movieId': ticketId,
        //         "ticket.$[elem].movieQr": null,
        //         "ticket.$[elem].book.status": "Active",
        //       },

        // },  {
        //     new : true,
        //     arrayFilters : [{"elem.movieQr" : code}]
        // })
        // console.log(users);
        const users = await Users.findOne({'ticket.book.movieQr' : code})
        .select('ticket')

        // console.log(users);
        

        // const ticket = await Users.findOneAndUpdate({'ticket.book.movieQr': code }, { $set: { status: "Active",movieQr : null } }, { new: true });
        // const users = await Users.findOne({'ticket.$.book.movieQr' : code})
        // .select('ticket')
        // console.log(users);
        
        if (!users) {
            throw new Error("Couldn't find ticket");
        }
       users.ticket.forEach( async element => {
            if (element.book.movieQr === code) {
                element.book.status = "Active";
                element.book.movieQr = null;
               const ok =  await users.save()
               if (ok) {
                return true;
               } else {
                return false;
               }
                
            }
       });        

        // return ticket;
    } catch (error) {
        throw new Error(error.message);
    }
}