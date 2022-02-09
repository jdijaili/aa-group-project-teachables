import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
	return (
		<div className='explorer-card' Link to={`/projects/${project.id} key=${project.id}`}>
			<Link to={`/projects/${project.id}`}><img className='explorer-image' src={project.suppliesImage ? project.suppliesImage : '/images/noimage.png'} /></Link>
			<div className='explorer-text'>
				<Link to={`/projects/${project.id}`}><h3 className='explorer-links'>{project.title}</h3></Link>
				{/* TODO: #84 Replace with user info from user store */}
				<p className='explorer-user'>By user {project.userId}</p>
			</div>
		</div>
	)
}

export default ProjectCard
