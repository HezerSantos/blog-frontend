import dogImage from '../assets/images/dog.jpg';
const BlogCard = () => {
    return(
        <>
            <div className="blog__card">
                <div className="blog__image">
                    <img src={dogImage} alt="" className='blog__image__content'/>
                </div>
                <div className="blog__aside">
                    <h1 className="blog__header">
                        First Experience With Mocha
                    </h1>
                    <p className="blog__text">
                    Becoming a first-time Pomeranian owner has been a mix of adorable moments and unexpected challenges. From learning about their high energy to navigating grooming routines, this post explores the reality of life with a fluffy ball of personality. I'll share my personal experiences, tips, and the lessons I’ve learned along the way, as well as how my Pomeranian has brought joy (and a little chaos) into my life. Whether you’re considering adopting one or just curious about these charming dogs, this post will give you an honest look at what it’s really like to welcome a Pomeranian into your home.
                    </p>
                    <div className='blog__aside__footer'>
                        <button className="blog__open">Read More</button>
                        <p className="blog__author">By: Jason Williams</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard