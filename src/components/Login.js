import { useRef, useState } from "react";
import Header from "./Header";
import { validateForm } from "../utils/validateForm"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase"
const Login = () => {

    const [isSignedIn,setIsSignedIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleBtnClick = () => {
        const message = validateForm(email.current.value,password.current.value);
        console.log(message);
        setErrorMessage(message);
        if(message) return;
        if(!isSignedIn){
            // sign up logic

        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log(user);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessages = error.message;
                        setErrorMessage(errorCode+ " - "+ errorMessages);
                        console.log("Inside Sign up Logic");
                    });
            
        }else{
            // sign in logic
            signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log(user);
                      })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessages = error.message;
                        setErrorMessage(errorCode+ " - "+ errorMessages);
                        console.log("Inside sign in logic");
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
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    alt="logo"
                />
            </div>
            <form onSubmit={(e) => {e.preventDefault()}} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignedIn ? "Sign In" : "Sign Up"}</h1>
                {!isSignedIn && (
                    <input
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