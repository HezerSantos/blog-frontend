import { Link } from "react-router-dom"

import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
    return(
        <>
        <footer>
            <section className="footer__content">
                <Link to="/home" className="link__home footer__header">TheyWroteIt</Link>
                <ul className="socials__container">
                    <li>Follow Us On: </li>
                    <li>
                        <Link to="" className="link__social">
                            <FaInstagram />
                        </Link>
                    </li>
                    <li>
                        <Link to="" className="link__social">
                            <FaTwitter />
                        </Link>
                    </li>
                    <li>
                        <Link to="" className="link__social">
                            <FaFacebook />
                        </Link>
                    </li>
                </ul>
            </section>
            <section className="footer__content__other">
                <ul className="footer__links">
                    <Link to="" className="footer__link">
                        Discover
                    </Link>
                    <Link to="" className="footer__link">
                        Creators
                    </Link>
                    <Link to="" className="footer__link">
                        About Us
                    </Link>
                    <Link to="" className="footer__link">
                        FAQ
                    </Link>
                </ul>
                <p className="copy__right">
                    © 2025 TheyWroteIt. All Rights Reserved.
                </p>
            </section>
        </footer>
        </>
    )
}

export default Footer