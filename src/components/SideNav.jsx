import { MdPublish } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideNav = () => {
    return(
        <>
            <div className="side__nav__wrapper">
                <aside className="dashboard__nav">
                    <button className="dashboard__nav__link">
                        <MdPublish className="dash__nav__icon" />
                        <p>Published</p>
                    </button>
                    <button className="dashboard__nav__link">
                        <RiDraftLine className="dash__nav__icon" />
                        <p>Unpublished</p>
                    </button>
                    <button className="dashboard__nav__link">
                        <FaComment className="dash__nav__icon" />
                        <p>Comments</p>
                    </button>
                    <div className="create__button">
                        <Link to={"/dashboard/create-blog"}>
                            Create +
                        </Link>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default SideNav