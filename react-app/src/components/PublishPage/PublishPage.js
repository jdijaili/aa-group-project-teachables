import React, { useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { discardDraft, putStepDraft } from "../../store/draft";
import { postProject } from "../../store/projects";
import { postStep } from "../../store/steps";
const StepForm = React.lazy(() => import('./StepForm'));

const PublishPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user.id);
    const steps = useSelector(state => state.draft);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(1);
    const [suppliesText, setSuppliesText] = useState('');
    const [suppliesImage, setSuppliesImage] = useState('');
    const [errors, setErrors] = useState([]); // TODO: #85 find a solution for project and step errors on publish page
    const [stepNumber, setStepNumber] = useState(1);
    const [stepForms, setStepForms] = useState([<StepForm currentStep={stepNumber} />])

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateCategoryId = (e) => setCategoryId(e.target.value);
    const updateSuppliesText = (e) => setSuppliesText(e.target.value);
    const updateSuppliesImage = (e) => setSuppliesImage(e.target.value);

    const handleSubmit = async () => {
        const newProject = {
            userId,
            title,
            description,
            categoryId,
            suppliesText,
            suppliesImage
        };


        const submittedProject = await dispatch(postProject(newProject))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });

        Object.values(steps).forEach(async ({stepNumber, title, description, image}) => {
            await dispatch(postStep({ projectId: submittedProject.id, stepNumber, title, description, image }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        })

        if (submittedProject) {
            dispatch(discardDraft());
            history.push('/'); // TODO: #83 change path to project id page
        }
    }

    const handleCancel = () => {
        dispatch(discardDraft());
    }

    const addNewStepComponent = () => {
        setStepNumber(prevStepNumber => prevStepNumber + 1);

        setStepForms([...stepForms, <StepForm currentStep={stepNumber}/>]);
    }

    return (
        <div>
            <form>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <label>
                    Project Title
                    <input
                        type='text'
                        required
                        defaultValue=''
                        onBlur={updateTitle}
                        placeholder='What did you make?'
                    />
                </label>

                <label>
                    Project Description
                    <input
                        type='text'
                        required
                        defaultValue=''
                        onBlur={updateDescription}
                        placeholder='Briefly describe what you made and why'
                    />
                </label>

                <label>
                    Category
                    <select defaultValue={1} onBlur={updateCategoryId}>
                        <option value={1} required>Chess Openings</option>
                        <option value={2} required>Game Development</option>
                        <option value={3} required>Jewelry Design</option>
                        <option value={4} required>Knitting</option>
                    </select>
                </label>

                <label>
                    Supplies
                    <input
                        type='text'
                        required
                        defaultValue=''
                        onBlur={updateSuppliesText}
                        placeholder='List all the supplies required for this project'
                    />
                </label>

                <label>
                    Supplies Image
                    <input
                        type='text'
                        required
                        defaultValue=''
                        onBlur={updateSuppliesImage}
                        placeholder='Include an imageof your supplies (optional)'
                    />
                </label>
            </form>
            <Suspense fallback={<div>Loading...</div>}>
                {stepForms.map((stepFormComponent, i) => (
                    <div key={i}>{stepFormComponent}</div>
                ))}
            </Suspense>
            <button onClick={addNewStepComponent}>Add New Step</button>

            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export default PublishPage
