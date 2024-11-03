import { useRef, useState } from "react";
import Header from "./Header";
import { validateForm } from "../utils/validateForm"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { BG_PHOTO_URL, USER_PHOTO } from "../utils/constants";
import { useDispatch } from "react-redux";
const Login = () => {

    const [isSignedIn,setIsSignedIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

   const dispatch = useDispatch();

    const handleBtnClick = () => {
        const message = validateForm(email.current.value,password.current.value);
        setErrorMessage(message);
        if(message) return;
        if(!isSignedIn){
            // sign up logic

        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        updateProfile(user, {
                            displayName: name.current.email, photoURL: USER_PHOTO
                          }).then(() => {
                            // Profile updated!
                            const { uid, email, displayName, photoURL } = auth.currentUser;
                            dispatch(
                              addUser({
                                uid: uid,
                                email: email,
                                displayName: displayName,
                                photoURL: photoURL,
                              })
                            );
                           
                          }).catch((error) => {
                            // An error occurred
                            setErrorMessage(error.message);
                           
                          });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessages = error.message;
                        setErrorMessage(errorCode+ " - "+ errorMessages);
                    });
            
        }else{
            // sign in logic
            signInWithEmailAndPassword(
                auth, 
                email.current.value,
                password.current.value)
                    .then((userCredential) => {
                        const user = userCredential.user;
                       
                      })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessages = error.message;
                        setErrorMessage(errorCode+ " - "+ errorMessages);
                    });
        }
    }

    const toggleSignInForm = () => {
        setIsSignedIn(!isSignedIn);
    }

    return(
        <div>
            <Header />
            <div className="absolute">
                <img
                    src={BG_PHOTO_URL}
                    alt="logo"
                />
            </div>
            <form onSubmit={(e) => {e.preventDefault()}} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignedIn ? "Sign In" : "Sign Up"}</h1>
                {!isSignedIn && (
                    <input
                    ref={name}
                    type="text"
                    placeholder="Name"
                    className="p-4 my-4 w-full bg-gray-700"
                    />
                )}
                <input
                    ref={email}
                    type="text"
                    placeholder="Email Address"
                    className="p-4 my-4 w-full bg-gray-700"
                />

                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-4 my-4 w-full bg-gray-700"
                />

                <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

                <button
                 className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleBtnClick}
                >{isSignedIn ? "Sign In" : "Sign Up"}</button>

                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                     {isSignedIn ?  "New to Netflix? Sign Up Now"
                                : "Already registered? Sign In Now."}</p>

            </form>
        </div>
    )
}

export default Login;