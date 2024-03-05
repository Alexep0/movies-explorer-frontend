import {useState} from "react";

export default function ScrollToUp() { // доработать еще начатьное состояние (при обновлении страницы кнопка видна)
    const [visible, setVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setVisible(scrollTop > 0);
    };

    const scrollToTop = () => {
        const scrollStep = -window.scrollY / (500 / 15);
        const scrollAnimation = window.requestAnimationFrame(scrollToTop);

        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            window.cancelAnimationFrame(scrollAnimation);
        }
    };

    window.addEventListener("scroll", handleScroll);

    return (
        <>
            {visible && (
                <p id="scrollUpBtn" onClick={scrollToTop} className="scrollUp">Наверх</p>
            )}
        </>
    )
}