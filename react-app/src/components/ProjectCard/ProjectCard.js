import './ProjectCard.css'

const ProjectCard = ({ project }) => {
	return (
		<div className="card">
			<div>
				<img src={project.image} style={{ width: "100%" }} className="cardImg" alt={project.title} />
			</div>
			<div className="container">
				<h4>{project.title}</h4>
				{/* <p>{}</p> //add author's username */}
			</div>
		</div>
	)
}

export default ProjectCard
