import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { putStepDraft } from "../../store/draft";
import './EditPage.css';

const StepForm = ({ currentStep }) => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('');

	const addStepToStore = () => {
		const step = {
			stepNumber: currentStep,
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
				<h4 className='step-counter'>Step {currentStep}</h4>
				<label className='step-element'>
					Step Title
					<input
						type='text'
						required
						onBlur={updateTitle}
						placeholder='Enter step title'
					/>
				</label>

				<label className='step-element'>
					Description
					<input
						type='text'
						required
						onBlur={updateDescription}
						placeholder='Write a detailed description of this step'
					/>
				</label>

				<label className='step-element'>
					Image
					<input
						type='text'
						required
						onBlur={updateImage}
						placeholder='Include an image to illustrate this step (optional)'
					/>
				</label>
			</form>
		</div>
	)
}

export default StepForm
