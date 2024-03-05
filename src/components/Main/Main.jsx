import AboutProject from "./AboutProject/AboutProject";
import AboutTechs from "./AboutTechs/AboutTechs";
import AboutMe from "./AboutMe/AboutMe";
import PromoProject from "./PromoProject/PromoProject";


export default function Main() {
    return (
        <main>
            <PromoProject />
            <AboutProject />
            <AboutTechs />
            <AboutMe />
        </main>
    )
}
