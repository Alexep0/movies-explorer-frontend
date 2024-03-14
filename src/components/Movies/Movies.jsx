import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useMovies } from "../../hooks/useMovies";
import useResize from "../../hooks/useResize";
import {useState, useEffect} from "react";
import MainApi from "../../utils/MainApi";

const configForResize = {
    4096: {
        count: 12,
        plus: 3
    }, 
    1297: {
        count: 8,
        plus: 2
    }, 
    767: {
        count: 5,
        plus: 2
    }
}

function getCurrentConfig(width) {
    if (width < 767) {
        return configForResize[767];
    } else if (width < 1297) {
        return configForResize[1297];
    } else if (width < 4096) {
        return configForResize[4096];
    }
}

export default function Movies() {
    const [filmsShow, setFilmsShow] = useState([]);
    const [config, setConfig] = useState({});
    const [savedFilms, setSavedFilms] = useState([]);

    const { 
        handleSetSearch,
        handleSetSearchTumbler,
        filteredFilms,
        notFound,
        isLoading,
        searchQuery,
        searchTumbler
    } = useMovies();

    const mainApi = new MainApi();

    const screenWidth = useResize();

    useEffect(() => {
        setConfig(getCurrentConfig(screenWidth));
    }, [screenWidth]);

    function handleMore() {
        const newCount = filmsShow.length + config.plus;
        const newFilms = filteredFilms.slice(0, newCount);
        setFilmsShow(newFilms);
    }

    useEffect(() => {
        const sliceData = filteredFilms.slice(0, getCurrentConfig(screenWidth).count);
        setFilmsShow(sliceData);
    }, [filteredFilms, screenWidth]);

    useEffect(() => {
        const savedMoviesLS = localStorage.getItem('savedMovies');

        if (savedMoviesLS) {
            setSavedFilms(JSON.parse(savedMoviesLS));
        } else {
            mainApi.getSavedMovies(localStorage.getItem('jwt')) 
            .then(res => {
                setSavedFilms(res);
                localStorage.setItem('savedMovies', JSON.stringify(res));
            })
        }


    }, []);

    async function handleClickFavourite(movie, isLike) {
        const jwt = localStorage.getItem('jwt');
        
        if (isLike) {
            try {
                const res = await mainApi.saveMovie({
                        country: movie.country,
                        director: movie.director,
                        duration: movie.duration,
                        year: movie.year,
                        description: movie.description,
                        image: "https://api.nomoreparties.co" + `${movie.image.url}`,
                        trailerLink: movie.trailerLink,
                        thumbnail: "https://api.nomoreparties.co" + `${movie.image.url}`,
                        movieId: movie.id,
                        nameRU: movie.nameRU,
                        nameEN: movie.nameEN,
                }, jwt);
                const prevSaved = JSON.parse(localStorage.getItem('savedMovies') || "[]");
                const newSaved = prevSaved.concat(res);
                setSavedFilms(newSaved);
                localStorage.setItem('savedMovies', JSON.stringify(newSaved));
            } catch(err) {
                console.log(err);
            }
        } else {
            try {
                const res = await mainApi.deleteMovie(movie.id, jwt);
                const prevSaved = JSON.parse(localStorage.getItem('savedMovies') || "[]");
                const newSaved = prevSaved.filter(item => item.movieId !== movie.id);
                setSavedFilms(newSaved);
                localStorage.setItem('savedMovies', JSON.stringify(newSaved));
            } catch (err) {
                console.log(err);
            }
        }
    }
    
    return (
        <section>
            <SearchForm 
            handleSetSearch={
                handleSetSearch
            } searchQuery={
                searchQuery
            } handleSetSearchTumbler={handleSetSearchTumbler}
             searchTumbler={searchTumbler}/>
            <MoviesCardList 
                savedFilms={savedFilms}
                filmsRemains={filteredFilms.length - filmsShow.length}
                moviesList={filmsShow}
                handleClickFavourite={handleClickFavourite}
                isLoading={isLoading}
                handleMore={handleMore}
                />
        </section>
    )
}
