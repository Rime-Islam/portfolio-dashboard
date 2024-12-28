
import Sideber from "../../components/Sideber";
import { Outlet } from "react-router-dom";

const Home = () => {
          
    return (
     <div className="flex">

<div>
<Sideber />
</div>

<div className="p-4">
<Outlet></Outlet>
</div>
    
    </div>
    );
};

export default Home;