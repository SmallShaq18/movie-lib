import React from "react";
import { useState, useEffect } from "react";
import LocalSearchBar from "../components/localSearchBar";
import Pagination from "../components/pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link, useSearchParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function WatchedMovieItem({movies, onRemoveWatched}){

    const [showDetails, setShowDetails] = useState(false);

    function handleDetailsClick(){
        setShowDetails(!showDetails);
    }

    function handleRemoveWatchedClick() {
        onRemoveWatched(movies);
    }

    const buttonStyleWatched = {
        backgroundColor: "rgb(170, 99, 37)",
        color: "#ffffff"
    };

    
    return (
        <div className="col-12 col-sm-6 col-lg-3 mb-5">
            <div className="card h-100 shadow-lg m-3 p-2">
                <img src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`} alt="poster pics" loading='lazy' className="img img-fluid mx-auto d-block" width="200px" height="200px" />
            <h4 className="my-3 text-center">{movies.title}</h4>
            <div className="d-flex justify-content-between">
                <h6>{movies.director}</h6>
                <h6 className="text-danger">{movies.year}</h6>
            </div>
            <div className="d-flex justify-content-between">
                <p>{movies.genre}</p>
                <p className="text-danger">{movies.rating}</p>
            </div>
                <button style={buttonStyleWatched} onClick={handleRemoveWatchedClick}>
                    <FontAwesomeIcon icon={faEye} /> Remove From Watched
                </button>
            <button className="my-3" onClick={handleDetailsClick}>
                {showDetails ? 'Hide the' : 'Show more'} details
            </button>
            {showDetails && <small className='text-muted mb-2 fs-6 fw-light'>{movies.overview.slice(0, 200)}...</small>}
            <Link to={`/movies/${movies.id}`} className="btn btn-dark">View Full Details</Link>
            </div>
        </div>
    );

}

export default function Watched({watchedMovies = [], onRemoveWatched}){

    const [filterText, setFilterText] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = parseInt(searchParams.get("page")) || 1;
    const [page, setPage] = useState(pageParam);

    const getItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 576) return 8;
    if (width < 768) return 12;
    if (width < 992) return 16;
    return 20;
    };

   const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

    useEffect(() => {
     const handleResize = () => {
     setItemsPerPage(getItemsPerPage());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);


    // When changing page:
    const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams({ page: newPage });
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 scrolls to top
    }, [page]);

    const filteredMovies = watchedMovies.filter((movie) => {
        const nameMatches = movie.title.trim().toUpperCase().includes(filterText.trim().toUpperCase());
        return nameMatches;
    });
   
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedMovies = filteredMovies.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

    if (filteredMovies.length === 0){

        return (
            <div>
                <h2 className="text-center banner py-2">WATCHED</h2>
                <LocalSearchBar filterText={filterText} onFilterTextChange={setFilterText}  />
                <h5 className=" fw-bold p-3">{filteredMovies.length} item(s) here</h5>
                <p className="text-center p-5 fw-bold">Seems like you have not added a movie here. (if you searched for something then it doesn't exist here)</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-center banner py-2">WATCHED</h2>
            <LocalSearchBar filterText={filterText} onFilterTextChange={setFilterText}  />
            
            <h5 className="fw-bold p-3">{paginatedMovies.length} item(s) here</h5>
            <div className="row justify-content-center p-3">
                    {paginatedMovies.map((movie) => (
                    <WatchedMovieItem movies={movie} key={movie.id} onRemoveWatched={onRemoveWatched} />
                ))}
                </div>
                <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>
    );

}
