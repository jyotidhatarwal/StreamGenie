import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addGptMovies } from "../utils/gptSlice";
import {API_OPTIONS, GEMINI_API_KEY} from "../utils/API_Auths"

const GptSearchBar = () => {

    const searchText = useRef(null);
    const dispatch = useDispatch();

    const getSearchGptMovies = async (movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1", API_OPTIONS);
        console.log("data", data);
        const json = await data.json();
        console.log("GPT Search result", json);
        return json.results;
    }


    const handleGptSearchClick = async () => {
        console.log(searchText.current.value);
        const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query : " +
        searchText.current.value +
        ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Don 2, Heropanti, Captain America, Golmaal, Koi Mil Gaya";

        const { GoogleGenerativeAI } = require("@google/generative-ai");

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(gptQuery);
        console.log("Result->", result);
        console.log(result.response.text());
        const gptMovies = result.response.text().split(", ");
      
           // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
       
           // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]
           // For each movie I will search TMDB API
           const promiseArray = gptMovies.map((movie) => getSearchGptMovies(movie));

           const tmdbResults = await Promise.all(promiseArray);
           console.log(tmdbResults);

           dispatch(addGptMovies({movieNames: gptMovies, movieResults: tmdbResults}));
          
    }
    console.log("Inside GPT Search bar");
    return(
        <div className="pt-[10%] flex justify-center">
            <form className=" w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
                <input ref={searchText} className=" p-4 m-4 col-span-9" type="text" placeholder="What would you like to watch today ?" />
                <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>Search</button>
            </form>
        </div>
    )
}

export default GptSearchBar;