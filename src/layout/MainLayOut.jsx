import { Outlet } from "react-router-dom";
import Navber from "../components/Navber";



const MainLayOut = () => {
    return (
        <div className="flex flex-col min-h-[100vh]">
         <div className="flex-grow">
         <Navber />
            <Outlet></Outlet>
         </div>
            <div className="flex-shrink-0">
            {/* <Footer></Footer> */}
            </div>
        </div>
    );
};

export default MainLayOut;