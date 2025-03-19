import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({obj_movie}){
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(obj_movie.id)
    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(obj_movie.id)
        else addToFavorites(obj_movie)
    }
    return (
        <div className="movie-card">
            <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${obj_movie.poster_path}`} alt={obj_movie.title}/>
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`}  onClick={onFavoriteClick}>
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{obj_movie.title}</h3>
                <p>{obj_movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    )
}

export default MovieCard