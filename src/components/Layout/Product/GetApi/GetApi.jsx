import axios from 'axios';
import { getDatabase, ref, child, get } from "firebase/database";

export const fetchMovies = async () => {
    try {
        const response = await axios.get('/api/searchMovie.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};
const dbRef = ref(getDatabase());
export const Mobile = get(child(dbRef, `data/movies`)).then((snapshot) => {
    return snapshot.val()
}).catch((error) => {
    console.error(error);
});

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

export const TimestampConverter = ({ seconds, nanoseconds }) => {
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    const formattedDate = date.toUTCString();
    return (
        <div>
            <h3>Timestamp:</h3>
            <p>{`Seconds: ${seconds}`}</p>
            <p>{`Nanoseconds: ${nanoseconds}`}</p>
            <h4>Converted Date:</h4>
            <p>{formattedDate}</p>
        </div>
    );
};
