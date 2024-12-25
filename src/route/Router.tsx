import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../layout/MainLayOut";
import NotFound from "../layout/NotFound";
import Home from "../layout/Pages/Home";
import Register from "../layout/Pages/auth/Register";
import Login from "../layout/Pages/auth/Login";

const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut />,
      errorElement: <NotFound />,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
    ]
},
]);

export default myRouter;