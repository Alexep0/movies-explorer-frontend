import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies({moviesList, isLoading}) {
    return (
        <section>
            <SearchForm />
            <MoviesCardList moviesList={moviesList} isLoading={isLoading}/>
        </section>
    )
}