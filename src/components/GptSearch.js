import { BG_PHOTO_URL } from "../utils/constants";
import GptSearchBar from "./GptSearchBar";
import GptSearchMovieSuggestions from "./GptSearchMovieSuggestions";

const GptSearch = () => {
    return (
        <div>
            <div className="absolute -z-10">
                <img src={BG_PHOTO_URL} />
            </div>
            <GptSearchBar />
            <GptSearchMovieSuggestions />
        </div>
    )
}

export default GptSearch;