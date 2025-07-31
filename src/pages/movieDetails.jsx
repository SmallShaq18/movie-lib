import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../api";
import { useNavigate } from 'react-router-dom';


export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchDetails = async () => {
      const res = await getMovieDetails(id);
      setMovie(res);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 scrolls to top

      // Fetch cast
      const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
      const creditsData = await creditsRes.json();
      setCast(creditsData.cast.slice(0, 3));

      // Fetch similar movies
      const similarRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
      const similarData = await similarRes.json();
      setSimilar(similarData.results.slice(0, 4));
    };
    fetchDetails();
  }, [id]);

  if (!movie) return <p className="text-center mt-5">Loading movie details...</p>;

  return (
    <div className="container my-5">
      <button onClick={() => navigate(-1)} className="text-white d-lg-none btn btn-sm btn-outline-secondary position-absolute">
        ← Back
      </button>

      <div className="row g-4 align-items-start bg-dark text-white p-4 rounded shadow-lg" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p className="fst-italic">{movie.release_date} • {movie.runtime} min</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
          <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
          <p className="mt-3">{movie.overview}</p>

          <div className="mt-5 d-flex flex-wrap gap-4">
            <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " trailer")}`} target="_blank" rel="noreferrer" className="btn btn-danger">▶️ Watch Trailer</a>
            <a href={`https://www.justwatch.com/ng/search?q=${encodeURIComponent(movie.title)}`} target="_blank" rel="noreferrer" className="btn btn-success">📺 Where to Watch</a>
            <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noreferrer" className="btn btn-primary">🔗 View on TMDb</a>
          </div>
        </div>
      </div>

      {/* CAST */}
      {cast.length > 0 && (
        <div className="mt-5">
          <h4>🎭 Top Cast</h4>
          <ul className="list-group list-group-flush">
            {cast.map(actor => (
              <li key={actor.id} className="list-group-item">
                <strong>{actor.name}</strong> as <em>{actor.character}</em>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SIMILAR MOVIES */}
      {similar.length > 0 && (
        <div className="mt-5">
          <h4>🎬 Similar Movies</h4>
          <div className="row">
            {similar.map(movie => (
              <div key={movie.id} className="col-6 col-md-3 mb-3">
                <div className="card h-100 shadow-sm">
                 <Link to={`/movies/${movie.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="card-img-top" />
                  </Link>
                  <div className="card-body p-2 text-center">
                    <h6 className="card-title">{movie.title}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
