import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState:{
        nowPlayingMovies: null,
        trailerVideo: null,
        popularMovies: null,
        topRatedMovies: null,
        upComingMovies: null,
        topRatedTvShows: null
    },
    reducers:{
        addNowPlayingMovies: (state,action) => {
            state.nowPlayingMovies = action.payload
        },
        addTrailerVideo: (state,action) => {
            state.trailerVideo = action.payload
        },
        addPopularMovies: (state,action) => {
            state.popularMovies = action.payload
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload
        },
        addUpComingMovies: (state,action) => {
            state.upComingMovies = action.payload
        },
        addTopRatedTvShows: (state, action) => {
            state.topRatedTvShows = action.payload
        }
    }
});

export const {addNowPlayingMovies, addTrailerVideo, addPopularMovies, addTopRatedMovies, addUpComingMovies, addTopRatedTvShows} = movieSlice.actions;

export default movieSlice.reducer;