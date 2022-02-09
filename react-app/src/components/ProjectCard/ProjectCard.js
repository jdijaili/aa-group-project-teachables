import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
	console.log(project);
	return (
		<div className='explorer-card' Link to={`/projects/${project.id}`}>
			{/* TODO: #87 Insert image AFTER restructurig seed data so links to images reflect new directory structure */}
			<Link to={`/projects/${project.id}`}><img className='explorer-image' src={project.img} /></Link>
			<div className='explorer-text'>
				<Link to={`/projects/${project.id}`}><h3 className='explorer-links'>{project.title}</h3></Link>
				{/* TODO: #84 Replace with user info from user store */}
				<p className='explorer-user'>By user {project.userId}</p>
			</div>
		</div>
	)
}

export default ProjectCard
