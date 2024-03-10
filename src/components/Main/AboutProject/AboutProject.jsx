function AboutProject() {
    return (
        <section className="aboutProject" id="aboutProject">
            <div className="text-head">О проекте</div>
            <div className="aboutProject__content">
                <div className="aboutProject__info">
                    <h2 className="aboutProject__title">Дипломный проект включал 5 этапов</h2>
                    <p className="aboutProject__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="aboutProject__info">
                    <h2 className="aboutProject__title">На выполнение диплома ушло 5 недель</h2>
                    <p className="aboutProject__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="aboutProject__process">
                <div className="aboutProject__info-progress">
                    <h3 className="aboutProject__title-start">1 неделя</h3>
                    <p className="aboutProject__subtitle-progress">Back-end</p>
                </div>
                <div className="aboutProject__info-progress">
                    <h3 className="aboutProject__title-progress">4 недели</h3>
                    <p className="aboutProject__subtitle-progress">Front-end</p>
                </div>
            </div>
        </section>
    )
}

export default AboutProject