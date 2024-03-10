import {Link, NavLink} from "react-router-dom";

export default function Navigation({openMenu}) {
    return (
        <section className="navigation">
            <div className="header">
                <Link className="header__link-logo link" to="/"/>
                <nav className="navigation__menu">
                    <NavLink
                        to="/movies"
                        className={({isActive}) =>
                            `${isActive ? "navigation__link-active" : ""} navigation__title link`}>Фильмы</NavLink>
                    <NavLink
                        to="/saved-movies"
                        className={({isActive}) =>
                            `${isActive ? "navigation__link-active" : ""} navigation__title link`}>Сохранённые фильмы</NavLink>
                </nav>
                <Link to="/profile" className="navigation__infoProfile link">Аккаунт</Link>

                <div className="menu">
                    <button className="menu__button" type="button" onClick={openMenu}/>
                </div>
            </div>
        </section>
    )
}