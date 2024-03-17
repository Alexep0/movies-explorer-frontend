import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useSavedMovies } from "../../hooks/useSavedMovies";

export default function SavedMovies() { // РОУТ saved-movies - "Сохраненные фильмы"
    const {
        handleSetSearch,
        handleSetSearchTumbler,
        filteredFilms: moviesList,
        notFound,
        isLoading,
        searchQuery,
        searchTumbler,
        handleClickFavourite
    } = useSavedMovies();

    return (
        <section>
            <SearchForm
             handleSetSearch={
                handleSetSearch
            } searchQuery={
                searchQuery
            } handleSetSearchTumbler={handleSetSearchTumbler}
             searchTumbler={searchTumbler}/>
            <MoviesCardList moviesList={moviesList} handleClickFavourite={handleClickFavourite}/>
        </section>
    )
}
