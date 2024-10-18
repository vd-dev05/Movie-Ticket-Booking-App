
import { useMemo } from 'react';
import { useTheme } from '../Theme'
export const useThemeClasses = () => {
    const { theme, color } = useTheme();
    const themeCtx = useTheme()

    const oppositeTheme = useMemo(() => (themeCtx.theme === 'light' ? 'dark' : 'light'), [themeCtx.theme]);

    const themeUniver = 
     useMemo(() => {
        switch (themeCtx.theme) {
            case 'dark':
                return 'bg-dark-bg text-white';
            case 'travel':
                return 'bg-Movie-gradient text-white';
            case 'light':
            default:
                return 'bg-white text-black';
        }
    }, [themeCtx.theme]);

    const themeFocus = useMemo(() => {
        return themeCtx.theme == 'dark' 
        ? 'bg-dark-bg' 
        : 'bg-white'
    }, [themeCtx.theme]);

    const themeBackGround = useMemo(() => {
        return themeCtx.theme == 'dark' 
        ? 'bg-dark-bg text-light-bg' 
        : 'bg-white text-black'
    }, [themeCtx.theme]);

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
        // return themeCtx.theme === 'dark' 
        // ? 'bg-[#1a1414] text-white' : 'bg-[#ffffff] text-black'
        switch (themeCtx.theme) {
            case 'dark':
                return 'bg-[#1a1414] text-white';
            case 'travel':
                return 'bg-navBar-gradient text-white';
            case 'light':
                 default:
                return 'bg-[#ffffff] text-black';
        }
    }, [themeCtx.theme]);

    const  buttonNav= useMemo(() => {
        // return themeCtx.theme === 'dark' 
        // ? 'bg-[#1a1414] text-white' : 'bg-[#ffffff] text-black'
        switch (themeCtx.theme) {
            case 'dark':
                return 'bg-[#1a1414] text-white';
            case 'travel':
                return 'bg-navBar-gradient text-white';
            case 'light':
                return 'bg-[#ffffff] text-black';
        }
    }, [themeCtx.theme]);

    const DatePickerButton = useMemo(() => {
        // return themeCtx.theme === 'dark' 
        // ? 'bg-[#1a1414] text-white' : 'bg-[#ffffff] text-black'
        switch (themeCtx.theme) {
            case 'dark':
                return 'bg-[#221c1c] text-white';
            case 'travel':
                return 'bg-navBar-gradient text-white';
            case 'light':
            default:
                return 'bg-[#f6f6f6] text-black';
        }
    }, [themeCtx.theme]);

    const  buttonCLick = useMemo(() => {
        // return themeCtx.theme === 'dark' 
        // ? 'bg-[#1a1414] text-white' : 'bg-[#ffffff] text-black'
        switch (themeCtx.theme) {
            case 'dark':
                return 'bg-chairMovie-chairSelected   text-white  flex items-center justify-center rounded-lg';
            case 'travel':
                return 'bg-btn-gradient text-white  flex items-center justify-center rounded-lg ';
            case 'light':
            default:
                return 'bg-chairMovie-chairSelected   text-white  flex items-center justify-center rounded-lg';
        }
    }, [themeCtx.theme]);

    const inputClasses = useMemo(() => {
        // return themeCtx.theme === 'dark' 
        // ? 'bg-[#1a1414] text-white' : 'bg-[#fafafa] text-black'
        switch (themeCtx.theme) {
            case 'dark':
                return 'bg-[#1a1414] text-white ';
            case 'travel':
                return 'bg-Input-gradient text-white border-none drop-shadow-2xl';
            case 'light':
            default:
                return 'bg-[#fafafa] text-black';
        }
    }, [themeCtx.theme]);

    const btnSubmit= useMemo(() => {
        // return themeCtx.theme === 'dark' 
        //  ? 'text-white' : 'text-black'
        switch (themeCtx.theme) {
            case 'dark':
                return 'bg-chairMovie-chairSelected text-white';
            case 'travel':
                return 'bg-[#7555a8] text-white  ';
            case 'light':
            default:
                return 'bg-chairMovie-chairSelected text-white';
        }
    }, [themeCtx.theme]);

    const textClasses= useMemo(() => {
        // return themeCtx.theme === 'dark' 
        //  ? 'text-white' : 'text-black'
        switch (themeCtx.theme) {
            case 'dark':
                return 'text-white';
            case 'travel':
                return 'text-[#e1e1e1]';
            case 'light':
            default:
                return 'text-black';
        }
    }, [themeCtx.theme]);


    return {
     buttonClasses, inputClasses, textClasses ,backGround,backGroundTow ,
     themePaid,themePaidDone,themeSusses,themeSussesOTp,oppositeTheme,
     themeBackGround,themeFocus,themeUniver, btnSubmit,buttonCLick,buttonNav,
     DatePickerButton
    
    };
};