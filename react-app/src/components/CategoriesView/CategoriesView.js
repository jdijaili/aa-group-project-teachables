import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import { getCategories } from '../../store/categories';
import './CategoriesView.css';

const CategoriesView = () => {
    const [projects, setProjects] = useState([]);
    const { categoryId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects());
        dispatch(getCategories());
    }, []);

    const allProjects = useSelector(state => {
        return state.projects
    });
    const filteredProjects = Object.values(allProjects).filter(project => project.category_id == categoryId);
    const projectsArr = Object.values(filteredProjects);

    const allCategories = useSelector(state => {
        return state.categories
    });
    const selectedCategory = Object.values(allCategories).filter(category => category.id == categoryId);

    return (
        <div className='categories-body'>
            <h1>Now Viewing the {selectedCategory[0].name} Category</h1>
            <div className='categories-cards'>
                {projectsArr.map(project => {
                    return (
                        <div className='categories-card'>
                            <h2>{project.title}</h2>
                            {/* TO DO: Replace with user info from user store */}
                            <p>By user {project.user_id}</p>
                            <p>{project.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default CategoriesView;
