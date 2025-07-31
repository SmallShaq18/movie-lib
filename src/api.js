// src/api.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch popular movies
export const fetchPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await res.json();
  return data.results;
};

// Optionally: Add more functions like search or movie details
// 🔵 2. Search movies by keyword
export const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`);
  const data = await res.json();
  return data.results;
};


// 🔴 3. Get movie details by ID
export const getMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data;
};

// 🟡 4. (Optional) Get movies by genre ID
export const fetchMoviesByGenre = async (genreId, page = 1) => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`);
  const data = await res.json();
  return data.results;
};

// ⚪ 5. (Bonus) Get top rated movies
export const fetchTopRatedMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await res.json();
  return data.results;
};

// 🔵 6. (Optional) Get movie genres
export async function getGenres() {
  const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
  const data = await res.json();
  return data.genres;
}
