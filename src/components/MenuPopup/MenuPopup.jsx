import {Link, NavLink} from "react-router-dom";

export default function MenuPopup({isOpen, onClose}) {

    return (
        <header>
            <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
                <div className="popup__container">
                    <button
                        type="button"
                        aria-label="Close"
                        className="popup__buttonClose"
                        onClick={onClose}
                    />
                    <div className="popup__navigation">
                        <nav className="popup__links">
                            <NavLink
                                onClick={onClose}
                                to="/"
                                className={({isActive}) =>
                                    `${isActive ? "popup__links-active" : ""} popup__title link`}>Главная</NavLink>
                            <NavLink
                                onClick={onClose}
                                to="/movies"
                                className={({isActive}) =>
                                    `${isActive ? "popup__links-active" : ""} popup__title link`}>Фильмы</NavLink>
                            <NavLink
                                onClick={onClose}
                                to="/saved-movies"
                                className={({isActive}) =>
                                    `${isActive ? "popup__links-active" : ""} popup__title link`}>Сохранённые фильмы</NavLink>
                        </nav>
                        <Link onClick={onClose} to="/profile" className="popup__linkProfile link">Аккаунт</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}