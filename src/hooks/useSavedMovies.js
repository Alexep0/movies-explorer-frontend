import {useState, useMemo} from "react";
import  MainApi  from "../utils/MainApi";

export function useSavedMovies() {
    const init = JSON.parse(localStorage.getItem('savedMovies') || "[]");

    const [films, setFilms] = useState(init);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchTumbler, setSearchTumbler] = useState(false);

    const mainApi = new MainApi();

    const getMoviesFromApi = async () => {
        try {
            setIsLoading(true); 
            const films = await mainApi.getSavedMovies(localStorage.getItem('jwt')) 
            localStorage.setItem('savedMovies', JSON.stringify(films));
            setFilms(films);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    } 

    const filteredFilms = useMemo(() => {
        if (isLoading) return [];

        if (!films.length && (searchQuery || searchTumbler)) {
            getMoviesFromApi();
            return [];
        }

        if (!searchQuery && !searchTumbler) {
            return films;
        }

        const result = [];

        films.forEach((film) => {
            const {nameEN, nameRU, duration} = film;

            const isSearched = searchQuery && (nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || nameEN.toLowerCase().includes(searchQuery.toLowerCase()));
            const isShort = searchTumbler && duration < 40;

            if (searchQuery && searchTumbler) {
                if (isSearched && isShort) {
                    result.push(film);
                }
            }

            if (searchQuery && !searchTumbler) {
                if (isSearched) {
                    result.push(film);
                }
            }

            if (!searchQuery.length && searchTumbler) {
                if (isShort) {
                    result.push(film);
                }
            } 
        }) 

        return result;
    } , [searchQuery, searchTumbler, films.length]);

    const notFound = !isLoading && (searchTumbler || searchQuery.length > 0) && !filteredFilms.length;

    const handleSetSearch = (query) => {
        setSearchQuery(query); 
    }

    const handleSetSearchTumbler = (tumbler) => {
        setSearchTumbler(tumbler); 
    }

    const handleClickFavourite = async (movie) => {
        const jwt = localStorage.getItem('jwt'); 
        try {  
            const res = await mainApi.deleteMovie(movie._id, jwt);
            const prevSaved = JSON.parse(localStorage.getItem('savedMovies') || "[]"); 
            const newSaved = prevSaved.filter(item => item._id !== movie._id); 
            setFilms(newSaved);
            localStorage.setItem('savedMovies', JSON.stringify(newSaved));
        } catch (err) {
            console.log(err);
        } 
    }

    return {
        handleSetSearch,
        handleSetSearchTumbler,
        filteredFilms,
        notFound,
        isLoading,
        searchQuery,
        searchTumbler,
        handleClickFavourite
    }

}