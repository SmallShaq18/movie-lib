import React from "react";
import '../App.css';
import { Link, useSearchParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ApiSearchBar from '../components/apiSearchBar.jsx';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '../components/pagination.jsx';
import { searchMovies, getGenres } from '../api'; // or './api' if same folder



function MovieItem({movies, watchedMovies, onAddToWatched, onRemoveWatched,
    wantMovies, onAddToWant, onRemoveWant }) {

    const [showDetails, setShowDetails] = useState(false);
    
    // Compute isWatched from global
    const isWatched = watchedMovies.some((watched) => watched.id === movies.id);
    // Compute isWant from global
    const isWant = wantMovies.some((want) => want.id === movies.id);

    function handleDetailsClick(){
        setShowDetails(!showDetails);
    }
    function handleWantClick(){
        if (!isWant){
            onAddToWant(movies);
            toast.success(`${movies.title} added to want to watch!`);
        } else {
            onRemoveWant(movies);
            toast.warning(`${movies.title} removed from want to watch!`);
        }
    }
    function handleAddToWatchedClick(){
        if (!isWatched){
            onAddToWatched(movies);
            toast.success(`${movies.title} added to watched!`)
        } else {
            onRemoveWatched(movies);
            toast.warning(`${movies.title} removed from watched!`)
        }
    }

    const buttonStyleWatched = {
        backgroundColor: isWatched ? "rgb(170, 99, 37)" : "#ffffff", color: isWatched ? "#ffffff" : "#000000"
    };
    const buttonStyleWantToWatch = {
        backgroundColor: isWant ? "rgb(170, 99, 37)" : "#ffffff", color: isWant ? "#ffffff" : "#000000"
    };
    
    return (
        <div className=" col-12 col-sm-6 col-lg-3 mb-5">
            <div className="card h-100 m-3 p-2 shadow-sm">
                <img src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
             alt="poster pics" loading='lazy' className="img img-fluid mx-auto d-block" width="200px" height="200px" />
            <h4 className="my-3 text-center">{movies.title}</h4>
            <div className="d-flex justify-content-between">
                <h6>{movies.director}</h6>
                <h6 className="text-danger">{movies.year}</h6>
            </div>
            <div className="d-flex justify-content-between">
                <p>{movies.genre}</p>
                <p className="text-danger">{movies.rating}</p>
            </div>
            <div className="d-flex justify-content-between">
                <button style={buttonStyleWatched} onClick={handleAddToWatchedClick}>
                    {isWatched ? <span><FontAwesomeIcon icon={faEye} /> Remove From</span> : <span><FontAwesomeIcon icon={faEye} /> Add To</span>} Watched
                </button>
                <button style={buttonStyleWantToWatch} onClick={handleWantClick}>
                    {isWant ? <span>Want To Watch <FontAwesomeIcon icon={faCheck} /> </span> : <span>Want To Watch</span> }
                </button>
            </div>
            <button className="my-3" onClick={handleDetailsClick}>
                {showDetails ? 'Hide' : 'Show Brief'} Details
            </button>
            {showDetails && <small className='text-muted mb-2 fs-6 fw-light'>{movies.overview.slice(0, 200)}...</small>}
            <Link to={`/movies/${movies.id}`} className="btn btn-dark">View Full Details</Link>
            </div>
        </div>
    );

}



function MovieListSearch({filteredMovies, watchedMovies, onAddToWatched, onRemoveWatched,
    wantMovies, onAddToWant, onRemoveWant
}){

    useEffect(() => {
    const search = async () => {
    const results = await searchMovies('inception');
    console.log(results); // or setMovies(results)
  };
  search();
}, []);
    
    return(
        <div>
            {filteredMovies.length > 0 && (
                <div className="row justify-content-center p-3">
                    {filteredMovies.map((movie) => (
                    <MovieItem movies={movie} key={movie.id} watchedMovies={watchedMovies}
                     onAddToWatched={onAddToWatched} onRemoveWatched={onRemoveWatched}
                     wantMovies={wantMovies} onAddToWant={onAddToWant} onRemoveWant={onRemoveWant} />
                ))}
                </div>
            )}
        </div>
    );
}


export default function Movies({watchedMovies, setWatchedMovies, wantMovies = [], setWantMovies}) {

    const [searchQuery, setSearchQuery] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = parseInt(searchParams.get("page")) || 1;
    const [page, setPage] = useState(pageParam);
    const [totalPages, setTotalPages] = useState(1);

    const getItemsPerScreen = () => {
    const width = window.innerWidth;
    if (width < 576) return 8;        // small phones
    if (width < 768) return 12;        // large phones
    if (width < 992) return 16;        // tablets
    return 20;                        // desktops and up
    };

    const [itemsPerScreen, setItemsPerScreen] = useState(getItemsPerScreen());

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  useEffect(() => {
  const handleResize = () => {
    setItemsPerScreen(getItemsPerScreen());
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  // Fetch popular movies (with optional genre)
  const fetchMovies = async () => {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`;
  if (selectedGenre) {
    url += `&with_genres=${selectedGenre}`;
  }

  const res = await fetch(url);
  const data = await res.json();
  setMovies(data.results);
  setTotalPages(data.total_pages);
};

// Search movies by query
const searchMovies = async () => {
  if (!searchQuery.trim()) return;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery)}&page=${page}`;

  const res = await fetch(url);
  const data = await res.json();
  setMovies(data.results);
  setTotalPages(data.total_pages);
};

useEffect(() => {
  if (searchQuery) {
    searchMovies();
  } else {
    fetchMovies();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 scrolls to top
}, [searchQuery, page, selectedGenre]);

    function handleAddToWatched (movies) {
        setWatchedMovies([...watchedMovies, movies]);
        console.log('added');
    }
    function handleRemoveWatched (movies){
        const newWatched = watchedMovies.filter((movie) => movie.id !== movies.id);
        setWatchedMovies(newWatched);
    }

    function handleAddToWant (movies) {
        setWantMovies([...wantMovies, movies]);
        console.log('added');
    }
    function handleRemoveWant (movies){
        const newWant = wantMovies.filter((movie) => movie.id !== movies.id);
        setWantMovies(newWant);
    }
    const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setPage(1); // reset to page 1 when genre changes
    setSearchParams({ page: 1, genre: e.target.value });
  };
  // When changing page:
const handlePageChange = (newPage) => {
  setPage(newPage);
  setSearchParams({ page: newPage, genre: selectedGenre });
};

const handleSearch = (query) => {
  setSearchQuery(query);
  setPage(1); // Reset to page 1 for new search
};  

const visibleMovies = movies.slice(0, itemsPerScreen); // Only show based on screen size

    if (visibleMovies.length === 0){

        return (
            <div className="container-fluid">
                <h1 className="text-center py-3">MOVIE LIBRARY</h1>
                <ApiSearchBar onSearch={handleSearch}  />
                <h2 className='text-center mt-5 py-2 banner'>ALL MOVIES</h2>
                <h5 className="text-white fw-bold p-3">{visibleMovies.length} item(s) here</h5>
                <p className="text-center mt-5">Please wait while loading movies... (if you searched for something then it doesn't exist)</p>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2 className="my-4 text-center">🎞️ Browse Movies</h2>
            <ApiSearchBar onSearch={handleSearch} />
            <div className="d-flex justify-content-center">
            <select className="form-select my-4 justify-content-center" value={selectedGenre} style={{ maxWidth: "400px", width: "100%" }}
                onChange={handleGenreChange}>
                <option value="">All Genres</option>
                    {genres.map((genre) => (
                <option value={genre.id} key={genre.id}>
                    {genre.name}
                </option>
                    ))}
            </select>
            </div>
            <h5 className="text-dark fw-bold p-3">{visibleMovies.length} item(s) here</h5>
            <MovieListSearch filteredMovies={visibleMovies} 
            watchedMovies={watchedMovies} onAddToWatched={handleAddToWatched} onRemoveWatched={handleRemoveWatched}
            wantMovies={wantMovies} onAddToWant={handleAddToWant} onRemoveWant={handleRemoveWant} />
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange}/>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );

}