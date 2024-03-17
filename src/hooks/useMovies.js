import { moviesApi } from "../utils/MoviesApi";
import {useState, useMemo} from "react";
import {shortDuration} from "../utils/constants";

export function useMovies() {
    const init = JSON.parse(localStorage.getItem('allMovies') || "[]");

    const [films, setFilms] = useState(init);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
    const [searchTumbler, setSearchTumbler] = useState(localStorage.getItem('searchTumbler') === "true" || false);

    const getMoviesFromApi = async () => {
        try {
            setIsLoading(true);
            const films = await moviesApi.getMovies();
            localStorage.setItem('allMovies', JSON.stringify(films));
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
            const isShort = searchTumbler && duration < shortDuration;

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

        localStorage.setItem("searchedFilms", JSON.stringify(result));
        return result;
    } , [searchQuery, searchTumbler, films.length]);

    const notFound = !isLoading && (searchTumbler || searchQuery.length > 0) && !filteredFilms.length;

    const handleSetSearch = (query) => {
        setSearchQuery(query);
        localStorage.setItem('searchQuery', query);
    }

    const handleSetSearchTumbler = (tumbler) => {
        setSearchTumbler(tumbler);
        localStorage.setItem('searchTumbler', tumbler);
    }

    return {
        handleSetSearch,
        handleSetSearchTumbler,
        filteredFilms,
        notFound,
        isLoading,
        searchQuery,
        searchTumbler
    }

}