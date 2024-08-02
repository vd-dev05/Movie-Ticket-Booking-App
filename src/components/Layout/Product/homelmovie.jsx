import axios from 'axios';

export const fetchMovies = async () => {
    try {
        const response = await axios.get('/api/searchMovie.json'); // Replace with your actual endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error; // Propagate error to be handled by the calling component
    }
};