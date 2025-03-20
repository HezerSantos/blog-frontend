import { Link } from "react-router-dom"
import MainNavBar from "../components/MainNavBar"
import Footer from "../components/Footer"

import BlogCard from "../components/BlogCard"
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
            <main className="home__main">
                <div className="trending__header">
                    <h1>TOP TRENDING</h1>
                </div>
                <section className="blog__container">
                    <BlogCard />
                </section>
                <div className="next__container">
                    <button>
                        Next Page
                    </button>
                    <p>1 of 100</p>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default HomePage