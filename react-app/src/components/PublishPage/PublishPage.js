import Cookies from "js-cookie";
import React, { useState, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { csrfFetch } from "../../helpers";
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
	const [suppliesText, setSuppliesText] = useState('');
	const [suppliesImage, setSuppliesImage] = useState(null);
	const [suppliesImageURL, setSuppliesImageURL] = useState('');
	const [imageLoading, setImageLoading] = useState(false);
	const [errors, setErrors] = useState([]); // TODO: #85 find a solution for project and step errors on publish page
	const [stepNumber, setStepNumber] = useState(1);
	const [stepForms, setStepForms] = useState([]);

	const updateTitle = (e) => setTitle(e.target.value);
	const updateDescription = (e) => setDescription(e.target.value);
	const updateCategoryId = (e) => setCategoryId(e.target.value);
	const updateSuppliesText = (e) => setSuppliesText(e.target.value);
	const uploadSuppliesImage = async (e) => {
		e.preventDefault();
		setImageLoading(true);
		const formData = new FormData();
		formData.append("image", suppliesImage);
		const res = await fetch('/api/images', {
			method: "POST",
			body: formData
		});
		setImageLoading(false);
		if (res.ok) {
			let data = await res.json();
			setSuppliesImageURL(data.url);
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
			suppliesText,
			suppliesImage,
			projectImage: "" //TODO #141 add project image input to publish and edit pages
		};

		const submittedProject = await dispatch(postProject(newProject))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});

		let stepsArray = Object.values(steps);
		stepsArray.forEach(async ({ stepNumber, title, description, image }) => {
			await dispatch(postStep({ projectId: submittedProject.id, stepNumber, title, description, image }))
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) setErrors(data.errors);
				});
		})

		if (submittedProject) {
			if (stepsArray.length) {
				dispatch(discardDraft());
				history.push(`/projects/${submittedProject.id}`);
			} else {
				setErrors(errors => ["Please provide at least one step for your teachable.", ...errors])
			}
		}
	}

	const handleCancel = () => {
		dispatch(discardDraft());
	}

	const addNewStepComponent = () => {
		setStepNumber(prevStepNumber => prevStepNumber + 1);
		setStepForms([...stepForms, <StepForm currentStep={stepNumber} />]);
	}

	return (
		<div className='publish-body'>
			<div className='publish-header'>Create a New Project</div>
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
							onBlur={updateDescription}
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
						Supplies
						<input
							type='text'
							required
							defaultValue=''
							onBlur={updateSuppliesText}
							placeholder='List all the supplies required for this project'
						/>
					</label>

					<label className='publish-meta-element'>
						Supplies Image
						{suppliesImageURL ? <img src={suppliesImageURL} alt="Supplies Image" /> : ""}
						<input
							type="file"
							accept="image/*"
							onChange={e => setSuppliesImage(e.target.files[0])}
						/>
						<button onClick={uploadSuppliesImage}>{imageLoading ? "Loading..." : "Upload"}</button>
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
