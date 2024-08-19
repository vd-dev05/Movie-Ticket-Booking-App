
import { useTheme } from '../Theme'
export const useThemeClasses = () => {
    const { theme, color } = useTheme();

    const backGround = `
        ${theme === "dark" ? 'bg-[#1a1a1a]' : 'bg-white'}
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

    return { buttonClasses, inputClasses, textClasses ,backGround  };
};