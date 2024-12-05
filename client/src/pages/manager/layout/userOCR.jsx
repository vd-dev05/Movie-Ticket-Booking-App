import ManagerController from "@/services/manager/Manager.controller";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { showErrorToast } from "@/lib/toastUtils";

const UserOCR = () => {

    const [value, setValue] = useState("")
    const [data, setData] = useState([])
    const [result, setResult] = useState(false);
    const [scanResult, setScanResult] = useState(null)
    const [sellerId, setSellerId] = useState()

    useEffect(() => {
        const { _id } = JSON.parse(localStorage.getItem('seller'))
        setSellerId(_id)
        fetchData()
    }, [sellerId])
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            }, fps: 100
        })
        scanner.render(success)
        function success(result) {
            ( async () => {
                const response =  await ManagerController.postScanTicket(result,sellerId)
                console.log(response);
                
            })()
           
            
            setScanResult(result)
        }
        function error(error) {        
            // if (result ===true) {
            //     console.error(error)
            // }
         
        }
    }, [result === true])
    

    const handleInputChange = (e) => {
        setValue(e.target.value);
        // console.log(e.target.value)
    };
    const fetchData = async (req, res) => {
        try {
            const response = await ManagerController.getAllMovie(sellerId)
            if (response) {
                setData(response)
            }

        } catch (error) {
            console.log(error);

        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (data.length > 0) {
            const movie = data.find(movie => movie._id === value)
            if (movie) {
                setResult(true)
                console.log(result);
                
                console.log("ok");
                
            } else {
                showErrorToast("Movie not found")
                setResult(false)
            }
        }

        // console.log(value)
    }
    return (
        <div className="">
            {/* <div
            onClick={() => {
                ( async () => {
                    const response =  await ManagerController.postScanTicket("45f119e1dc9f",sellerId)
                })()
               
            }}
            >test</div> */}
            <h2 className="text-xl">Ticket Scanner </h2>
            <div className="flex gap-2">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-[500px] h-10 outline-none p-2 rounded-lg text-xs"
                        placeholder="Enter your id movie"
                        value={value}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="bg-blue-400  h-10 text-xs text-white">Search </button>
                </form>
            </div>
            <div>
            <div id="reader" className={`${!!result? 'block':'hidden' }`}></div>
               

                {
                    scanResult ? <div>Success : {scanResult}  </div> : "no data"
                    // ? <div>Success : {scanResult} </div>
                    // : <div id="reader"></div>
                }
            </div>

        </div>
    );
}

export default UserOCR;