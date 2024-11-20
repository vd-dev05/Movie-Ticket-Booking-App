import { truncateText } from "@/hooks/GetApi/GetApi";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
const LoveMovie = ({ data ,sizew,sizeh,space,isize,page,texts}) => {
 
  
  
  return (
    
    <Swiper

    spaceBetween={space}
    slidesPerView={page}
    style={{ cursor: 'default', 
      // zIndex :"-99",
      overflow: 'hidden',
      
     }}
     
> 
    {data.length >= 0 && sizew && sizeh && sizeh ? data.map((item,idx) => {
        // console.log(item);

        return (
            <SwiperSlide key={idx}  >
                <div className={`flex flex-col w-[${sizew}px] h-[${sizeh}px]  rounded-xl p-5`}>
                <Link to={`/details/${item._id}`} state={{ data: item }} >
                        <div className="saturate-150  " >
                            <img
                                src={item.poster}
                                alt={item.title}
                                loading="lazy"
                                className={`rounded-xl w-full h-[${isize}px] object-cover  bg-red-700  drop-shadow-2xl    cursor-pointer `}
                            />
                        </div>
                    </Link>
                    <div className={`mt-2 `}>
                    <h2 className="font-[700] text-nowrap">{truncateText(item.title,texts)}</h2>
                    <p className="text-gray-400 text-xs text-nowrap">{item.tomatoes && item.tomatoes.production ? item.tomatoes.production : 'hang phim ko ton tai' }</p>
                    </div>
                </div>
                 
              
            </SwiperSlide>
        )
    }) : <p>Not found</p>}
</Swiper>
  );
};

export default LoveMovie;
 {/* <Swiper
        spaceBetween={10}
        slidesPerView={3}
        style={{ cursor: 'default' }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        <div className='flex overflow-hidden'>
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex-shrink-0 cursor-default mt-5">
                <Link to="/itemlove" state={{ data: item }} className="text-sm font-medium hover:text-gray-700">
                  <div className="saturate-150">
                    <img
                      src={item.poster}
                      alt={item.title}
                      loading="lazy"
                      className="rounded-2xl h-[300px] w-[190px] object-cover"
                    />
                  </div>
                  <div className="mt-2">
                    <h2 className="font-bold text-lg">{truncateText(item.title, 15)}</h2>
                    <p className="text-xs">{item.tomatoes?.production || "N/A"}</p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper> */}