import { useThemeClasses } from "@/context/Theme/themeStyles";
import { truncateText } from "@/hooks/GetApi/GetApi";
import UserHistory from "@/services/users/history";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const LastMovies = ({dataLast}) => {

    
  const themeCtx = useTheme()
  const {textClasses,themeUniver} = useThemeClasses()

  const [isLoading,setisLoading] = useState(true)
  const localtion = useLocation()
  const {data} = localtion.state || []
  const [lastData,setLastData] = useState(data || null)
  const fetchData = async () => {
    try {
        const response =  await UserHistory.getLastMovie()
        if (response) {
            setLastData(response.data.history)
            setisLoading(false)
        }
        
    } catch (error) {
        setisLoading(true)
        if (localStorage.getItem('access_token')) {
            window.location = '/login'
        }
        
    }
  }
  
  // const [data, setData] = useState(dataLocaltion)
  useEffect(() => {
   
    if (lastData) {
        setisLoading(false)
    } else if (lastData === null ) {
        fetchData()
        
      
    }

    if (dataLast) {
      // setData(data)
      setisLoading(false)
    }

  }, [dataLast, data])
  if (isLoading) {
    return <div>Loading...</div>
  }

    return ( 
      <div>
      <div className={`iphone-12-pro-max:flex flex flex-col min-h-screen font-movie px-5 pt-10 pb-20 ${themeUniver} `}>
          <div className="translate-y-9">
              <Link to="/home">
                  <box-icon name='chevron-left' size={"40px"}  color={themeCtx.theme == 'dark' || 'travel '? 'white' : 'black'}> </box-icon>
              </Link>

          </div>
          <h1 className={` text-center font-logo ${textClasses}'}`}>Latest Movies</h1>
          <div className="grid grid-cols-2 gap-5 mt-10 ">
              {lastData.length > 0  ? lastData.map((item) => (
                  <div key={item.id} >
                      <Link   to={`/details/${item._id}`} state={{lastData:item}} className={`${textClasses} hover:${textClasses}`} >
                          <div className=" saturate-100  " onClick={() =>handleClick(item)}>
                              <img src={item.poster} alt={item.title} loading="lazy" className="rounded-2xl  h-[210px] w-full object-cover"></img>
                          </div>
                          <div className="mt-2">
                              <h2 className={`font-[700] ${textClasses}`}>{truncateText(item.title, 15)}</h2>
                              <p className="text-gray-400 text-xs">{(item.tomatoes && item.tomatoes.production ? item.tomatoes.production : 'hang phim ko ton tai' )}</p>
                          </div>
                      </Link>

                      



                  </div>
              )) : (
                <div className={`flex-shrink-0 w- pr-2 mt-10 flex  rounded-3xl p-5 ${buttonClasses}`}>
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-xl bg-slate-700 h-[100px] w-[100px]"></div>
                            <div className="flex-1 space-y-6 py-1"> 
                            No favorites here.
                                {/* <div className="h-2 bg-slate-700 rounded w-[200px]"></div> */}
                                <div className="space-y-10">
                                Please add your favorite movies
                                    <div className="grid grid-cols-3 gap-4">
                                        
                                        {/* <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-700 rounded col-span-1"></div> */}
                                    </div>
                                    {/* <div className="h-2 bg-slate-700 rounded"></div> */}
                                </div>
                            </div>
                        </div>
                    </div>
              )}



          </div>

      </div>

  </div>
     );
}
 
export default LastMovies;