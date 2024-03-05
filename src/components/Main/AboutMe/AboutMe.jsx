import profileImg from "../../../images/myFoto.jpg"

function AboutMe() {
    return (
        <section className="aboutMe" id="aboutMe">
            <div className="text-head">Студент</div>
            <div className="aboutMe__info">
                <div className="aboutMe__profile">
                    <h2 className="aboutMe__title">Александр</h2>
                    <p className="aboutMe__subtitle">Фронтенд-разработчик, 24 года</p>
                    <p className="aboutMe__caption">
                        Обо мне:
                        Я родился и живу в Москве, почти окончил кафедру приборостроения МАИ.
                        Еще со школы интересовался программированием, но не было четких целей и грамотного обучения.
                        Информатика была максимум хобби.
                        Но на данный момент появилась необходимость 
                        сменить деятельность и попробовать посвятить свое время разработке.
                    </p>
                    <a className="aboutMe__link link"
                       href="https://github.com/Alexep0"
                       rel="noreferrer"
                       target="_blank">GitHub</a>
                </div>
                <img className="aboutMe__pic" src={profileImg} alt="фото профиля"/>
            </div>
        </section>
    )
}

export default AboutMe