import axios from 'axios';

export const fetchMovies = async () => {
    try {
        const response = await axios.get('/api/searchMovie.json'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const Movie = async () => {
    try {
        const response = await axios.get('/api/movie.json'); 
        return response.data.movies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error; 
    }
};
export const truncateText = (text, length) => {
    if (text.length > length) {
        return text.substring(0, length) + '...';
    }
    return text;
};
export const convertMinutesToHhMm = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2)}h ${remainingMinutes.toString().padStart(2, '0')}m`;
  };