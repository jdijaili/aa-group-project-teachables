import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { putStepDraft } from "../../store/draft";
import './EditPage.css';

const StepForm = ({ stepData, currentStep }) => {
	const dispatch = useDispatch();

	const [stepId, setStepId] = useState(stepData?.id || '')
	const [title, setTitle] = useState(stepData?.title || '');
	const [description, setDescription] = useState(stepData?.description || '');
	const [image, setImage] = useState(stepData?.image || '');
	const [stepNumber, setStepNumber] = useState(stepData?.stepNumber || currentStep);

	const addStepToStore = () => {
		const step = {
			id: stepId,
			stepNumber,
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
				<h4 className='step-counter'>Step {stepData?.stepNumber ? stepData.stepNumber : currentStep}</h4>
				<label className='step-element'>
					Step Title
					<input
						type='text'
						required
						onKeyUp={updateTitle}
						defaultValue={title}
						placeholder='Enter step title'
					/>
				</label>

				<label className='step-element'>
					Description
					<input
						type='text'
						required
						onKeyUp={updateDescription}
						defaultValue={description}
						placeholder='Write a detailed description of this step'
					/>
				</label>

				<label className='step-element'>
					Image
					<input
						type='text'
						required
						onKeyUp={updateImage}
						defaultValue={image}
						placeholder='Include an image to illustrate this step (optional)'
					/>
				</label>
			</form>
		</div>
	)
}

export default StepForm
