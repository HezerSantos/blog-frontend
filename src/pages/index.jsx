import { Link } from "react-router-dom"
import MainNavBar from "../components/MainNavBar"
import Footer from "../components/Footer"
const HomePage = () => {
    return(
        <>
            <MainNavBar />
            <header className="home__header">
                <div className="header__text">
                    <h1>The Words</h1>
                    <h1>They Left Behind</h1>
                </div>
                <div className="hero__image"></div>
            </header>
            <main className="">
                <div className="trending__header">
                    <h1>TOP TRENDING</h1>
                </div>
                <section className="blog__container">
                    
                </section>
            </main>
            <Footer />
        </>
    )
}

export default HomePage