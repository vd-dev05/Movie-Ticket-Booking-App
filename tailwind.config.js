/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/shadcn/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',

  theme: {
    extend: {

      screens: {
        "iphone-12": "390px",
        "redmi": "360px"
      },

      fontWeight: {
        w400: "400",
        w700: "700",
        w900: "900",
        logo: ['900', { lineHeight: "100rem" }]
      },
      colors: {
        //  dark 
        'btn-dark-text': '#edf2f7',
        'dark-bg': '#1a1a1a',
        'dark-text': '#ffffff',
        'btn-dark': '#1a1414',

        // light
        'light-bg': '#ffffff',
        'light-text': '#000000',
        'btn-light': '#e2e8f0',
        'btn-light-text': '#1a202c',
        'btn-light-icon': '#fafafc',

        primary: {

          textMovie: 'hsl(0, 84.2%, 60.2%)',

          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        chairMovie: {
          chairSelected: '#ff515a',
          chairAvailable: '#eeeced',
          chairBooked: 'hsl(12, 3%, 72%)',
        }
      },

      fontFamily: {
        "be": ["Be Vietnam Pro", 'sans-serif'],
        "movie": ['"Roboto"', 'sans-serif'],
      },
      lineHeight: {
        "title": "46.75px"
      },
      backgroundColor: {
        "button_gift": "#FF4D00"

      },
      spacing: {
        'icon-sm': '24px',
        'icon-md': '32px',
        'icon-lg': '40px',
        'icon-xl': '48px',
      },
      animation: {
        'move': 'move 6s infinite ease-in-out alternate',
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        countdown: 'countdown 4s linear forwards',
        show_slide: 'show_slide 1s ease-out',
      },
     
      keyframes: {
        move: {

          '0%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(0.5)' }
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        countdown: {
          '20%': {  transform: "translateX(100%)" },
          '100%': {  width: '0' },
        },
        show_slide: {
          '0%': { transform: 'translateX(50%)' , width: "100%"},
          // '40%': { transform: 'translateX(60%)' },
          // '80%': { transform: 'translateX(30%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      }
    

    },
  },
  plugins: [],
}

