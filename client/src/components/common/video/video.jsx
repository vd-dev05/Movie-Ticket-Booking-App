import { useThemeClasses } from "@/context/Theme/themeStyles"
import { Link } from "react-router-dom"

export const ContentVideo = ({ title, plot, poster, language, id }) => {
    // console.log(poster);
    const { buttonClasses, textClasses } = useThemeClasses()
    return (

        <div className="z-10 text-white  ">
            <div className="flex gap-5 px-2 py-5 absolute top-0 left-0">
                <img className="h-[50px] w-[50px] object-cover rounded-full " src={poster} alt={title} />
                <div>
                    <h2 className="font-bold">{title}</h2>
                    <p className="text-gray-400">Language :{language.join(',')}</p>
                </div>

            </div>
            <div className="absolute   left-0 bottom-0 px-10  flex items-center  justify-between w-full text-xs sm:text-xl gap-5">
                <p className="">plot :{plot}</p>
                <button className={`${buttonClasses}  text-nowrap z-10` }><Link 
                to={`/details/${id}/seller`}
                className={`${textClasses} `}
                >Book Ticket</Link></button>
            </div>


        </div>
    )

}
export const VideoContent = ({ trailer }) => {
    // useE
    return (
        <video
            muted
            loop
            autoPlay={true}
            className="w-full object-cover  h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]  pt-10  -z-10 drop-shadow-2xl "
            src={trailer}>

        </video>
    )
}

const Video = ({ data }) => {
    return (
        <div className="py-10 px-5 relative bg-black h-[600px]  " >
         
            <ContentVideo {...data} />
            <VideoContent {...data} />  
     
            {/* <div className="absolute left-0 bottom-10 px-10  flex items-center  justify-between w-full text-xs sm:text-xl ">
                <button 
                onClick={() => console.log("hello")
                }
                className="text-black bg-slate-500">Click me</button>
            </div> */}
        </div>

    )
}
export default Video