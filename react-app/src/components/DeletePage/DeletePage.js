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

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getProjects());
        dispatch(getSteps({ projectId }));
    }, [dispatch, projectId]);

    // const sessionUser = useSelector(state => state.session?.user?.id);

    const allProjects = useSelector(state => {
        return state.projects
    });

    const selectedProject = (Object.values(allProjects).filter(project => project.id === parseInt(projectId)))[0];

    const allSteps = useSelector(state => {
        return Object.values(state.steps)
    });
    console.log(allSteps);

    // const allComments = useSelector(state => state.comments)

    const handleDelete = () => {
        // Delete related comments

        // Delete related steps
        Object.values(allSteps).forEach(async (step) => {
            console.log(step);
            console.log(step.id);
            const actionStep = {
                stepId: step.id
            }
            await dispatch(deleteStep(actionStep));
        });

        // Object.values(allSteps).forEach(async ({ id }) => {
        //     await dispatch(deleteStep(id))
        //         .catch(async (res) => {
        //             const data = await res.json();
        //             if (data && data.errors) setErrors(data.errors);
        //         });
        // })

        // Delete project
        const deletedProject = async () => await dispatch(deleteProject({ projectId: selectedProject.id }));
        const check = deletedProject()
        console.log(check)
        if (check) history.push(`/`);

    };

    const handleCancel = () => {
        history.push(`/projects/${projectId}`);
    };

    console.log(projectId);
    return (
        <form className='delete-confirmation-form'>
            <input type="hidden" name="csrf_token" value={Cookies.get('XSRF-TOKEN')} />
            <h2 className='delete-title'>Project: {selectedProject?.title}</h2>
            <h3 className='delete-header'>Are you sure you want to delete this project?</h3>
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
