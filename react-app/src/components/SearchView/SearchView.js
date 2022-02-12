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
			{projectsArr.length ?
				projectsArr.length > 4 ?
					<div className='search-body'>
						{projectsArr.map(project => {
							return (
								<ProjectCard project={project} key={project.id} />
							)
						})}
					</div> :
					<div className='search-body-short'>
						{projectsArr.map(project => {
							return (
								<ProjectCard project={project} key={project.id} />
							)
						})}
					</div> :
				<div className='search-body-none'>
					<h1 className='search-header'>No projects found!</h1>
					<a className='back-to-home-button'
						href='/'>
						Back to Home
					</a>
				</div>
			}
		</div>
	)


};

export default SearchView
