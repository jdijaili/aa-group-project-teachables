import './ProjectCard.css';

const ProjectCard = ({ project }) => {
	return (
		<div className='explorer-card' a href={`/projects/${project.id} key=${project.id}`}>
			<a href={`/projects/${project.id}`}><img className='explorer-image' src={project.suppliesImage ? project.suppliesImage : '/images/noimage.png'} alt="Project supplies" /></a>
			<div className='explorer-text'>
				<a href={`/projects/${project.id}`}><h3 className='explorer-links'>{project.title}</h3></a>
				{/* TODO: #84 Replace with user info from user store */}
				<a href={`/users/${project.userId}`}><p className='explorer-user'>By user {project.userId}</p></a>
			</div>
		</div>
	)
}

export default ProjectCard
