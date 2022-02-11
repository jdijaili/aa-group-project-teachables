import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
	return (
		<Link to={`/projects/${project.id}`}>
			<div className='explorer-card' key={project.id}>
				<img className='explorer-image' src={project.projectImage ? project.projectImage :
					project.suppliesImage ? project.suppliesImage : '/images/noimage.png'} alt={project.title} />
				<div className='explorer-text'>
					<h3 className='explorer-links'>{project.title}</h3>
					<p className='explorer-user'>By {project.user.username}</p>
				</div>
			</div>
		</Link>
	)
}

export default ProjectCard
