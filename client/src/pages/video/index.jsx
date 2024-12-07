import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Nav from "@/layout/Nav";

const SortTrailer = () => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(0);

    // Danh sách video trailer
    const videos = [
        {
            id: 1,
            title: "Doctor Strange Official Trailer 1 (2016)",
            src: "https://res.cloudinary.com/dlpxfxpdn/video/upload/q_auto:low/v1733156845/folder-video/Doctor%20Strange%20Official%20Trailer%201%20%282016%29%20-%20Benedict%20Cumberbatch%20Movie%20-%20Rotten%20Tomatoes%20Trailers%20%28720p%2C%20h264%2C%20youtube%29_video_1733156838549.mp4"
        },
        {
            id: 2,
            title: "Avengers: Endgame Official Trailer",
            src: "https://res.cloudinary.com/dlpxfxpdn/video/upload/q_auto:low/v1733156845/folder-video/Doctor%20Strange%20Official%20Trailer%201%20%282016%29%20-%20Benedict%20Cumberbatch%20Movie%20-%20Rotten%20Tomatoes%20Trailers%20%28720p%2C%20h264%2C%20youtube%29_video_1733156838549.mp4"
        },
        {
            id: 3,
            title: "Spider-Man: No Way Home Official Trailer",
            src: "https://res.cloudinary.com/dlpxfxpdn/video/upload/q_auto:low/v1733156845/folder-video/Doctor%20Strange%20Official%20Trailer%201%20%282016%29%20-%20Benedict%20Cumberbatch%20Movie%20-%20Rotten%20Tomatoes%20Trailers%20%28720p%2C%20h264%2C%20youtube%29_video_1733156838549.mp4"
        }
    ];

    // Hàm điều khiển phát và tạm dừng video
    const handlePlayPause = (inView, index) => {
        if (inView) {
            // Khi video vào màn hình, tự động phát
            setCurrentVideo(index);
            setPlaying(true);
        } else {
            // Khi video ra khỏi màn hình, tạm dừng
            setPlaying(false);
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <h1 className="absolute top-10 text-center font-bold text-xl text-white z-10">
                Sort Trailer
            </h1>

            {/* Danh sách video scrollable */}
            <div className="h-full overflow-y-scroll flex flex-col space-y-4">
                {videos.map((video, index) => (
                    <div key={video.id} className="relative w-full min-h-screen">
                        <video
                            ref={videoRef}
                            loop
                            muted
                            className="object-cover rounded-2xl w-full h-full opacity-90"
                            autoPlay={currentVideo === index && playing}
                            src={video.src}
                        />

                     

                        <div className="absolute top-5 w-full text-center z-20">
                            <h2 className="text-white font-bold">{video.title}</h2>
                        </div>

                        {/* Intersection Observer để theo dõi video */}
                        <div className="absolute inset-0" style={{ zIndex: 10 }}>
                            <div
                                className="w-full h-full"
                                ref={videoRef}
                                onMouseEnter={() => handlePlayPause(true, index)}
                                onMouseLeave={() => handlePlayPause(false, index)}
                            >
                                <div
                                    className="h-full w-full"
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    {/* Optional Play/Pause Icon */}
                                    <span
                                        className="text-white font-bold text-xl cursor-pointer"
                                    >
                                        {currentVideo === index && playing ? 'Pause' : 'Play'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
               {/* Kiểm tra xem video có trong màn hình hay không */}
               <div className="absolute bottom-5 w-full text-center z-20">
                            <Nav data={"sorts"} />
                        </div>
        </div>
    );
};

export default SortTrailer;
