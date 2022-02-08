import './ImageCarousel.css'

const Carousel = () => {
    //placeholder images. Will add our seed project images and url when available
    const splash_projects = [
        {
            image: "https://images.unsplash.com/photo-1543756070-dd3109556b0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
        },
        {
            image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1461&q=80"
        },
        {
            image: "https://images.unsplash.com/photo-1562436099-d3adb10090cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
        {
            image: "https://images.unsplash.com/photo-1544967919-44c1ef2f9e7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80"
        }
    ]
    return (
        <div>
            <div className="mySlides fade">
                <img src="img1.jpg" style="width:100%" />
            </div>

            <div className="mySlides fade">
                <img src="img2.jpg" style="width:100%" />
            </div>

            <div className="mySlides fade">
                <img src="img3.jpg" style="width:100%" />
            </div>
            <div style="text-align:center">
                <span className="dot" onclick="currentSlide(1)"></span>
                <span className="dot" onclick="currentSlide(2)"></span>
                <span className="dot" onclick="currentSlide(3)"></span>
            </div>
        </div>
    )
}

export default Carousel
