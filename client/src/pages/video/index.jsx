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
    // useEffect(() => {
    //  document.getElementById('focus').focus()
    // }, [])

    // const handleVideo = () => {
    //     // setPlaying(!playing);
    //     if (playing) {
    //         videoRef.current.pause();
    //         setPlaying(false);
    //     } else {
    //         videoRef.current.play();
    //         setPlaying(true);
    //     }
    // }
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
                // console.log(splitText);
                
            //  console.log( trailer);
            }
       
            
           
            // setData(response)
        }
        fetchTrailer()
      
    }, [])
    console.log(videos);
    
    // Danh sách video trailer
    // const videos = [
    //     {
    //         language: 'English',
    //         poster: 'https://res.cloudinary.com/dlpxfxpdn/image/upload/v1733154302/folder-movie/poster15450logo20240.png',
    //         id: 1,
    //         title: "Doctor Strange Official Trailer 1 (2016)",
    //         src: 'https://res.cloudinary.com/demo/video/upload/c_crop,g_north,h_1000,w_500/g_auto:faces/ski_jump.mp4'
    //     },
    //     {
    //         poster: 'https://res.cloudinary.com/dlpxfxpdn/image/upload/v1733154302/folder-movie/poster15450logo20240.png',
    //         id: 2,
    //         title: "Avengers: Endgame Official Trailer",
    //         src: "https://res.cloudinary.com/dlpxfxpdn/video/upload/q_auto:low/c_crop,g_north,h_1000,w_500/g_auto:faces/v1733156845/folder-video/Doctor%20Strange%20Official%20Trailer%201%20%282016%29%20-%20Benedict%20Cumberbatch%20Movie%20-%20Rotten%20Tomatoes%20Trailers%20%28720p%2C%20h264%2C%20youtube%29_video_1733156838549.mp4"
    //     },
    //     {
    //         poster: 'https://res.cloudinary.com/dlpxfxpdn/image/upload/v1733154302/folder-movie/poster15450logo20240.png',
    //         id: 3,
    //         title: "Spider-Man: No Way Home Official Trailer",
    //         src: "https://res.cloudinary.com/dlpxfxpdn/video/upload/q_auto:low/v1733156845/folder-video/Doctor%20Strange%20Official%20Trailer%201%20%282016%29%20-%20Benedict%20Cumberbatch%20Movie%20-%20Rotten%20Tomatoes%20Trailers%20%28720p%2C%20h264%2C%20youtube%29_video_1733156838549.mp4"
    //     }
    // ];

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
                    {/* <div className="text-white absolute bottom-0" onClick={() => console.log("hello")
                    }>Button</div> */}
                    {/* <ContentVideo/>
                        <VideoContent/> */}
                    {/* <div className="absolute left-0 bottom-10 px-10  flex items-center  justify-between w-full text-xs sm:text-xl ">
                            <button className="text-black bg-slate-500">Click me</button>
                        </div> */}
                </div>
            ))}
            {/* <div className={` h-full  flex flex-col space-y-4 mr-10   -z-10 `}>

           

            </div> */}
            <Nav data={"sorts"} />
        </div>

    );
};

export default SortTrailer;
