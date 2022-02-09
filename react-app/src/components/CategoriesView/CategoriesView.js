import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import { getCategories } from '../../store/categories';
import ProjectCard from '../ProjectCard/ProjectCard';
import './CategoriesView.css';

const CategoriesView = () => {
	const { categoryId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProjects());
		dispatch(getCategories());
	}, [dispatch]);

	const allProjects = useSelector(state => {
		return state.projects
	});
	const filteredProjects = Object.values(allProjects).filter(project => project.categoryId.toString() === categoryId);
	const projectsArr = Object.values(filteredProjects);

	const allCategories = useSelector(state => {
		return state.categories
	});
	const selectedCategory = Object.values(allCategories).filter(category => category.id.toString() === categoryId);
	const categoryArr = Object.values(selectedCategory);

	return (
		<div className='categories-page'>
			{categoryArr.map(category => {
				return (
					<div className='category-header'>
						<div className={categoryArr[0].id === 1 ? 'categories-chess' :
							categoryArr[0].id === 3 ? 'categories-gamedev' :
								categoryArr[0].id === 4 ? 'categories-jewelry' :
									categoryArr[0].id === 2 ? 'categories-knitting' : ''} />
						<h1 className='category-header-text'>Now Viewing the {categoryArr[0].name} Category</h1>
					</div>
				)
			})};
			<div className='categories-body'>
				<div className='categories-cards'>
					{projectsArr.map(project => {
						return (
							<ProjectCard project={project} />
						)
					})}
				</div>
			</div>
		</div >
	)
};

export default CategoriesView;
