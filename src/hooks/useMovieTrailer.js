import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/API_Auths";
import { BASE_URL } from "../utils/constants";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getTrailerVideo = async () => {
        const data = await fetch(`${BASE_URL}/${movieId}/videos`, API_OPTIONS);
        const json = await data.json();
        const trailer = json.results.filter(video => video?.type === 'Trailer');
        dispatch(addTrailerVideo(trailer[0]));
        
    }

    useEffect(()=>{
        getTrailerVideo();
    },[]);

}

export default useMovieTrailer;