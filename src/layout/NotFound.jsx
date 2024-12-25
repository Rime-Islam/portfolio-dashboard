import { NavLink } from "react-router-dom";


const NotFound = () => {
    return (
        <div className="h-[80vh] flex justify-center items-center">
         <div>
        
            <img src="https://i.ibb.co/TMBdrV6/2023-11-05-1.png" alt="" />
        
        <div className="text-center font-bold text-xl lg:text-3xl">Oopsie! Something is Missing...</div>
       <div className="flex justify-center">
       <div className=" my-10 btn text-white bg-gradient-to-r from-green-400 hover:to-blue-500 hover:from-pink-500 to-yellow-500 ..."><button><NavLink to="/">Go Back</NavLink></button></div>
       </div>
         </div>
    
     </div>
        
    );
};

export default NotFound;