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
export const  dataMovie = (path) => {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, path))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log('No data available');
                return null;
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            throw error;
        });
}
export const deleteData = (path) => {
    // const dbRef = ref(getDatabase());
    const dataRef = ref(database, path);

    return remove(dataRef)
        .then(() => {
            console.log('Data deleted successfully');
        })
        .catch((error) => {
            console.error('Error deleting data:', error);
            throw error;
        });
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
