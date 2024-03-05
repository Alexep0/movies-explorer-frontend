import {useLocation} from "react-router-dom";

export  default function Footer() {
    const location = useLocation() // локация пользователя для хэдера и футера
    const path = location.pathname

    return(
        <footer>
            {path === '/' ||
            path === '/movies' ||
            path === '/saved-movies' ? (
                <section className="footer">
                    <article className="footer__info">
                        <p className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                        <div className="footer__navigation">
                            <p className="footer__copyright">&copy; 2024</p>
                            <div className="footer__links">
                                <a href="https://practicum.yandex.ru/"
                                   target="_blank"
                                   rel="noreferrer"
                                   className="footer__link footer__copyright link">Яндекс.Практикум</a>
                                <a href="https://github.com/"
                                   target="_blank"
                                   rel="noreferrer"
                                   className="footer__link footer__copyright link">Github</a>
                            </div>
                        </div>
                    </article>
                </section>) : null}
        </footer>
    )
}
