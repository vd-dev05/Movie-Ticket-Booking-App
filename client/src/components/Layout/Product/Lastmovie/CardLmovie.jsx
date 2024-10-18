// import { Iron } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dataMovie, Movie,truncateText } from "../GetApi/GetApi";
import { useTheme } from "../../Theme";
import { useItem } from "../GetApi/ItemContext";
import { useThemeClasses } from "../../Theme/themeStyles";
const LatestMovie = () => {
    const themeCtx = useTheme()
    const {textClasses,themeUniver} = useThemeClasses()
    // console.log(themeCtx);
    
    const dataCtx = useItem();
    const { setItem } = useItem();
    // console.log(useItem());
    
 
    const [data, setData] = useState([])
    const [isLoading,setisLoading] = useState(true)
    useEffect(() => {
        
        (async () => {
            try {
                const data = await dataMovie('users/dataLastMovie'); 
                if (data) {

                setData(data)
                setisLoading(true)
                }
            } catch (err) {
                console.error(err);
            } finally {
                setisLoading(false);
            } }
        )()
    }, [])

    const test = data.map((item) => item.id)
    // useEffect(() => {
    //     console.log('Updated item:', item);
    // }, [item]);
    const handleClick = (item) => {
        // console.log(item.id);
        // if ( item.id )
        // dataCtx.value.updateItem(item)
        // console.log(dataCtx.value.item.id);
        // dataCtx.value.updateItem(pre =>({...pre,dataTicket:item.id}))
        // const data = {
        //     dataTicket:item
        // }
        // dataCtx.setItem(pre => ({...pre,dataTicket:item}))
        // console.log(dataCtx.item);
        
        // updateItem()
        setItem(pre => ({...pre,
            dataTicket:item}))
        // localStorage.setItem('pay',JSON.stringify(item))
    }
    const clickTets = () => {
      
       dataCtx.setItem(pre => ({...pre,userTest:data}))
    //    console.log(dataCtx.item)
       
    }
    if (isLoading) {
        return <>
            <div>
                Loading...
            </div>
        </>
    }
    // console.log(item);
    
    return (
        <div>
            <div className={`iphone-12-pro-max:flex flex flex-col h-screen min-w-max font-movie px-5 ${themeUniver} `}>
                <div className="translate-y-9">
                    <Link to="/home">
                        <box-icon name='chevron-left' size={"40px"}  color={themeCtx.theme == 'dark' || 'travel '? 'white' : 'black'}> </box-icon>
                    </Link>

                </div>
                <h1 className={` text-center font-logo ${textClasses}'}`}>Latest Movies</h1>
                <div className="grid grid-cols-2 gap-5 mt-10 ">
                    {/* <div onClick={clickTets}>test</div> */}
                    {data.map((item) => (
                        <div key={item.id} >
                            <Link   to={'/itemlove'} state={{data:item}} className={`${textClasses} hover:${textClasses}`} >
                                <div className=" saturate-100  " onClick={() =>handleClick(item)}>
                                    <img src={item.poster} alt={item.title} loading="lazy" className="rounded-2xl  h-[210px] w-full object-cover"></img>
                                </div>
                                <div className="mt-2">
                                    <h2 className="font-[700]">{truncateText(item.title, 15)}</h2>
                                    {/* {truncateText(item.author, 39)} */}
                                    <p className="text-gray-400 text-xs">{(item.type.join(","))}</p>
                                </div>
                            </Link>

                            



                        </div>
                    ))}



                </div>

            </div>

        </div>
    );
}

export default LatestMovie;