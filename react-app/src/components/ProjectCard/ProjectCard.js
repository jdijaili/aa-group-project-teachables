import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ProjectCard.css';
import { useEffect } from 'react';
import { fetchUserData } from '../../store/session';

const ProjectCard = ({ project }) => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session[project.userId]);

	useEffect(() => {
		dispatch(fetchUserData({ userId: project.userId }));
	}, [dispatch, project.userId])

	return (
		<Link to={`/projects/${project.id}`}>
			<div className='explorer-card' key={project.id}>
				<img className='explorer-image' src={project.projectImage ? project.projectImage :
					project.suppliesImage ? project.suppliesImage : '/images/noimage.png'} alt={project.title} />
				<div className='explorer-text'>
					<h3 className='explorer-links'>{project.title}</h3>
					<Link to={`/users/${user?.id}`}>
						<p className='explorer-user'>By {user?.username}</p>
					</Link>
				</div>
			</div>
		</Link>
	)
}

export default ProjectCard
