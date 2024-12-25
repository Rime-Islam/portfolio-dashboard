import { NavLink } from "react-router-dom";


const Navber = () => {
 

// const { user, logOut } = useContext(AuthContext);

    const navLink = <>
    <li className="text-xl font-semibold"><NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-[#ac9b05] underline" : "" }>Home</NavLink></li>
    <li className="text-xl font-semibold"><NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-[#ac9b05] underline" : "" }>Projects</NavLink></li>
    <li className="text-xl font-semibold"><NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-[#ac9b05] underline" : "" }>Courses</NavLink></li>
    <li className="text-xl font-semibold"><NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-[#ac9b05] underline" : "" }>Education</NavLink></li>
    <li className="text-xl font-semibold"><NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-[#ac9b05] underline" : "" }>Exprience</NavLink></li>
    <li className="text-xl font-semibold"><NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-[#ac9b05] underline" : "" }>Skills</NavLink></li>
    
    </>
    return (
        <div>
             <div className="navbar bg-base-100 shadow-lg">
            <div className="navbar-start">
                <div className="dropdown lg:hidden">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  {
                    navLink
                  }
                </ul>
                </div>
                  <div className="flex ml-2 font-serif">
                       <span className="lg:text-2xl font-bold mr-1 lg:mr-2">SL</span> <span className="text-amber-600 font-bold lg:text-2xl">Bakery</span>
                    </div>

             

            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
              {
                navLink
              }
              </ul>
            </div>
            {/* <div className="navbar-end">
            {
        user?.email ? <>
            <button onClick={logOut} className="btn btn-ghost lg:text-xl font-semibold">LogOut</button>
            <MyProfile></MyProfile>
                </>
        : <li className="text-xl font-semibold"><NavLink to="/login" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-[#FF444A] underline" : "" }>Login</NavLink></li>
        
    }
                 
        </div> */}
    </div>
        </div>
    );
};

export default Navber;