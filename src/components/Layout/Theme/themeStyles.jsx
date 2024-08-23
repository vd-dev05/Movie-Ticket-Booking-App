
import { useMemo } from 'react';
import { useTheme } from '../Theme'
export const useThemeClasses = () => {
    const { theme, color } = useTheme();
    const themeCtx = useTheme()

    const oppositeTheme = useMemo(() => (themeCtx.theme === 'light' ? 'dark' : 'light'), [themeCtx.theme]);

    const themePaid = useMemo(() => {
        return themeCtx.theme === 'dark' 
            ? 'bg-[#524444]' 
            : 'bg-[#fff0ef]';
    }, [themeCtx.theme]);

    const themePaidDone = useMemo(() => {
        return themeCtx.theme === 'dark' 
            ? 'text-white' 
            : 'text-[#a7a1a1]';
    }, [themeCtx.theme]);
    
    const themeSusses = useMemo(() => {
        return themeCtx.theme === 'dark' 
            ? 'bg-[#261616]' 
            : 'bg-[#d3f1e0]';
    }, [themeCtx.theme]);
    const themeSussesOTp = useMemo(() => {
        return themeCtx.theme === 'dark' 
            ? 'bg-[#261616]' 
            : 'bg-[#d3f1e0]';
    }, [themeCtx.theme]);
    // 
    //

    const backGround = useMemo(() => {
        return themeCtx.theme === 'dark' 
          ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'
    }, [themeCtx.theme]);
    
    const  backGroundTow = useMemo(() => {
        return themeCtx.theme === 'dark' 
        ? 'bg-[#130d0d]' : 'bg-[#fbfbfb]'
    }, [themeCtx.theme]);

    const  buttonClasses= useMemo(() => {
        return themeCtx.theme === 'dark' 
        ? 'bg-[#1a1414] text-white' : 'bg-[#ffffff] text-black'
    }, [themeCtx.theme]);

    const inputClasses= useMemo(() => {
        return themeCtx.theme === 'dark' 
        ? 'bg-[#1a1414] text-white' : 'bg-[#fafafa] text-black'
    }, [themeCtx.theme]);
    const textClasses= useMemo(() => {
        return themeCtx.theme === 'dark' 
         ? 'text-white' : 'text-black'
    }, [themeCtx.theme]);


    return { buttonClasses, inputClasses, textClasses ,backGround,backGroundTow ,themePaid,themePaidDone,themeSusses,themeSussesOTp,oppositeTheme };
};