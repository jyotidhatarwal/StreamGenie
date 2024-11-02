import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGO } from "../utils/constants";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { toggleGptSearch } from "../utils/gptSlice";


const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
            navigate("/error");
          });
    }

    const handleGptSearchClick = () => {
      dispatch(toggleGptSearch());
    }

    useEffect(()=> {
       const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in
              
              const { uid, email, displayName, photoURL } = user;
    
              dispatch(addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL
              }));
              navigate("/browse");
            } else {
              // User is signed out
              dispatch(removeUser());
              navigate("/");
            }
          });
          return () => unsubscribe();
    },[]);

    return(
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img src= {LOGO}
                alt="netflix-logo"
                className="w-44" />

            <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
            >
            {showGptSearch ? "Back" : "GPT Search"}
            </button>

            {user && 
            (
                <div className="flex p-2">
                   <button onClick={handleSignOut} className="grid items-center mr-6 sm:mr-8 hover:bg-gray-800 hover:bg-opacity-60 p-2 rounded-lg">
                    <img className="ml-[2px] h-12 rounded-lg" alt="usericon" src="https://occ-0-3215-3663.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABRH7L1z339SB5FvV78__fxkoivAD8xiqCgV3nkQtvWnGpEfaj6cFusLqDv88jdJTAsJOGu9TgwZbUB9ZkdtuOUMCb3I3P-8.png?r=f6f" />
                    <span className="font-semibold mt-1 text-white rounded-lg text-[10px] sm:text-[12px]">Sign Out</span></button>
                </div>
            )
            }
        </div>
    )
}

export default Header;