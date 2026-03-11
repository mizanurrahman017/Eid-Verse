import React from 'react';

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from '../Pages/Root/Root';
import ErrorPage from '../Pages/Root/ErrorPage/ErrorPage';
import Home from '../Pages/Root/Home/Home';
import Wish from '../Pages/Root/Wish/Wish';


export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
          index:true,
          path:"/",
          Component:Home,
        },
        {
            path:"wish",
            element:<Wish></Wish>
        },
        
    ]
  },
]);