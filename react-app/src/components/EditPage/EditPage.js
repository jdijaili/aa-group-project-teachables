import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { deleteStepDraft, discardDraft, postStepDraft, readProjectDraft } from "../../store/draft";
import { getProjects, putProject } from "../../store/projects";
import { deleteStep, postStep, putStep } from "../../store/steps";
import StepForm from "../EditPage/StepForm";
import './EditPage.css';

const EditPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { projectId } = useParams();

	useEffect(() => {
		dispatch(getProjects());
		dispatch(readProjectDraft({ projectId }));
	}, [dispatch, projectId]);

	const selectedProject = useSelector(state => state.projects[parseInt(projectId)]);
	const sessionUser = useSelector(state => state.session?.user?.id);
	const steps = useSelector(state => state.draft);
	const userId = selectedProject?.userId;

	const [title, setTitle] = useState(selectedProject?.title);
	const [description, setDescription] = useState(selectedProject?.description ? selectedProject.description : '');
	const [categoryId, setCategoryId] = useState(selectedProject?.categoryId);
	const [projectImageURL, setProjectImageURL] = useState(selectedProject?.projectImage ? selectedProject.projectImage : "");
	const [suppliesText, setSuppliesText] = useState(selectedProject?.suppliesText ? selectedProject.suppliesText : "");
	const [suppliesImageURL, setSuppliesImageURL] = useState(selectedProject?.suppliesImage ? selectedProject.suppliesImage : "");
	const [deleteQueue, setDeleteQueue] = useState([]);
	const [errors, setErrors] = useState([]);

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

	const handleSubmit = async () => { //TODO #222 project validations don't prevent submission
		const errors = [];

		if (!title) errors.push("Please provide a title for your project.");
		if (title && (title.length < 5 || title.length > 50)) errors.push("Project title must be between 5 and 50 characters.");

		if (!description) errors.push("Please provide a description for your project.");

		const updatedProject = await dispatch(putProject({
			projectId,
			title,
			description,
			categoryId,
			projectImageURL,
			suppliesText,
			suppliesImageURL
		})).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});

		deleteQueue.forEach(stepId => {
			dispatch(deleteStep({ stepId }));
		})

		Object.values(steps).forEach(async ({ id, stepNumber, title, description, image }) => {
			if (id) {
				await dispatch(putStep({ id, stepNumber, title, description, image }))
					.catch(async (res) => {
						const data = await res.json();
						if (data && data.errors) setErrors(data.errors);
					});
			} else {
				await dispatch(postStep({ projectId, stepNumber, title, description, image }))
					.catch(async (res) => {
						const data = await res.json();
						if (data && data.errors) setErrors(data.errors);
					});
			};
		});

		if (updatedProject) {
			dispatch(discardDraft());
			history.push(`/projects/${projectId}`);
		}
		setErrors(errors);
		window.scrollTo(0, 0);
	};

	const handleCancel = () => {
		dispatch(discardDraft());
		history.push(`/projects/${projectId}`);
	};

	const titleValidation = (e) => {
		if (e.target.value.length > 50) {
			setErrors([...errors, 'Title can\'t be longer than 50 characters.'])
		} else {
			setErrors([]);
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
						{errors.map((error, idx) => <li key={idx}>{error}</li>)}
					</ul>

					<div className='publish-meta'>
						<label className='publish-meta-element'>
							Project Title*
							<input
								type='text'
								required
								defaultValue={title}
								onBlur={titleValidation}
								onKeyUp={(e) => setTitle(e.target.value)}
								placeholder='What did you make?'
							/>
						</label>

						<label className='publish-meta-element'>
							Project Description*
							<input
								type='text'
								required
								defaultValue={description}
								onKeyUp={(e) => setDescription(e.target.value)}
								placeholder='Briefly describe what you made and why'
							/>
						</label>

						<label className='publish-meta-element'>
							Category*
							<select defaultValue={categoryId} onKeyUp={(e) => setCategoryId(e.target.value)}>
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
								onKeyUp={(e) => setSuppliesText(e.target.value)}
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

				{Object.values(steps).map(step =>
					<div key={step.stepNumber}>
						<StepForm stepData={step} />
						<button className='delete-step-btn'
							disabled={Object.values(steps).length === 1}
							onClick={e => {
								if (step.id) {
									setDeleteQueue(queue => [...queue, step.id]);
								}
								dispatch(deleteStepDraft(step.stepNumber));
							}}>Delete Step</button>
					</div>
				)}
				<button className='publish-button step-button' onClick={e => dispatch(postStepDraft())}>Add New Step</button>
				<button className='publish-button submit-button' onClick={handleSubmit}>Submit</button>
				<button className='publish-button cancel-button' onClick={handleCancel}>Cancel</button>
			</div>
		)
	}
};

export default EditPage;
