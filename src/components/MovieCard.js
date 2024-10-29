import { IMAGE_BASE_URL } from "../utils/constants";

const MovieCard = ({posterPath}) => {
    console.log("Movie card", posterPath);
    return(
        <div className="w-48 pr-4">
            <img alt="movie-card" src={`${IMAGE_BASE_URL}/${posterPath}`} />
        </div>
    )
}

export default MovieCard;