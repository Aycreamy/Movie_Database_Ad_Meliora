import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const fetchTrending = () => tmdb.get("/trending/movie/week");
export const fetchPopular = () => tmdb.get("/movie/popular");
export const searchMovies = (query) =>
  tmdb.get("/search/movie", { params: { query } });
export const fetchMovieDetails = (id) =>
  tmdb.get(`/movie/${id}`, { params: { append_to_response: "videos,credits" } });
