import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/API_Auths";


const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const getNowPlayingMovies = async () => {
        const data = await fetch(`${BASE_URL}/now_playing`,API_OPTIONS);
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));
    };

    useEffect(() => {
        getNowPlayingMovies();
    },[]);

   
};

export default useNowPlayingMovies;