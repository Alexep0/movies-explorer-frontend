import { useLocation } from "react-router-dom";


export default function MoviesCard({ savedFilms = [], movie, handleClickFavourite }) {
    const location = useLocation();
    const path = location.pathname; 
    const buttonSave = savedFilms.some((film) => film.movieId === movie.id);
    const buttonToggleClassName = `movie__button ${buttonSave ? "movie__button_saved" : ''}`

    const time = Math.floor(movie.duration / 60)
    const minutes = movie.duration % 60

    const imageUrl = path === "/saved-movies" ? movie.image : "https://api.nomoreparties.co" + movie.image.formats.thumbnail.url;

    const link = movie.trailerLink;

    function toggleButton() {
        handleClickFavourite(movie, !buttonSave)
    }

    function deleteButton() {
        handleClickFavourite(movie);
    }

    return (
        <li className="movie__item">
            <a href={link} target="_blank" rel="noreferrer">
                <img className="movie__image" alt="постер к фильму" src={imageUrl} />
            </a>
            {path === "/saved-movies" ? (
                <button className="movie__button movie__button_delete" onClick={deleteButton} />
            ) : (
                <button type="button" className={buttonToggleClassName} onClick={toggleButton}>
                    {!buttonSave ? "Сохранить" : ''}
                </button>
            )}
            <div className="movie__content">
                <h2 className="movie__title">{movie.nameRU}</h2>
                <p className="movie__duration">{`"${time}ч ${minutes}м"`}</p>
            </div>
        </li>
    )
}