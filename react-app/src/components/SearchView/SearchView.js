import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import { getSearchProjects } from '../../store/search';

const SearchView = () => {
	// const dispatch = useDispatch();
	// const location = useLocation();
	// console.log(location.pathname)
	// const query = location.pathname.split('/')[2];

	// useEffect(() => {
	// 	dispatch(getSearchProjects(query));
	// }, []);

	const projects = useSelector(state => {
		return state.search
	});
	console.log(projects)

	const projectsArr = Object.values(projects);
	console.log(projectsArr.length)

	return (
		<div className='search-page'>
			<div className='search-body'>
				<div className='search-cards'>
					{projectsArr.length ? projectsArr.map(project => {
						return (
							<ProjectCard project={project} key={project.id}/>
						)
					}) : <h1>No projects found</h1>}
				</div>
			</div>
		</div >
	)


};

export default SearchView
