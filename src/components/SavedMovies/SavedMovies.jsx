import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies({moviesList}) { // РОУТ saved-movies - "Сохраненные фильмы"
    return (
        <section>
            <SearchForm/>
            <MoviesCardList moviesList={moviesList}/>
        </section>
    )
}