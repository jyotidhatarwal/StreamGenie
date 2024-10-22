import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Login from "./components/Login";
import Browse from "./components/Browse";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

const App = () => {
    return(
        <div>
           <Outlet />
        </div>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Login />
            },
            {
                path: "/browse",
                element: <Browse />
            }
        ]
    }
]);

const container = ReactDOM.createRoot(document.getElementById("root"));

container.render(<RouterProvider router={appRouter} />);
