import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './ImageCarousel.css'

const ImageCarousel = () => {
	return (
		<div className='carousel'>
			<Carousel showThumbs={false} showArrows={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={4000}>
				<div>
					<img src="https://images.unsplash.com/photo-1642056876324-39a910bc9dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
						alt="Chess Openings" />
				</div>
				<div>
					<img src="https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1761&q=80"
						alt="Game Development" />
				</div>
				<div>
					<img src="https://images.unsplash.com/photo-1629481995102-ff98d306dd8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80"
						alt="Jewlery Design" />
				</div>
				<div>
					<img src="https://images.unsplash.com/photo-1628759213613-40de37caaf32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80"
						alt="Knitting" />
				</div>
			</Carousel>
			<div className='overlay'>
				<h1 className='overlay-title'>YOURS FOR THE MAKING</h1>
				<h3 className='overlay-text'>Teachables is a community for people who like to make things. Come explore, share, and make your next project with us!</h3>
			</div>
		</div>
	)
}

export default ImageCarousel
