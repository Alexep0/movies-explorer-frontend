import ButtonMore from "../ButtonMore/ButtonMore";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({savedFilms, moviesList, isLoading, handleMore, filmsRemains, handleClickFavourite }) {
    const { pathname } = useLocation();

 
    return (
        <section className="movie">
            {isLoading ? <Preloader /> : (
                <>
                    <ul className="movie__list">
                        {moviesList.map((movie) => (
                            <MoviesCard
                                movie={movie}
                                key={movie.id || movie.movieId} 
                                savedFilms={savedFilms}
                                handleClickFavourite={handleClickFavourite} />
                        ))}
                    </ul>
                    {filmsRemains > 0 && pathname !== '/saved-movies' && (
                        <ButtonMore handleMoreLoad={handleMore} />)}
                </>
            )}
        </section>
    )
}
