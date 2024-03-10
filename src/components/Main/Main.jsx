import AboutProject from "./AboutProject/AboutProject";
import AboutTechs from "./AboutTechs/AboutTechs";
import AboutMe from "./AboutMe/AboutMe";
import PromoProject from "./PromoProject/PromoProject";
import Portfolio from "./Portfolio/Portfolio";


export default function Main() {
    return (
        <main>
            <PromoProject />
            <AboutProject />
            <AboutTechs />
            <AboutMe />
            <Portfolio />
        </main>
    )
}
