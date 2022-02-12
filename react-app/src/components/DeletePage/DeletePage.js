import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteProject, getProjects } from "../../store/projects";
import { getSteps } from "../../store/steps";
import './DeletePage.css';

const DeletePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { projectId } = useParams();

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getProjects());
        dispatch(getSteps({ projectId }));
    }, [dispatch, projectId]);

    const sessionUser = useSelector(state => state.session?.user?.id);

    const allProjects = useSelector(state => {
        return state.projects
    });

    const selectedProject = (Object.values(allProjects).filter(project => project.id === parseInt(projectId)))[0];

    const allSteps = useSelector(state => {
        return Object.values(state.steps)
    });

    const handleDelete = async (e) => {
        e.preventDefault();
        const deletedProject = await dispatch(deleteProject({ projectId: selectedProject.id }));
        if (deletedProject) history.push(`/users/${sessionUser}`);
        else setErrors(deletedProject.errors)

    };

    const handleCancel = () => {
        history.push(`/projects/${projectId}`);
    };

    return (
        <form className='delete-confirmation-form'>
            <input type="hidden" name="csrf_token" value={Cookies.get('XSRF-TOKEN')} />
            <h2 className='delete-title'>Project: {selectedProject?.title}</h2>
            <h3 className='delete-header'>Are you sure you want to delete this project?</h3>
            <ul>
					{errors.map((error, idx) => <li key={idx}>{error}</li>)}
			</ul>
            <div className='delete-options'>
                <button className='option-button confirm-delete'
                    onClick={handleDelete}>DELETE</button>
                <button className='option-button cancel'
                    onClick={handleCancel}>CANCEL</button>
            </div>
        </form>
    )
};

export default DeletePage;
