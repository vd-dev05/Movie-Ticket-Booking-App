import axios from "axios";

const VideoServices = {
    getTrailer : async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL }/api/v1/movies/video/trailers`);      
            return response
        } catch (error) {
            console.error(error);
            throw new Error('Failed to get movie trailer');
        }
    }
}
 
export default VideoServices;