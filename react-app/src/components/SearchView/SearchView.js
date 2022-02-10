import { useSelector } from 'react-redux';
import ProjectCard from '../ProjectCard/ProjectCard';
import './SearchView.css'

const SearchView = () => {
	const projects = useSelector(state => {
		return state.search
	});

	const projectsArr = Object.values(projects);

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
