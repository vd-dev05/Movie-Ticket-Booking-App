import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Nav from "@/layout/Nav";
import Video, { ContentVideo, VideoContent } from "@/components/common/video/video";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import { Link } from "react-router-dom";
import VideoServices from "@/services/users/video";

const SortTrailer = () => {
    const videoRef = useRef();
    const { themeUniver, backGround } = useThemeClasses()
    const [playing, setPlaying] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [videos,setVideos] = useState([])
    const [isLoading,setIsloading] = useState(false);
  
    useEffect(() => {
        const fetchTrailer = async () => {
            // setIsloading(true)
            const response  =  await VideoServices.getTrailer()
            // console.log(response.data);
            if (response) {
                const splitText = response.data.map((item) => {
                    const splitText = item.trailer.split('/upload')
                    const trailer = item.trailer ? ( item.trailer.includes('/upload') 
                        ? splitText[0] + '/upload/c_crop,g_north,h_1000,w_500/g_auto:faces' + splitText[1]
                        : item.trailer
                     ): item.trailer
                     return {
                        ...item,
                        trailer : trailer
                     }
                })
                setVideos( splitText)
                setIsloading(true)
       
            }
       
        }
        fetchTrailer()
      
    }, [])
    console.log(videos);
    
if (!isLoading) {
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
    return (
        <div className={`mb-10`}>


            <h1 className=" top-10 text-center font-bold text-xl z-10">
                Sort Trailer
            </h1>

            {/* <div className={themeUniver}>
        

            </div> */}
            {/* <div className="">

            </div> */}
            {videos.map((video, index) => (
                <div className=" flex flex-col gap-2">

                    <Video key={video._id} data={{
                        title: video.title,
                        plot: video.plot,
                        poster: video.poster,
                        language: video.languages,
                        trailer: video.trailer,
                        id: video._id
                    }} />
                    {/* <hr /> */}
                    
                    <Video key={video._id} data={{
                        title: video.title,
                        plot: video.plot,
                        poster: video.poster,
                        language: video.languages,
                        trailer: video.trailer,
                        id: video._id
                    }} />
    
                </div>
            ))}
            {/* <div className={` h-full  flex flex-col space-y-4 mr-10   -z-10 `}>

           

            </div> */}
            <Nav data={"sorts"} />
        </div>

    );
};

export default SortTrailer;
