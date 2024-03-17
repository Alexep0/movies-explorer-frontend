import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";

export default function SearchForm({handleSetSearch, searchQuery, handleSetSearchTumbler, searchTumbler}) {
    const [input, setInput] = useState(searchQuery || '');
    const [error, setError] = useState("");
    
    function handleFindSubmit(e) {
        e.preventDefault()

        if (input.trim() === "") {
            setError("Нужно ввести ключевое слово");
            return;
        }

        handleSetSearch(input);
        setError("");
    }

    function handleCheckbox () {
        handleSetSearch(input);
        handleSetSearchTumbler(!searchTumbler);
    }

    return (
        <section className="search">
            <form className="search__form" onSubmit={handleFindSubmit}>
                <input
                    type="text"
                    className="search__input"
                    placeholder="Фильм"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        setError("");
                    }}
                    required
                />
                <button className="search__btn-find link" type="submit"/>
            </form>
            <FilterCheckbox handleSetSearchTumbler={handleCheckbox} searchTumbler={searchTumbler}/>
        </section>
    )
}
