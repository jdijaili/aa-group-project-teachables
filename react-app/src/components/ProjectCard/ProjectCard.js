import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
	return (
		<div className='explorer-card' key={project.id}>
			<Link to={`/projects/${project.id}`}>
				<img className='explorer-image' src={project.projectImage ? project.projectImage :
					project.suppliesImage ? project.suppliesImage : 'https://teachables.s3.us-west-1.amazonaws.com/noimage.png'} alt={project.title} />
			</Link>
			<div className='explorer-text'>
				<Link to={`/projects/${project.id}`}>
					<h3 className='explorer-links'>{project.title}</h3>
				</Link>
				<Link to={`/users/${project.user.id}`}>
					<p className='explorer-user'>By {project.user.username}</p>
				</Link>
			</div>
		</div>
	)
}

export default ProjectCard
