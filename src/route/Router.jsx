
import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../layout/MainLayOut";
import NotFound from "../layout/NotFound";
import Home from "../layout/Pages/Home";
import Login from "../layout/Pages/auth/Login";
import AddSkill from "../layout/Pages/skill/AddSkill";
import AddProject from "../layout/Pages/project/AddProject";
import AddBlog from "../layout/Pages/blog/AddBlog";

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
        {
            path: 'addprojects',
            element: <AddProject />
        },
        {
            path: 'addblog',
            element: <AddBlog />
        },
    ],
    
}
]);

export default myRouter;