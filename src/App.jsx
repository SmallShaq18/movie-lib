import './App.css';
import {Route, Routes} from 'react-router-dom';
import Navbar from './components/nav.jsx';
import Home from './pages/homePage.jsx';
import WantToWatch from './pages/wantToWatch.jsx';
import Watched from './pages/watched.jsx';
import NoPage from './pages/noPage.jsx';
import MovieDetails from './pages/movieDetails.jsx';
import Movies from './pages/movies.jsx';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';



export default function App(){

    // Load from localStorage or default to []
    const [watchedMovies, setWatchedMovies] = useState(() => {
    const saved = localStorage.getItem("watchedMovies");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever watchedMovies changes
  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  function handleRemoveWatched(movie) {
    setWatchedMovies(watchedMovies.filter((m) => m.id !== movie.id));
}


// Load from localStorage or default to []
  const [wantToWatch, setWantToWatch] = useState(() => {
    const saved = localStorage.getItem("wantToWatch");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever wantToWatch changes
  useEffect(() => {
    localStorage.setItem("wantToWatch", JSON.stringify(wantToWatch));
  }, [wantToWatch]);

  function handleRemoveWant(movie) {
    setWantToWatch(wantToWatch.filter((m) => m.id !== movie.id));
  }

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies" element={<Movies watchedMovies={watchedMovies} setWatchedMovies={setWatchedMovies}
          wantMovies={wantToWatch} setWantMovies={setWantToWatch} />} />
        <Route path="watched" element={<Watched watchedMovies={watchedMovies} onRemoveWatched={handleRemoveWatched} />} />
        <Route path="wantToWatch" element={<WantToWatch wantMovies={wantToWatch} onRemoveWant={handleRemoveWant} />} />
        <Route path="movies/:id" element={<MovieDetails />} />
        <Route path="*" element={<NoPage />} /> {/* 404 */}
      </Routes>   
    </div>
    );
}