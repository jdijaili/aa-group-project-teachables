const Carousel = () => {
    return (
        <div>
            <div class="mySlides fade">
                <img src="img1.jpg" style="width:100%" />
            </div>

            <div class="mySlides fade">
                <img src="img2.jpg" style="width:100%" />
            </div>

            <div class="mySlides fade">
                <img src="img3.jpg" style="width:100%" />
            </div>
            <div style="text-align:center">
                <span class="dot" onclick="currentSlide(1)"></span>
                <span class="dot" onclick="currentSlide(2)"></span>
                <span class="dot" onclick="currentSlide(3)"></span>
            </div>
        </div>
    )
}

export default Carousel
