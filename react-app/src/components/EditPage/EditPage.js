import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { deleteStepDraft, discardDraft, putStepDraft } from "../../store/draft";
import { getProjects, putProject } from "../../store/projects";
import { deleteStep, getSteps, postStep, putStep } from "../../store/steps";
import StepForm from "../EditPage/StepForm";
import './EditPage.css';

const EditPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { projectId } = useParams();

	useEffect(() => {
		dispatch(getProjects());
		dispatch(getSteps({ projectId }));
	}, [dispatch, projectId]);

	const allProjects = useSelector(state => state.projects);
	const selectedProject = Object.values(allProjects).filter(project => project.id === parseInt(projectId))[0];
	const sessionUser = useSelector(state => state.session?.user?.id);
	const allSteps = useSelector(state => Object.values(state.steps));
	const stepsCount = allSteps.length;
	const steps = useSelector(state => state.draft);
	const userId = selectedProject?.userId;

	const [title, setTitle] = useState(selectedProject?.title);
	const [description, setDescription] = useState(selectedProject?.description ? selectedProject.description : '');
	const [categoryId, setCategoryId] = useState(selectedProject?.categoryId);
	const [projectImageURL, setProjectImageURL] = useState(selectedProject ? selectedProject.projectImage || "" : "");
	const [suppliesText, setSuppliesText] = useState(selectedProject?.suppliesText ? selectedProject.suppliesText : '');
	const [suppliesImageURL, setSuppliesImageURL] = useState(selectedProject ? selectedProject.suppliesImage || "" : "");
	const [projectErorrs, setProjectErrors] = useState([]);
	const [errors, setErrors] = useState([]);
	const [stepNumber, setStepNumber] = useState(stepsCount + 1);
	const [deleteQueue, setDeleteQueue] = useState([]);

	const updateTitle = (e) => setTitle(e.target.value);
	const updateDescription = (e) => setDescription(e.target.value);
	const updateCategoryId = (e) => setCategoryId(e.target.value);
	const updateSuppliesText = (e) => setSuppliesText(e.target.value);

	// add a delete step queue
	const addToDeleteQueue = (e) => {
		if (stepNumber - 1 === 1) {
			alert('Projects must have at least one step.');

		} else {
			console.log(e.target.value);
			setStepNumber(prevStepNumber => prevStepNumber - 1);
			// deleteQueue.push(parseInt(e.target.value));
			console.log([...deleteQueue, parseInt(e.target.value)])
			setDeleteQueue(prevState => [...prevState, parseInt(e.target.value)]);
			console.log(deleteQueue)

			let stepIdx = allSteps.findIndex(step => parseInt(step.id) === parseInt(e.target.value));
			console.log(stepIdx);
			allSteps.splice(stepIdx, 1);

			const combinedAllStepsAndSteps = [...allSteps, ...Object.values(steps)];

			for (let i = 0; i < combinedAllStepsAndSteps.length; i++) {
				let step = combinedAllStepsAndSteps[i];
				step.stepNumber = i + 1;
			}

			const step = document.getElementById(`step-${e.target.value}`);
			step.hidden = true;

			console.log(deleteQueue)
		}
	}

	// delete a step from draft slice of state
	const removeStepDraft = async (e) => {
		if (stepNumber - 1 === 1) {
			alert('Projects must have at least one step.');

		} else {
			setStepNumber(prevStepNumber => prevStepNumber - 1);
			console.log(e.target.value);

			await dispatch(deleteStepDraft(e.target.value))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors)
			});

			let stepDrafts = Object.values(steps);

			const combinedAllStepsAndSteps = [...allSteps, ...stepDrafts];

			for (let i = 0; i < combinedAllStepsAndSteps.length; i++) {
				let step = combinedAllStepsAndSteps[i];
				console.log(step)
				step.stepNumber = i + 1;
			}

			const step = document.getElementById(`draft-step-${e.target.value}`);
			step.hidden = true;
		}
	}

	// delete a step from the original project
	const removeStepFromDeleteQueue = async (stepId) => {
		console.log(stepId)
		await dispatch(deleteStep({ stepId }))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors)
			});
	};

	const uploadImage = async (e, setter) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", e.target.files[0]);
		const res = await fetch('/api/images', {
			method: "POST",
			body: formData
		});
		if (res.ok) {
			let data = await res.json();
			setter(data.url);
		}
	};

	const handleSubmit = async () => {
		console.log(deleteQueue)
		const errors = [];

		const editedProject = {
			projectId,
			title,
			description,
			categoryId,
			projectImageURL,
			suppliesText,
			suppliesImageURL
		};

		if (!title) errors.push("Please provide a title for your project.");
		if (title && (title.length < 5 || title.length > 50)) errors.push("Project title must be between 5 and 50 characters.");

		if (!description) errors.push("Please provide a description for your project.");

		const updatedProject = await dispatch(putProject(editedProject))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});

		Object.values(steps).forEach(async ({ id, stepNumber, title, description, image }) => {
			console.log(id);
			const actionStep = {
				id: id ? id : '',
				stepNumber,
				title,
				description,
				image
			};

			if (actionStep.id) {
				await dispatch(putStep(actionStep))
					.catch(async (res) => {
						const data = await res.json();
						if (data && data.errors) setErrors(data.errors);
					});
			} else {
				await dispatch(postStep({ projectId: projectId, stepNumber, title, description, image }))
					.catch(async (res) => {
						const data = await res.json();
						if (data && data.errors) setErrors(data.errors);
					});
			};
		});
		console.log(deleteQueue)
		deleteQueue.forEach(deleteStepId => {
			removeStepFromDeleteQueue(deleteStepId);
		});

		if (updatedProject) {
			dispatch(discardDraft());
			history.push(`/projects/${projectId}`);
		}

		setProjectErrors(errors);
		window.scrollTo(0, 0);
	};

	const handleCancel = () => {
		dispatch(discardDraft());
		setDeleteQueue([]);
		history.push(`/projects/${projectId}`);
	};

	const addNewStepComponent = async () => {
		console.log(stepNumber);

		const step = {
			id: '',
			stepNumber: stepNumber,
			title: '',
			description: ''
		};

		await dispatch(putStepDraft(step));
		setStepNumber(prevStepNumber => prevStepNumber + 1);
	};

	const titleValidation = (e) => {
		if (e.target.value.length > 50) {
			setProjectErrors([...projectErorrs, 'Title can\'t be greater than 50 characters.'])
		} else {
			setProjectErrors([]);
		}
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
						{projectErorrs.map((error, idx) => <li key={idx}>{error}</li>)}
					</ul>
					<ul>
						{errors.map((error, idx) => <li key={idx}>{error}</li>)}
					</ul>

					<div className='publish-meta'>
						<label className='publish-meta-element'>
							Project Title
							<input
								type='text'
								required
								defaultValue={title}
								onBlur={titleValidation}
								onKeyUp={updateTitle}
								placeholder='What did you make?'
							/>
						</label>

						<label className='publish-meta-element'>
							Project Description
							<input
								type='text'
								required
								defaultValue={description}
								onKeyUp={updateDescription}
								placeholder='Briefly describe what you made and why'
							/>
						</label>

						<label className='publish-meta-element'>
							Category
							<select defaultValue={categoryId} onKeyUp={updateCategoryId}>
								<option value={1} required>Chess Openings</option>
								<option value={2} required>Game Development</option>
								<option value={3} required>Jewelry Design</option>
								<option value={4} required>Knitting</option>
							</select>
						</label>

						<label className='publish-meta-element'>
							Project Image
							{projectImageURL ? <img src={projectImageURL} alt="Project" /> : ""}
							<input
								type="file"
								accept="image/*"
								onChange={e => uploadImage(e, setProjectImageURL)}
							/>
						</label>

						<label className='publish-meta-element'>
							Supplies
							<input
								type='text'
								required
								defaultValue={suppliesText}
								onKeyUp={updateSuppliesText}
								placeholder='List all the supplies required for this project'
							/>
						</label>

						<label className='publish-meta-element'>
							Supplies Image
							{suppliesImageURL ? <img src={suppliesImageURL} alt="Supplies" /> : ""}
							<input
								type="file"
								accept="image/*"
								onChange={e => uploadImage(e, setSuppliesImageURL)}
							/>
						</label>
					</div>
				</form>

				{allSteps.map((step, i) =>
					<div key={i} id={`step-${step.id}`}>
							<StepForm stepData={step} currentStep={step.stepNumber} />
							<button className='delete-step-btn' value={step.id} onClick={addToDeleteQueue}>Delete Step</button>
					</div>
				)}
				{Object.values(steps).map((draftStep, i) => (
					<div key={i} id={`draft-step-${draftStep.stepNumber}`}>
						<StepForm stepData={draftStep} currentStep={draftStep.stepNumber} />
						<button className='delete-step-btn' value={draftStep.stepNumber} onClick={removeStepDraft}>Delete Step</button>
					</div>
				))}
				<button className='publish-button step-button' onClick={addNewStepComponent}>Add New Step</button>

				<button className='publish-button submit-button' onClick={handleSubmit}>Submit</button>
				<button className='publish-button cancel-button' onClick={handleCancel}>Cancel</button>
			</div>
		)
	}
};

export default EditPage;
