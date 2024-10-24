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

    const dispatch = useDispatch();

    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in
              
              const { uid, email, displayName, photoURL } = user;
    
              dispatch(addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL
              }))
            } else {
              // User is signed out
              dispatch(removeUser());
            }
          });
    },[]);

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
