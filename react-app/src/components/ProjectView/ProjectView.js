import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import { getSteps } from '../../store/steps';
import './ProjectView.css';

const ProjectView = () => {
    const { projectId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects());
        dispatch(getSteps({projectId}));
    }, [dispatch]);

    const allProjects = useSelector(state => {
        return state.projects
    });
    const selectedProject = Object.values(allProjects).filter(project => project.id == projectId);
    const allSteps = useSelector(state => {
        return state.steps
    });
    console.log(Object.values(allSteps));


    // console.log(selectedProject);
    return (
        <>
            {selectedProject.map(project => {
                const supplies = selectedProject[0].suppliesText;
                const suppliesRegex = / ?- /;
                const suppliesArr = supplies.split(suppliesRegex);
                console.log(suppliesArr);
                return (
                    <div className='project-view' key={project.id}>
                        <div className='project-header'>
                            {project.title}
                        </div>
                        <div className='project-author'>
                            By {project.userId}
                        </div>
                        <img className='project-image' src={project.suppliesImage ? project.suppliesImage : '/images/noimage.png'} />
                        <div className='project-description'>
                            {project.description}
                        </div>
                        <div className='project-section-header'>
                            Supplies
                        </div>
                        <div className='project-supplies'>
                            {project.suppliesText}
                        </div>
                    </div>
                )
            })}
        </>
    )
};

export default ProjectView;
