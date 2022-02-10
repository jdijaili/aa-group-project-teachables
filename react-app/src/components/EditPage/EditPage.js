import Cookies from "js-cookie";
import React, { useState, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { discardDraft } from "../../store/draft";
import { getProjects, putProject } from "../../store/projects";
import { getSteps, putStep } from "../../store/steps";
import './EditPage.css';
const StepForm = React.lazy(() => import('./StepForm'));

const EditPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { projectId } = useParams();

    useEffect(() => {
        dispatch(getProjects({ projectId }));
        dispatch(getSteps({ projectId }));
    }, [dispatch]);

    const allProjects = useSelector(state => state.projects);
    const selectedProject = Object.values(allProjects).filter(project => project.id === parseInt(projectId))[0];
    const sessionUser = useSelector(state => state.session?.user?.id);
    const allSteps = useSelector(state => Object.values(state.steps));
    const stepsCount = allSteps.length;
    const steps = useSelector(state => state.draft);
    const userId = selectedProject?.userId;

    const [title, setTitle] = useState(selectedProject?.title);
    const [description, setDescription] = useState(selectedProject?.description);
    const [categoryId, setCategoryId] = useState(selectedProject?.categoryId);
    const [suppliesText, setSuppliesText] = useState(selectedProject?.suppliesText);
    const [suppliesImage, setSuppliesImage] = useState('');
    const [errors, setErrors] = useState([]);
    const [stepNumber, setStepNumber] = useState(stepsCount + 1);
    const [stepForms, setStepForms] = useState([]);

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateCategoryId = (e) => setCategoryId(e.target.value);
    const updateSuppliesText = (e) => setSuppliesText(e.target.value);
    const updateSuppliesImage = (e) => setSuppliesImage(e.target.value);

    const handleSubmit = async () => {
        const editedProject = {
            userId,
            title,
            description,
            categoryId,
            suppliesText,
            suppliesImage
        };

        const updatedProject = await dispatch(putProject(editedProject))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

        // TODO: THIS BIT
        // Object.values(steps).forEach(async ({ stepNumber, title, description, image }) => {
        //     await dispatch(putStep({ projectId: }))
        // })
    };

    const handleCancel = () => {
        dispatch(discardDraft());
    };

    const addNewStepComponent = () => {
        setStepNumber(prevStepNumber => prevStepNumber + 1);
        setStepForms([...stepForms, <StepForm currentStep={stepNumber} />]);
    };

    if (parseInt(sessionUser) !== parseInt(userId)) {
        return <Redirect to="/" />;
    } else {


        return (
            <div className='publish-body'>
                <div className='publish-header'>Edit My Project: {selectedProject.title}</div>
                <form>
                    <input type="hidden" name="csrf_token" value={Cookies.get('XSRF-TOKEN')} />
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>

                    <div className='publish-meta'>
                        <label className='publish-meta-element'>
                            Project Title
                            <input
                                type='text'
                                required
                                defaultValue=''
                                value={title}
                                onBlur={updateTitle}
                                placeholder='What did you make?'
                            />
                        </label>

                        <label className='publish-meta-element'>
                            Project Description
                            <input
                                type='text'
                                required
                                defaultValue=''
                                value={description}
                                onBlur={updateDescription}
                                placeholder='Briefly describe what you made and why'
                            />
                        </label>

                        <label className='publish-meta-element'>
                            Category
                            <select defaultValue={1} value={categoryId} onBlur={updateCategoryId}>
                                <option value={1} required>Chess Openings</option>
                                <option value={2} required>Game Development</option>
                                <option value={3} required>Jewelry Design</option>
                                <option value={4} required>Knitting</option>
                            </select>
                        </label>

                        <label className='publish-meta-element'>
                            Supplies
                            <input
                                type='text'
                                required
                                defaultValue=''
                                value={suppliesText}
                                onBlur={updateSuppliesText}
                                placeholder='List all the supplies required for this project'
                            />
                        </label>

                        <label className='publish-meta-element'>
                            Supplies Image
                            <input
                                type='text'
                                required
                                defaultValue=''
                                onBlur={updateSuppliesImage}
                                placeholder='Include an imageof your supplies (optional)'
                            />
                        </label>
                    </div>
                </form>

                {allSteps.map(step =>
                <Suspense fallback={<div>Loading...</div>}>
                    {stepForms.map((stepFormComponent, i) => (
                        <div key={i}>{stepFormComponent}</div>
                    ))}
                </Suspense>
                    )}
                <button className='publish-button step-button' onClick={addNewStepComponent}>Add New Step</button>

                <button className='publish-button submit-button' onClick={handleSubmit}>Submit</button>
                <button className='publish-button cancel-button' onClick={handleCancel}>Cancel</button>
            </div>
        )
    }
};

export default EditPage;
