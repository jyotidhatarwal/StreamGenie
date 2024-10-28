import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Login from "./components/Login";
import Browse from "./components/Browse";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { Provider, useDispatch } from "react-redux";
import { addUser, removeUser } from "./utils/userSlice";
import appStore from "./utils/appStore";

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

container.render(
    <Provider store={appStore}>
        <RouterProvider router={appRouter} />
    </Provider>);
