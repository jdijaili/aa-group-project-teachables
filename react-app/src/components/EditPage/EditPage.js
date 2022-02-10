import Cookies from "js-cookie";
import React, { useState, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { discardDraft } from "../../store/draft";
import { getProjects, putProject } from "../../store/projects";
import { putStep } from "../../store/steps";
import './EditPage.css';
const StepForm = React.lazy(() => import('./StepForm'));

const EditPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { projectId } = useParams();

    useEffect(() => {
        dispatch(getProjects({ projectId }));
    }, [dispatch]);

    const allProjects = useSelector(state => state.projects);
    const selectedProject = Object.values(allProjects).filter(project => project.id === parseInt(projectId))[0];

    const sessionUser = useSelector(state => state.session?.user?.id);

    const steps = useSelector(state => state.draft);

    // Check if user has property authentication, then let them edit
    if (parseInt(sessionUser) !== parseInt(selectedProject?.user_id)) {
        return <Redirect to="/" />;
    }

    return (
        <>
            EDIT PAGE
        </>
    )
};

export default EditPage;
