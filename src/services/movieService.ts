import axios from 'axios';
import { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

const token = import.meta.env.VITE_TMDB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface FetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await axiosInstance.get<FetchMoviesResponse>('/search/movie', {
    params: {
      query,
      language: 'en-US',
    },
  });

  return data.results;
};