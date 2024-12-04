import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { showSuccessToast, showErrorToast } from '@/lib/toastUtils';
import UserServices from '@/services/users/User.controller';
import TicketController from '@/services/users/ticket';

const TicketHistory = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedTickets, setSelectedTickets] = useState([]); // State for selected tickets

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const response = await TicketController.getAllTicket();
                setTickets(response.data.ticket);
            } catch (error) {
                setError('Failed to load ticket history');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const handleDeleteTicket = async (ticketId) => {
        console.log(ticketId);
        setLoading(true);
        try {


            await UserServices.deleteTicket(ticketId);
            setTickets(tickets.filter(ticket => ticket._id !== ticketId));
            showSuccessToast('Ticket deleted successfully');
        } catch (error) {
            showErrorToast('Failed to delete ticket');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSelectedTickets = async () => {
        if (selectedTickets.length === 0) {
            showErrorToast('No tickets selected');
            return;
        } else {
            setSelectedTickets(tickets)
            // console.log(selectedTickets)
        }

        setLoading(true);
        try {
            // console.log(selectedTickets);

            // Xóa tất cả vé đã chọn
            const deleteId = selectedTickets.flatMap(ticket => ticket._id)


            const response = await TicketController.deleteTicketDb(deleteId);
            if (response) {
                setTickets([])
                showSuccessToast('Selected tickets deleted successfully');
            }

        } catch (error) {
            showErrorToast('Failed to delete selected tickets');
        } finally {
            setLoading(false);
        }
    };
    //   console.log(tickets);

    const handleSelectTicket = (ticketId) => {
        console.log(selectedTickets);
        setSelectedTickets(prevSelectedTickets => {
            if (prevSelectedTickets.includes(ticketId)) {
                return prevSelectedTickets.filter(id => id !== ticketId); // Bỏ chọn nếu đã chọn
            } else {
                return [...prevSelectedTickets, ticketId]; // Chọn vé nếu chưa chọn
            }
        });
    };

    const handleSelectAllTickets = () => {
        if (selectedTickets.length === tickets.length) {
            setSelectedTickets([]); // Bỏ chọn tất cả nếu đã chọn tất cả
        } else {
            setSelectedTickets(tickets.map(ticket => ticket.id)); // Chọn tất cả vé
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-5 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">Your Ticket Cancel History</h2>

            {loading && (
                <div className="text-center text-gray-500">Loading...</div>
            )}

            {error && (
                <div className="text-center text-red-500 mb-5">{error}</div>
            )}

            {tickets.length === 0 ? <div>No data </div> : (
                <div>
                    {/* Thêm nút xóa tất cả vé đã chọn */}

                    <div className="flex justify-between items-center mb-5">
                        <Button
                            onClick={handleSelectAllTickets}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg shadow-md transition-all duration-300"
                        >
                            {selectedTickets.length === tickets.length ? 'Deselect All' : 'Select All'}
                        </Button>

                        <Button
                            onClick={handleDeleteSelectedTickets}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-lg shadow-md transition-all duration-300"
                        >
                            Clear Cache ticket
                        </Button>
                    </div>

                    {/* Danh sách vé */}
                    <div className="space-y-4">
                        {tickets.filter((item) => item?.book?.status === 'Cancelled').map(ticket => (
                            <div key={ticket.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedTickets.includes(ticket.id)}
                                        onChange={() => handleSelectTicket(ticket.id)}
                                        className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                                    />
                                    <img src={ticket?.movieId?.poster} alt={ticket?.movieId?.title} className="w-16 h-24 object-cover rounded-lg shadow-md" />
                                    <div>
                                        <p className="font-medium text-lg text-gray-800">{ticket?.movieId?.title}</p>
                                        <p className="text-sm text-gray-500">{ticket?.showTime}</p>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => handleDeleteTicket(ticket._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition-all duration-300"
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}

                    </div>
                </div>
            )}

        </div>
    );
};

export default TicketHistory;
