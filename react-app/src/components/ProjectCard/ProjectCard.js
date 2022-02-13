import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
	return (
		<Link to={`/projects/${project.id}`}>
			<div className='explorer-card' key={project.id}>
				<img className='explorer-image' src={project.projectImage ? project.projectImage :
					project.suppliesImage ? project.suppliesImage : 'https://teachables.s3.us-west-1.amazonaws.com/noimage.png'} alt={project.title} />
				<div className='explorer-text'>
					<h3 className='explorer-links'>{project.title}</h3>
					<Link to={`/users/${project.user.id}`}>
						<p className='explorer-user'>By {project.user.username}</p>
					</Link>
				</div>
			</div>
		</Link>
	)
}

export default ProjectCard
