export default function ButtonMore({handleMoreLoad}) {
    
    return(
        <section className="more">
            <button className="more__btn link" onClick={handleMoreLoad}>Еще</button>
        </section>
    )
}