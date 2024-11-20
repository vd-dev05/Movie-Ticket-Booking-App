import ManagerController from "@/services/manager/Manager.controller";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";

const UserOCR = () => {
    
    const [value, setValue] = useState("")
    const [data, setData] = useState([])
    const [result, setResult] = useState("");
    const [scanResult,setScanResult] = useState(null)
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader' , {
            qrbox : {
                width: 250,
                height: 250,
            },fps : 100
        })
        scanner.render(success,error)
        function success(result) {
            scanner.clear()
            setScanResult(result)
        }
        function error(error) {
            console.error(error)
        }
    }, [])
    
    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reponse = await ManagerController.searchMovieId(value)
        if (reponse) {

        }
    }
    return (
        <div className="">
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
            {
                scanResult
                ?<div>Success : {scanResult} </div>
                : <div id="reader"></div>
            }
            </div>

        </div>
    );
}

export default UserOCR;