function NavTab() {

    // скролл по главной странице (попробовать реализовать на useRef позже)
    const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]'))
    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const blockID = anchor.getAttribute('href').split('#')[1]
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        })
    }

    return(
        <nav className="navTab">
            <a href="#aboutProject" className="navTab__link link">О проекте</a>
            <a href="#aboutTechs" className="navTab__link link">Технологии</a>
            <a href="#aboutMe" className="navTab__link link">Студент</a>
        </nav>
    )
}

export default NavTab