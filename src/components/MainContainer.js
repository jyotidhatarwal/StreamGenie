import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {

    const movies = useSelector(store => store.movies?.nowPlayingMovies);

    if(!movies) return;

    const mainHomeMovie = movies[0];

    const {original_title, overview, id} = mainHomeMovie;

    return(
        <div>
            <VideoTitle title={original_title} description={overview} />
            <VideoBackground movieId={id} />
        </div>
    )
}

export default MainContainer;