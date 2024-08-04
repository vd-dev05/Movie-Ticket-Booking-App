import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
const Privacy = () => {
    return ( 

        <div className="iphone-12-pro-max:flex flex flex-col  iphone-12:w-[390px] text-center font-movie  mt-10 relative ">
            
            <div className="flex w-full justify-between px-5 ">
                <Link className="text-black " to="/profile">
                <FaChevronLeft size={24} /> 
                </Link>
                <h1 className="text-center font-bold">Privacy Policy</h1>
                <p className="text-white">l</p>
            </div>
            <div className="text-left px-5 ">
            <p className="mt-10">Last update 17/2/2023</p>
            <p className="mt-5 text-lg">Please read these privacy policy , carefuly before using our app operated us</p>
            <p className="mt-10 text-primary-textMovie font-bold">Privacy Policy</p>
            <p className="mt-5 text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum recusandae inventore magnam veritatis suscipit doloribus ullam, atque quis, quod vel distinctio perspiciatis aliquid magni accusantium repellendus facere harum quos quaerat.
                Error deleniti sit, sunt id rem ipsum temporibus sed. Iure ex, animi eaque voluptatem laborum adipisci commodi dolorem alias necessitatibus repellendus modi officiis vero eos at ipsam repudiandae dignissimos rem.
            </p>

            </div>
          

        </div>
     );
}
 
export default Privacy;

