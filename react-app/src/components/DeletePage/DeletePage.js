import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { deleteProject, getProjects } from "../../store/projects";
import { deleteStep, getSteps } from "../../store/steps";
// deleteCOmment goes here
import './DeletePage.css';

const DeletePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { projectId } = useParams();
    const allProjects = useSelector(state => {
        return state.projects
    });

    useEffect(() => {
        dispatch(getProjects());
        dispatch(getSteps({ projectId }));
    }, [dispatch, projectId]);

    const selectedProject = (Object.values(allProjects).filter(project => project.id === parseInt(projectId)))[0];
    console.log(selectedProject)

    const handleDelete = (projectId) => {
        // Delete related comments
        // Delete related steps
        // Delete project
    };

    const handleCancel = () => {
        history.push(`/projects/${projectId}`);
    };

    console.log(projectId);
    return (
        <form className='delete-confirmation-form'>
            <h2 className='delete-title'>Project: {selectedProject?.title}</h2>
            <h3 className='delete-header'>Are you sure you want to delete this project?</h3>
            <div className='delete-options'>
                <button className='option-button confirm-delete'
                    onClick={handleDelete(projectId)}>DELETE</button>
                <button className='option-button cancel'
                    onClick={handleCancel}>CANCEL</button>
            </div>
        </form>
    )
};

export default DeletePage;
