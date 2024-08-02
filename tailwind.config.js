/** @type {import('tailwindcss').Config} */
export default {
  content: [   
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/shadcn/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens :{
        "iphone-12" : "390px"
      }, 
    
      fontWeight : {
        w400 : "400",
        w700 : "700",
        w900 :"900",
        logo : ['900' , {lineHeight :"100rem"}]
      },
      colors : {
         primary: {
        
        textMovie :'hsl(0, 84.2%, 60.2%)',
     
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      chairMovie :{
        chairSelected :'#ff515a',
        chairAvailable:'#eeeced',
        chairBooked :'hsl(12, 3%, 72%)',
      }
      },
     
      fontFamily: {
        "be" : ["Be Vietnam Pro", 'sans-serif'],
        "movie": ['"Roboto"', 'sans-serif'],
      },
      lineHeight: {
        "title" : "46.75px"
      },
      backgroundColor: {
        "button_gift" :"#FF4D00"
       
      }

    },
  },
  plugins: [],
}

