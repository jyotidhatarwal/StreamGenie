import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/API_Auths";
import { useEffect } from "react";

const usePopularMovies = () => {

    const dispatch = useDispatch();
    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular', API_OPTIONS);
        const json = await data.json();
        dispatch(addPopularMovies(json.results));
        
      }
      useEffect(()=>{
        getPopularMovies();
      },[]); 
}

export default usePopularMovies;

