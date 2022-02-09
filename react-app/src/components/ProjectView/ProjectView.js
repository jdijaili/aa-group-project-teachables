import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import './ProjectView.css';

const ProjectView = ({ project }) => {
    const { projectId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects());
    }, []);

    const allProjects = useSelector(state => {
        return state.projects
    });
    return (
        <div className='project-view'>
            THIS IS THE PROJECT
        </div>
    )
};

export default ProjectView;
