import React, { useState,useRef } from 'react';
import { useSwipeable } from 'react-swipeable';


    const MovieDe = ({data}) => { 
        const truncateText = (text, length) => {
            return text.length > length ? `${text.substring(0, length)}...` : text;
        };

        const [currentIndex, setCurrentIndex] = useState(0);
        const containerRef = useRef(null);
        const swipeDelay = 100; 
    
        let swipeTimeout = useRef(null);
    
        const itemsToShow = 2; 
    
        const handleSwipeLeft = () => {
            if (swipeTimeout.current) clearTimeout(swipeTimeout.current);
            swipeTimeout.current = setTimeout(() => {
                setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data.length - itemsToShow));
            }, swipeDelay);
        };
    
        const handleSwipeRight = () => {
            if (swipeTimeout.current) clearTimeout(swipeTimeout.current);
            swipeTimeout.current = setTimeout(() => {
                setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
            }, swipeDelay);
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
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * (200 / itemsToShow)}%)` }}
        >
            {data.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-[calc(100% / 3)] pr-2 mt-5">
                    <div className="saturate-200">
                        <img
                            src={item.poster}
                            alt={item.Title}
                            loading="lazy"
                            className="rounded-2xl h-[300px] w-[250px] bg-cover"
                        />
                    </div>
                    <div className="mt-2">
                        <h2 className="font-[700]">{truncateText(item.Title, 15)}</h2>
                        <p className="text-gray-400 text-xs">{item.Type}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
     );
}
 
export default MovieDe;