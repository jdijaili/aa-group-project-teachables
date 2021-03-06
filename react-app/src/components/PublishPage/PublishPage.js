import Cookies from "js-cookie";
import React, { useState, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { discardDraft } from "../../store/draft";
import { postProject } from "../../store/projects";
import { postStep } from "../../store/steps";
import './PublishPage.css';
const StepForm = React.lazy(() => import('./StepForm'));

const PublishPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const userId = useSelector(state => state.session.user.id);
	const steps = useSelector(state => state.draft);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [categoryId, setCategoryId] = useState(1);
	const [projectImageURL, setProjectImageURL] = useState("");
	const [suppliesText, setSuppliesText] = useState('');
	const [suppliesImageURL, setSuppliesImageURL] = useState('');
	const [errors, setErrors] = useState([]);
	const [projectErorrs, setProjectErrors] = useState([]);
	const [stepNumber, setStepNumber] = useState(1);
	const [stepForms, setStepForms] = useState([]);

	const updateTitle = (e) => setTitle(e.target.value);
	const updateDescription = (e) => setDescription(e.target.value);
	const updateCategoryId = (e) => setCategoryId(e.target.value);
	const updateSuppliesText = (e) => setSuppliesText(e.target.value);

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

	useEffect(() => {
		setStepNumber(prevStepNumber => prevStepNumber + 1);
		setStepForms(stepForms => [...stepForms, <StepForm currentStep={1} />]);
	}, []);

	const handleSubmit = async () => {
		const errors = [];

		const newProject = {
			userId,
			title,
			description,
			categoryId,
			projectImageURL,
			suppliesText,
			suppliesImageURL,
		};

		if (!title) errors.push("Please provide a title for your project.");
		if (title && (title.length < 5 || title.length > 50)) errors.push("Project title must be between 5 and 50 characters.");

		if (!description) errors.push("Please provide a description for your project.");

		if (Object.values(steps).length) {
			const submittedProject = await dispatch(postProject(newProject))
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) setProjectErrors(data.errors);
				});

			if (submittedProject) {
				Object.values(steps).forEach(async ({ stepNumber, title, description, image }) => {
					await dispatch(postStep({ projectId: submittedProject.id, stepNumber, title, description, image }))
						.catch(async (res) => {
							const data = await res.json();
							if (data && data.errors) setErrors(data.errors);
						});
				})

				dispatch(discardDraft());
				history.push(`/projects/${submittedProject.id}`);
			}
		} else {
			errors.push("Please provide at least one step for your Teachable.");
		}
		setProjectErrors(errors);
        window.scrollTo(0,0);
	}


	const handleCancel = () => {
		dispatch(discardDraft());
		history.push(`/`);
	}

	const addNewStepComponent = () => {
		setStepNumber(prevStepNumber => prevStepNumber + 1);
		setStepForms(prevForms => [...prevForms, <StepForm currentStep={stepNumber} />]);
	}

	const titleValidation = (e) => {
		if (e.target.value.length > 50) {
			setProjectErrors(['Title can\'t be greater than 50 characters.'])
		} else {
			setProjectErrors([]);
		}
	}

	return (
		<div className='publish-body'>
			<div className='publish-header'>Create a New Project</div>
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
							defaultValue=''
							onKeyUp={updateTitle}
							placeholder='What did you make?'
							onBlur={titleValidation}
						/>
					</label>

					<label className='publish-meta-element'>
						Project Description
						<input
							type='text'
							required
							defaultValue=''
							onKeyUp={updateDescription}
							placeholder='Briefly describe what you made and why'
						/>
					</label>

					<label className='publish-meta-element'>
						Category
						<select defaultValue={1} onBlur={updateCategoryId}>
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
							defaultValue=''
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
			</form >
			<Suspense fallback={<div>Loading...</div>}>
				{stepForms.map((stepFormComponent, i) => (
					<div key={i}>{stepFormComponent}</div>
				))}
			</Suspense>
			<button className='publish-button step-button' onClick={addNewStepComponent}>Add New Step</button>

			<button className='publish-button submit-button' onClick={handleSubmit}>Submit</button>
			<button className='publish-button cancel-button' onClick={handleCancel}>Cancel</button>
		</div >
	)
}

export default PublishPage
