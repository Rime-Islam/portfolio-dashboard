
import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../layout/MainLayOut";
import NotFound from "../layout/NotFound";
import Home from "../layout/Pages/Home";
import Login from "../layout/Pages/auth/Login";
import AddSkill from "../layout/Pages/skill/AddSkill";

const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut />,
      errorElement: <NotFound />,
      children: [
        {
            path: '/',
            element: <Login></Login>
        },
    ],
},
{
    path: '/dashboard',
    element: <Home></Home>,
    children: [
        {
            path: 'addskills',
            element: <AddSkill />
        },
    ],
    
}
]);

export default myRouter;