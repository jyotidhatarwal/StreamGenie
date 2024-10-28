import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/API_Auths";


const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    console.log("Inside playing movies");

    const getNowPlayingMovies = async () => {
        const data = await fetch(`${BASE_URL}/now_playing`,API_OPTIONS);
        console.log("data->", data);
        const json = await data.json();
        console.log("This is movie data", json);
        dispatch(addNowPlayingMovies(json.results));
    };

    useEffect(() => {
        getNowPlayingMovies();
    },[]);

   
};

export default useNowPlayingMovies;