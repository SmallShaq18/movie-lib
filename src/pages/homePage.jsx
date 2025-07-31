import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { fetchPopularMovies } from '../api';

export default function Home() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
      fetchPopularMovies().then(data => {
        setMovies(data);
      });
    }, []);
    

    // Shuffle the MOVIES array and take the first 3
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    const featured = shuffled.slice(0, 3);


    return (
        <div className="my-5 container">
            <h3 className="display-5 fw-bold text-center">Welcome to MovieLib🎬 <br/> Explore your favorite movies, manage your watchlist, and discover new films.</h3>
            <p className="lead text-center text-muted">Track what you've watched and plan what to watch next.</p>
            <div className="d-flex justify-content-center mt-4">
                <Link to="/movies" className="btn btn-dark btn-lg">
                    Start Exploring
                </Link>
            </div>

            <h3 className="my-5 text-center">🎥 Featured Pick</h3>
            {/* Mobile Carousel */}
      <div className="d-lg-none">
        <div id="featuredCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {featured.map((movie, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`}
                key={movie.id}>
                <div className="d-flex justify-content-center">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: '400px' }} />
                </div>
                <div className="card-body m-3">
                            <h5 className="card-title">{movie.title}</h5>
                            <small className='text-muted mb-2 fs-6 fw-light'>{movie.overview.slice(0, 200)}...</small>
                            <p className="card-text">{movie.details}</p>
                            <Link to={`/movies/${movie.id}`} className="btn btn-dark">View Details</Link>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#featuredCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#featuredCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      {/* Desktop Grid */}
            {(featured.length === 0) ? (<p className="text-center mt-3">Loading movie details... </p>) : (
            <div className="d-none d-lg-flex justify-content-between">
                {featured.map((movie) => (
                    <div className="card shadow-sm p-3 mb-5 bg-body rounded mx-auto" style={{ width: '18rem' }} key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} loading='lazy' 
                        className="img img-fluid mx-auto d-block" width="200px" height="200px" 
                        alt={movie.title} />
                        <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                            <small className='text-muted mb-2 fs-6 fw-light'>{movie.overview.slice(0, 200)}...</small>
                            <p className="card-text">{movie.details}</p>
                            <Link to={`/movies/${movie.id}`} className="btn btn-dark">View Details</Link>
                        </div>
                    </div>
                ))}
            </div>)}
            
            <h3 className="my-5 text-center">📚 How to Use MovieLib</h3>
            <ul className="list-group bulleted-list mb-5">
                <li className="list-group-item">Browse through the <Link to="/movies" className="text-dark">Movies</Link> section to discover new films.</li>
                <li className="list-group-item">Add movies to your <Link to="/wantToWatch" className="text-dark">Want to Watch</Link> list for future viewing.</li>
                <li className="list-group-item">Mark movies as watched in the <Link to="/watched" className="text-dark">Watched</Link> section.</li>
                <li className="list-group-item">Manage your favorite movies and keep track of what you want to see next.</li>
            </ul>
        </div>
    );
}