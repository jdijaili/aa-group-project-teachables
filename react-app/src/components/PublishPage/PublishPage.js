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
	const [projectImage, setProjectImage] = useState(null);
	const [projectImageURL, setProjectImageURL] = useState("");
	const [projectImageStatus, setProjectImageStatus] = useState("Upload");
	const [suppliesText, setSuppliesText] = useState('');
	const [suppliesImage, setSuppliesImage] = useState(null);
	const [suppliesImageURL, setSuppliesImageURL] = useState('');
	const [suppliesImageStatus, setSuppliesImageStatus] = useState("Upload");
	const [errors, setErrors] = useState([]); // TODO: #85 find a solution for project and step errors on publish page
	const [projectErorrs, setProjectErrors] = useState([]);
	const [stepNumber, setStepNumber] = useState(1);
	const [stepForms, setStepForms] = useState([]);

	const updateTitle = (e) => setTitle(e.target.value);
	const updateDescription = (e) => setDescription(e.target.value);
	const updateCategoryId = (e) => setCategoryId(e.target.value);
	const updateSuppliesText = (e) => setSuppliesText(e.target.value);

	const uploadImage = async (e, image, setter, statusSetter) => {
		e.preventDefault();
		statusSetter("Loading...");
		const formData = new FormData();
		formData.append("image", image);
		const res = await fetch('/api/images', {
			method: "POST",
			body: formData
		});
		statusSetter("Uploaded!");
		if (res.ok) {
			let data = await res.json();
			setter(data.url);
		}
	};

	useEffect(() => {
		addNewStepComponent()
	}, []);

	const handleSubmit = async () => {
		const newProject = {
			userId,
			title,
			description,
			categoryId,
			projectImageURL,
			suppliesText,
			suppliesImageURL,
		};

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
			setErrors(errors => ["Please provide at least one step for your teachable.", ...errors])
		}
	}

	const handleCancel = () => {
		dispatch(discardDraft());
	}

	const addNewStepComponent = () => {
		setStepNumber(prevStepNumber => prevStepNumber + 1);
		setStepForms([...stepForms, <StepForm currentStep={stepNumber} />]);
	}

	const titleValidation = (e) => {
		if (e.target.value.length > 50) {
			setProjectErrors([...projectErorrs, 'Title can\'t be greater than 50 character.'])
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
							// maxLength='50'
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
							onChange={e => setProjectImage(e.target.files[0])}
						/>
						<button onClick={e => uploadImage(e, projectImage, setProjectImageURL, setProjectImageStatus)}>{projectImageStatus}</button>
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
							onChange={e => setSuppliesImage(e.target.files[0])}
						/>
						<button onClick={e => uploadImage(e, suppliesImage, setSuppliesImageURL, setSuppliesImageStatus)}>{suppliesImageStatus}</button>
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
