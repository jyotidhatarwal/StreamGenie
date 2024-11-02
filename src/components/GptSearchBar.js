import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addGptMovies } from "../utils/gptSlice";
import openai from "../utils/openai";

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

        const gptResults = await openai.chat.completions.create({
            messages: [{ role: "user", content: gptQuery }],
            model: "gpt-3.5-turbo",
          });
          console.log(gptResults.choices?.[0]?.message?.content);
          // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
          const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
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