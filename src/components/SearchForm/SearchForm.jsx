import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
export default function SearchForm() {
    function handleFindSubmit(e) {
        e.preventDefault()
    }

    return (
        <section className="search">
            <form className="search__form" onSubmit={handleFindSubmit}>
                <input
                    type="text"
                    className="search__input"
                    placeholder="Фильм"
                    required
                />
                <button className="search__btn-find link" type="submit"/>
            </form>
            <FilterCheckbox/>
        </section>
    )
}