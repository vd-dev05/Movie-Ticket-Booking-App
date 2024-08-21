
import { useMemo } from 'react';
import { useTheme } from '../Theme'
export const useThemeClasses = () => {
    const { theme, color } = useTheme();
    const themeCtx = useTheme()

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

    const backGround = `
        ${theme === "dark" ? 'bg-[#1a1a1a]' : 'bg-white'}
        ${theme === 'dark' ? 'text-white' : 'text-black'}
    `
    const backGroundTow = `
        ${theme === "dark" ? 'bg-[#130d0d]' : 'bg-[#fbfbfb]'}
    `
    const buttonClasses = `
        ${theme === 'dark' ? 'bg-[#1a1414] text-white' : 'bg-[#ffffff] text-black'}
    `;
    const inputClasses = `
        ${theme === 'dark' ? 'bg-[#1a1414] text-white' : 'bg-[#fafafa] text-black'}
    `;

    // Các lớp CSS cho văn bản
    const textClasses = `
        ${theme === 'dark' ? 'text-white' : 'text-black'}
    `;

    return { buttonClasses, inputClasses, textClasses ,backGround,backGroundTow ,themePaid,themePaidDone };
};