import React, { useState,useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useTheme } from '../../Theme';
import {truncateText} from '../GetApi/GetApi'

    const MovieDe = ({data}) => { 
        // console.log(data.length);
        const themeCtx = useTheme()

        const [currentIndex, setCurrentIndex] = useState(0);
        const containerRef = useRef(null);
        const swipeDelay = 100; 
    
        let swipeTimeout = useRef(null);
    
        const itemsToShow = 3; 
        // phai
        const handleSwipeLeft = () => {
            if (swipeTimeout.current) clearTimeout(swipeTimeout.current);
            swipeTimeout.current = setTimeout(() => {
                setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data.length - itemsToShow));
            }, swipeDelay);
            // console.log(currentIndex);
            console.log(currentIndex * (200 / itemsToShow));
        };
        // trai
        const handleSwipeRight = () => {
            if (swipeTimeout.current) clearTimeout(swipeTimeout.current);
            swipeTimeout.current = setTimeout(() => {
                setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
            }, swipeDelay);
            // console.log(currentIndex);
          
            
        };
    
        const handlers = useSwipeable({
            onSwipedLeft: handleSwipeLeft,
            onSwipedRight: handleSwipeRight,
            preventDefaultTouchmoveEvent: true,
            trackMouse: true, 
        });
    
    return ( 
        <div
        {...handlers}
        className="relative overflow-hidden w-full"
        style={{ touchAction: 'none' }} // Prevent default browser gestures
    >
        <div
            ref={containerRef}
            className="flex transition-transform duration-300  "
            style={{ transform: `translateX(-${currentIndex * (200 / itemsToShow)}%)` }}
        >
            {data.map((item) => (
                <div key={item.id} className="flex-shrink-0   pr-5 mt-5 mx-10">
                    <div className="saturate-150">
                        <img
                            src={item.poster}
                            alt={item.title}
                            loading="lazy"
                            className="rounded-2xl h-[300px] w-[250px] bg-cover "
                        />
                    </div>
                    <div className={`mt-2 ${themeCtx.theme == 'dark' ? 'text-light-bg':null}`}>
                        <h2 className="font-[700]">{truncateText(item.title, 15)}</h2>
                        <p className=" text-xs">{item.type}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
     );
}
 
export default MovieDe;