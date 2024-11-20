import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useNavURL = (ref, time) => {
    const nav = useNavigate();    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            nav(ref);
        }, time);
        return () => clearTimeout(timeoutId);
    }, [nav, ref, time]);
};