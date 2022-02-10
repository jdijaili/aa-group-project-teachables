import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { putStepDraft } from "../../store/draft";
import './EditPage.css';

const StepForm = ({ stepData, currentStep }) => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState(stepData.title || '');
	const [description, setDescription] = useState(stepData.description || '');
	const [image, setImage] = useState(stepData.image || '');
	const [stepCount, setStepCount] = useState(stepData.stepNumber || '')

	const addStepToStore = () => {
		const step = {
			stepNumber: stepCount,
			title,
			description,
			image
		};

		dispatch(putStepDraft(step));
	};

	const updateTitle = (e) => {
		setTitle(e.target.value);
		addStepToStore();
	};

	const updateDescription = (e) => {
		setDescription(e.target.value);
		addStepToStore();
	};

	const updateImage = (e) => {
		setImage(e.target.value);
		addStepToStore();
	};

	return (
		<div className='new-step'>
			<form>
				<input type="hidden" name="csrf_token" value={Cookies.get('XSRF-TOKEN')} />
				<h4 className='step-counter'>Step {stepData.stepNumber ? stepData.stepNumber : stepCount}</h4>
				<label className='step-element'>
					Step Title
					<input
						type='text'
						required
						defaultValue=''
						onChange={updateTitle}
						value={stepData.title}
						placeholder='Enter step title'
					/>
				</label>

				<label className='step-element'>
					Description
					<input
						type='text'
						required
						defaultValue=''
						onChange={updateDescription}
						value={stepData.description}
						placeholder='Write a detailed description of this step'
					/>
				</label>

				<label className='step-element'>
					Image
					<input
						type='text'
						required
						defaultValue=''
						onChange={updateImage}
						value={stepData.image}
						placeholder='Include an image to illustrate this step (optional)'
					/>
				</label>
			</form>
		</div>
	)
}

export default StepForm
