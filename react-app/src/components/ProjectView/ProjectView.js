import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import { getSteps } from '../../store/steps';
import { fetchUserData } from '../../store/session';
import Comment from '../Comment/comment'
import './ProjectView.css';

const ProjectView = ({ project }) => {
    const { projectId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects());
        dispatch(getSteps({ projectId }));
    }, [dispatch, projectId]);

    const allProjects = useSelector(state => {
        return state.projects
    });
    const selectedProject = Object.values(allProjects).filter(project => project.id === parseInt(projectId));
    const allSteps = useSelector(state => {
        return Object.values(state.steps)
    });

    useEffect(() => {
        dispatch(fetchUserData({ userId: selectedProject[0]?.userId }))
    }, [dispatch, selectedProject[0]?.userId]);
    const author = useSelector(state => {
        return Object.values(state.session)[0]
    });

    return (
        <>
            {selectedProject.map(project => {
                const supplies = selectedProject[0].suppliesText;
                const suppliesRegex = / ?- /;
                const suppliesArr = supplies?.split(suppliesRegex);
                return (
                    <div className='project-view' key={project.id}>
                        <div className='project-header'>
                            {project.title}
                        </div>
                        <div className='project-author'>
                            By {author?.username}
                        </div>
                        <img className='project-image' src={project.projectImage ? project.projectImage :
                            project.suppliesImage ? project.suppliesImage : '/images/noimage.png'} alt="Project overview" />
                        <div className='project-description'>
                            {project.description}
                        </div>

                        <div className='view-element'>
                            {project.projectImage && project.suppliesImage && (
                                <img className='supplies-image' src={project.suppliesImage} />
                            )}
                            {project.suppliesText ?
                                <div>
                                    <div className='project-section-header'>
                                        Supplies
                                    </div>
                                    <ul className='project-supplies'>
                                        {suppliesArr.map(supply => {
                                            if (supply) {
                                                return (
                                                    <li>{supply}</li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                                : ''}
                        </div>
                        <div className='project-section-header'>
                            Steps
                        </div>
                        <ol className='project-steps'>
                            {allSteps.map(step => {
                                return (
                                    <li className='step'>
                                        {step.image ?
                                            <img className='step-image' src={step.image} key={step.id} alt="Illustration of step" /> :
                                            ''}
                                        <div className='step-text'>
                                            <h3>Step {allSteps.indexOf(step) + 1}: {step.title}</h3>
                                            <p className={step.image ? 'step-text' : 'step-text-wide'}>{step.description}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ol>
                        <>
                        <Comment></Comment>
                        </>
                    </div>
                )
            })}
        </>
    )
};

export default ProjectView;
