import { Link } from 'react-router-dom';
import dogImage from '../assets/images/dog.jpg';
const BlogCard = ({image, header, text, author, id}) => {
    const url = `/blogs/${id}`
    return(
        <>
            <div className="blog__card">
                <div className="blog__image">
                    <img src={image} alt="" className='blog__image__content'/>
                </div>
                <div className="blog__aside">
                    <h1 className="blog__header">
                        {header}
                    </h1>
                    <p className="blog__text">
                        {text}
                    </p>
                    <div className='blog__aside__footer'>
                        <Link className="blog__open" to={url}>Read More</Link>
                        <p className="blog__author">By: {author}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard